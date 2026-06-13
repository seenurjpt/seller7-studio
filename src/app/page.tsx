import { AICapability } from "@/components/AICapability";
import { AIDemo } from "@/components/AIDemo";
import { AIStyleGallery } from "@/components/AIStyleGallery";
import { CoralCallout } from "@/components/CoralCallout";
import { FAQ } from "@/components/FAQ";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { LogosStrip } from "@/components/LogosStrip";
import { Navbar } from "@/components/Navbar";
import { Pricing } from "@/components/Pricing";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AIDemo />
        <LogosStrip />
        <AICapability />
        <AIStyleGallery />
        <HowItWorks />
        <Features />
        <Pricing />
        <CoralCallout />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
