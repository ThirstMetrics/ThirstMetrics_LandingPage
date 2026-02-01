import Header from "@/components/Header";
import HeroRotator from "@/components/HeroRotator";
import TrustBar from "@/components/TrustBar";
import FeatureGrid from "@/components/FeatureGrid";
import PhotoBand from "@/components/PhotoBand";
import ProductWalkthrough from "@/components/ProductWalkthrough";
import MarketConditions from "@/components/MarketConditions";
import ComingSoonFeatures from "@/components/ComingSoonFeatures";
import SpotlightSection from "@/components/SpotlightSection";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroRotator />
        <TrustBar />
        <FeatureGrid />
        <PhotoBand />
        <ProductWalkthrough />
        <MarketConditions />
        <ComingSoonFeatures />
        <SpotlightSection />
        <FAQ />
        <FinalCTA />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
