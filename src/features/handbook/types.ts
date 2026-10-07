/**
 * Content model for the public Security & HIPAA handbook.
 *
 * Chapters are authored as typed blocks rather than markdown so the library
 * stays dependency-free and every chapter renders with the same design tokens
 * as the rest of the site. See PROJECT.md before adding a new block kind.
 */

export type Block =
  | { kind: "lede"; text: string }
  | { kind: "p"; text: string }
  | { kind: "h"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "steps"; items: string[] }
  | { kind: "pair"; items: { term: string; detail: string }[] }
  | { kind: "quote"; text: string }
  | { kind: "table"; head: [string, string]; rows: [string, string][] }
  | {
      kind: "split";
      left: { title: string; items: string[] };
      right: { title: string; items: string[] };
    }
  | { kind: "note"; title: string; text: string };

export type ChapterGroup =
  | "Start here"
  | "HIPAA"
  | "Identity and authorization"
  | "Tenancy"
  | "Clinical safety and data"
  | "Imaging and integrations"
  | "Proof"
  | "Reference";

export type Chapter = {
  slug: string;
  title: string;
  group: ChapterGroup;
  /** One or two sentences, used on the index and as the page meta description. */
  summary: string;
  body: Block[];
};

/**
 * A question a real visitor would type, answered directly, then pointed at the
 * chapter that covers it in full.
 */
export type HandbookQuestion = {
  question: string;
  answer: string;
  chapterSlug: string;
};
