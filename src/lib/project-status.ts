export const STATUS_TOPICS = ['active', 'nearly-finished', 'completed', 'idea', 'planned', 'paused', 'archived'] as const;
export type StatusTopic = typeof STATUS_TOPICS[number];

export function getStatusTopic(topics: string[] | undefined): StatusTopic | null {
  const found = topics?.find(topic => STATUS_TOPICS.includes(topic as StatusTopic));
  return found ? (found as StatusTopic) : null;
}
