import { Poll, PollCategory } from "@/types/poll";
import { allPolls } from "@/content/polls";

/**
 * Returns all polls sorted by edition number / publication date (most recent first)
 */
export function getAllPolls(): Poll[] {
  return [...allPolls].sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}

/**
 * Gets the current active featured poll (or the latest poll)
 */
export function getActivePoll(): Poll | undefined {
  const polls = getAllPolls();
  return polls.find((p) => p.status === "active") || polls[0];
}

/**
 * Gets a poll by its unique ID
 */
export function getPollById(id: string): Poll | undefined {
  return allPolls.find((p) => p.id === id);
}

/**
 * Get polls by category
 */
export function getPollsByCategory(category: PollCategory): Poll[] {
  const polls = getAllPolls();
  if (category === "All") return polls;
  return polls.filter((p) => p.category === category);
}

/**
 * Get all available unique poll categories
 */
export function getAllPollCategories(): PollCategory[] {
  return [
    "All",
    "Risk & Governance",
    "AI Strategy",
    "FP&A Automation",
    "Treasury & Liquidity",
    "Executive Sentiment",
  ];
}
