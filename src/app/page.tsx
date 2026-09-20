import {
  HeroSection,
  WorkflowSection,
  VascularFirstSection,
  ImagingSection,
  AIKnowledgeSection,
  BillingSection,
  InteroperabilitySection,
  SecuritySection,
  ExpansionSection,
  FinalCTASection,
} from "@/features/home";

export default function Home() {
  return (
    <>
      <HeroSection />
      <VascularFirstSection />
      <WorkflowSection />
      <ImagingSection />
      <AIKnowledgeSection />
      <BillingSection />
      <InteroperabilitySection />
      <SecuritySection />
      <ExpansionSection />
      <FinalCTASection />
    </>
  );
}
