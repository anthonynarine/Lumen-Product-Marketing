import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { CTABanner } from "@/components/layout/CTABanner";
import {
  ChapterBody,
  ChapterNav,
  chapters,
  getAdjacentChapters,
  getChapter,
  getChapterNumber,
} from "@/features/handbook";

type ChapterPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return chapters.map((chapter) => ({ slug: chapter.slug }));
}

export async function generateMetadata({ params }: ChapterPageProps): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getChapter(slug);

  if (!chapter) {
    return { title: "Chapter not found" };
  }

  return {
    title: `${chapter.title} — Security Handbook`,
    description: chapter.summary,
  };
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { slug } = await params;
  const chapter = getChapter(slug);

  if (!chapter) {
    notFound();
  }

  const number = getChapterNumber(slug);
  const { previous, next } = getAdjacentChapters(slug);

  return (
    <>
      <Container className="flex flex-col gap-12 py-12 lg:flex-row lg:gap-16 lg:py-16">
        <aside className="hidden lg:sticky lg:top-24 lg:block lg:max-h-[calc(100vh-8rem)] lg:w-64 lg:shrink-0 lg:overflow-y-auto lg:pr-2">
          <ChapterNav activeSlug={slug} />
        </aside>

        <article className="flex min-w-0 max-w-3xl flex-col gap-8">
          <header className="flex flex-col gap-4 border-b border-line pb-8">
            <Link
              href="/security/handbook"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-accent hover:underline hover:underline-offset-4 lg:hidden"
            >
              &larr; All chapters
            </Link>
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm text-accent">{String(number).padStart(2, "0")}</span>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-muted">
                {chapter.group}
              </span>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {chapter.title}
            </h1>
            <p className="text-base leading-relaxed text-foreground-muted">{chapter.summary}</p>
          </header>

          <ChapterBody body={chapter.body} />

          <nav
            aria-label="Chapter navigation"
            className="mt-4 grid gap-4 border-t border-line pt-8 sm:grid-cols-2"
          >
            {previous ? (
              <Link
                href={`/security/handbook/${previous.slug}`}
                className="hover-card flex flex-col gap-1 rounded-xl border border-line-strong bg-ink-card p-5"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Previous
                </span>
                <span className="text-sm font-medium text-foreground">{previous.title}</span>
              </Link>
            ) : (
              <span aria-hidden="true" className="hidden sm:block" />
            )}
            {next ? (
              <Link
                href={`/security/handbook/${next.slug}`}
                className="hover-card flex flex-col gap-1 rounded-xl border border-line-strong bg-ink-card p-5 sm:text-right"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Next</span>
                <span className="text-sm font-medium text-foreground">{next.title}</span>
              </Link>
            ) : null}
          </nav>
        </article>
      </Container>

      <CTABanner
        title="Questions this handbook didn't answer?"
        description="Send them over. We'd rather answer a hard security question directly than have you infer the answer from a marketing page."
      />
    </>
  );
}
