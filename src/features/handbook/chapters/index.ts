import type { Chapter, ChapterGroup } from "../types";
import { startHereChapters } from "./startHere";
import { hipaaChapters } from "./hipaa";
import { authorizationChapters } from "./authorization";
import { tenancyChapters } from "./tenancy";
import { clinicalChapters } from "./clinical";
import { integrationChapters } from "./integrations";
import { proofChapters } from "./proof";
import { referenceChapters } from "./reference";

/** Reading order. Chapter numbers on the site are derived from this array. */
export const chapters: Chapter[] = [
  ...startHereChapters,
  ...hipaaChapters,
  ...authorizationChapters,
  ...tenancyChapters,
  ...clinicalChapters,
  ...integrationChapters,
  ...proofChapters,
  ...referenceChapters,
];

export const chapterGroups: ChapterGroup[] = [
  "Start here",
  "HIPAA",
  "Identity and authorization",
  "Tenancy",
  "Clinical safety and data",
  "Imaging and integrations",
  "Proof",
  "Reference",
];

export function getChapter(slug: string): Chapter | undefined {
  return chapters.find((chapter) => chapter.slug === slug);
}

export function getChapterNumber(slug: string): number {
  return chapters.findIndex((chapter) => chapter.slug === slug) + 1;
}

export function getAdjacentChapters(slug: string): {
  previous?: Chapter;
  next?: Chapter;
} {
  const index = chapters.findIndex((chapter) => chapter.slug === slug);
  if (index === -1) return {};
  return {
    previous: index > 0 ? chapters[index - 1] : undefined,
    next: index < chapters.length - 1 ? chapters[index + 1] : undefined,
  };
}

export function getChaptersByGroup(): { group: ChapterGroup; chapters: Chapter[] }[] {
  return chapterGroups
    .map((group) => ({
      group,
      chapters: chapters.filter((chapter) => chapter.group === group),
    }))
    .filter((entry) => entry.chapters.length > 0);
}
