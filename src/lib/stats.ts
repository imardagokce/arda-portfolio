/**
 * Site istatistikleri ve genel meta veriler için soyutlama katmanı.
 */

export interface SiteStats {
  totalProjects: number;
  completedProjects: number;
  activeProjects: number;
  archivedProjects: number;
}

export async function getSiteStats(): Promise<SiteStats> {
  // Gelecekte markdown dosyaları taranarak dinamik hesaplanacak
  return {
    totalProjects: 12,
    completedProjects: 3,
    activeProjects: 4,
    archivedProjects: 5,
  };
}
