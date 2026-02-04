import { Sidebar } from "./components/Layout/Sidebar";
import { MobileNav } from "./components/Layout/MobileNav";
import { Footer } from "./components/Layout/Footer";
import { Hero } from "./components/Hero";
import { WhyLicenses } from "./components/WhyLicenses";
import { SpectrumSection } from "./components/Spectrum/SpectrumSection";
import { LicenseGrid } from "./components/LicenseCards/LicenseGrid";
import { ComparisonTable } from "./components/Comparison/ComparisonTable";
import { DecisionWizard } from "./components/DecisionHelper/DecisionWizard";
import { MisconceptionList } from "./components/Misconceptions/MisconceptionList";
import { GlossarySection } from "./components/Glossary/GlossarySection";
import { useActiveSection } from "./hooks/useActiveSection";

export default function App() {
  const activeSection = useActiveSection();

  return (
    <>
      <Sidebar activeSection={activeSection} />
      <MobileNav activeSection={activeSection} />

      <main className="pt-14 lg:ml-56 lg:pt-0">
        <Hero />
        <WhyLicenses />
        <SpectrumSection />
        <LicenseGrid />
        <ComparisonTable />
        <DecisionWizard />
        <MisconceptionList />
        <GlossarySection />
      </main>

      <div className="lg:ml-56">
        <Footer />
      </div>
    </>
  );
}
