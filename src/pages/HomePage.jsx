import { Hero } from "../components/hero/Hero";
import { LogoMarquee } from "../components/features/LogoMarquee";
import { Features } from "../components/features/Features";
import { HowItWorks } from "../components/how-it-works/HowItWorks";
import { Stats } from "../components/stats/Stats";
import { Pricing } from "../components/pricing/Pricing";
import { Testimonials } from "../components/testimonials/Testimonials";
import { Faq } from "../components/faq/Faq";
import { CtaSection } from "../components/cta/CtaSection";

export function HomePage() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <Features />
      <HowItWorks />
      <Stats />
      <Pricing />
      <Testimonials />
      <Faq />
      <CtaSection />
    </>
  );
}
