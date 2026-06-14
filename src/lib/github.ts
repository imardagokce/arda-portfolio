/**
 * GitHub API Entegrasyon Katmanı
 * 
 * Bu modül, GitHub verilerini çeker ve önbellekler.
 * Herhangi bir API limiti (Rate Limit) veya ağ hatası durumunda 
 * sistemin çökmesini engellemek için Graceful Fallback kullanır.
 */

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'imardagokce';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const headers: HeadersInit = {
  'Accept': 'application/vnd.github.v3+json',
};

// Eğer kullanıcı bir token tanımladıysa limite takılmamak için kullan
if (GITHUB_TOKEN) {
  headers['Authorization'] = `token ${GITHUB_TOKEN}`;
}

export interface GitHubStats {
  followers: number;
  totalRepos: number;
  totalStars: number;
  lastUpdatedRepo: {
    name: string;
    updatedAt: string;
  } | null;
}

export interface RepositoryData {
  name: string;
  description: string | null;
  stars: number;
  url: string;
  updatedAt: string;
}

/**
 * Kullanıcının genel GitHub istatistiklerini çeker.
 */
export async function getGitHubStats(): Promise<GitHubStats> {
  // Graceful Fallback: Varsayılan (Placeholder) Veriler
  const defaultStats: GitHubStats = {
    followers: 0,
    totalRepos: 0,
    totalStars: 0,
    lastUpdatedRepo: null
  };

  try {
    // 1. Kullanıcı Bilgilerini Çek (Followers ve Public Repos)
    const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      headers,
      next: { revalidate: 60 } // 1 dakika önbellekleme
    });

    if (!userRes.ok) {
      console.warn(`[GitHub API] Kullanıcı profili çekilemedi: ${userRes.status}`);
      return defaultStats;
    }

    const userData = await userRes.json();

    // 2. Repoları Çek (Yıldız sayısını hesaplamak ve son güncelleneni bulmak için)
    // Sadece public repoları ve son güncellenenleri al (max 100)
    const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`, {
      headers,
      next: { revalidate: 60 }
    });

    if (!reposRes.ok) {
      console.warn(`[GitHub API] Repolar çekilemedi: ${reposRes.status}`);
      return {
        followers: userData.followers,
        totalRepos: userData.public_repos,
        totalStars: 0, // Fallback
        lastUpdatedRepo: null
      };
    }

    const reposData = await reposRes.json();
    
    // Toplam yıldız sayısını hesapla
    const totalStars = reposData.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);
    
    // Son güncellenen depoyu bul (zaten updated olarak sıralı geliyor, ama emin olalım)
    const lastUpdatedRepo = reposData.length > 0 ? {
      name: reposData[0].name,
      updatedAt: reposData[0].updated_at
    } : null;

    return {
      followers: userData.followers,
      totalRepos: userData.public_repos,
      totalStars,
      lastUpdatedRepo
    };

  } catch (error) {
    console.error('[GitHub API] Beklenmedik hata:', error);
    return defaultStats; // Kesinlikle çökme olmamalı
  }
}

/**
 * Belirli bir deponun verilerini çeker.
 */
export async function getRepositoryData(repoName: string): Promise<RepositoryData | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}`, {
      headers,
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      console.warn(`[GitHub API] ${repoName} deposu çekilemedi: ${res.status}`);
      return null;
    }

    const data = await res.json();

    return {
      name: data.name,
      description: data.description,
      stars: data.stargazers_count,
      url: data.html_url,
      updatedAt: data.updated_at,
    };
  } catch (error) {
    console.error(`[GitHub API] ${repoName} detayları alınırken hata:`, error);
    return null; // Fallback
  }
}
