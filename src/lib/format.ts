/**
 * Repo adını okunur bir başlığa çevirir: "git-context-dump" -> "Git Context Dump".
 * Zaten büyük harf içeren kelimeler (NetShutUp, LLM) olduğu gibi korunur.
 */
export function formatRepoName(name: string): string {
  return name
    .split(/[-_]+/)
    .filter(Boolean)
    .map((word) => (/[A-Z]/.test(word) ? word : word.charAt(0).toUpperCase() + word.slice(1)))
    .join(' ');
}
