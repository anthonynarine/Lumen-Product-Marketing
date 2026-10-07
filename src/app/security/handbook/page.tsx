import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { CTABanner } from "@/components/layout/CTABanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { chapters, getChaptersByGroup, questionGroups } from "@/features/handbook";

export const metadata: Metadata = {
  title: "Security & HIPAA Handbook",
  description:
    "A public, plain-language reference for how Lumen protects clinical data: what HIPAA is and is not, how tenant isolation works, how a request is authorized, and how each control is proven.",
};

export default function HandbookIndexPage() {
  const groups = getChaptersByGroup();

  return (
    <>
      <PageHero
        eyebrow="Security &amp; HIPAA handbook"
        title="Read it, don't just take our word for it"
        description="The security model behind Lumen, written out in full. Start from a question you actually have, or read the chapters in order. Nothing here requires a form, a login, or a sales call first."
      />

      <section className="border-b border-line bg-ink-elevated py-16 sm:py-24">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Start from a question"
            title="What are you trying to find out?"
            description="Each answer is the short version. The link goes to the chapter that covers it properly."
          />

          <div className="flex flex-col gap-12">
            {questionGroups.map((group) => (
              <div key={group.topic} className="flex flex-col gap-4">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  {group.topic}
                </h3>
                <div className="grid gap-4 lg:grid-cols-2">
                  {group.questions.map((item) => (
                    <Link
                      key={item.question}
                      href={`/security/handbook/${item.chapterSlug}`}
                      className="hover-card group flex flex-col gap-2 rounded-xl border border-line-strong bg-ink-card p-6"
                    >
                      <h4 className="text-sm font-semibold text-foreground">{item.question}</h4>
                      <p className="text-sm leading-relaxed text-foreground-muted">{item.answer}</p>
                      <span className="mt-1 text-sm text-button underline-offset-4 group-hover:underline">
                        Read the chapter &rarr;
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-ink py-16 sm:py-24">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow={`${chapters.length} chapters`}
            title="Or read it in order"
            description="Written to be read start to finish, but each chapter stands on its own."
          />

          <div className="flex flex-col gap-10">
            {groups.map((entry) => (
              <div key={entry.group} className="flex flex-col gap-4">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  {entry.group}
                </h3>
                <div className="overflow-hidden rounded-xl border border-line-strong">
                  {entry.chapters.map((chapter, index) => (
                    <Link
                      key={chapter.slug}
                      href={`/security/handbook/${chapter.slug}`}
                      className={`group flex gap-4 px-5 py-4 transition-colors hover:bg-hover sm:px-6 ${
                        index > 0 ? "border-t border-line" : ""
                      }`}
                    >
                      <span className="font-mono text-sm text-accent">
                        {String(chapters.indexOf(chapter) + 1).padStart(2, "0")}
                      </span>
                      <div className="flex flex-col gap-1">
                        <h4 className="text-sm font-semibold text-foreground">{chapter.title}</h4>
                        <p className="text-sm leading-relaxed text-foreground-muted">{chapter.summary}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-line-strong bg-ink-card p-6 sm:p-8">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              A note on HIPAA
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground-muted">
              Lumen is built with HIPAA-aligned technical safeguards and designed to support
              HIPAA-compliant deployment. This site does not claim HIPAA certification, and it
              does not process, store, or transmit protected health information (PHI). Any
              screenshots or examples shown across this site use synthetic data only.
            </p>
          </div>
        </Container>
      </section>

      <CTABanner
        title="Want this walked through with your security team?"
        description="We'll go through tenancy, facility scoping, authorization policy, and the evidence behind each control."
      />
    </>
  );
}
