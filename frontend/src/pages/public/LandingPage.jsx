import HeroSection from "../../components/landing/HeroSection";
import FeaturesSection from "../../components/landing/FeaturesSection";
import AISection from "../../components/landing/AISection";
import CTASection from "../../components/landing/CTASection";
import Footer from "../../components/landing/Footer";

function LandingPage() {
  return (
    <div className="bg-[#0A0A0A] text-white">

      <HeroSection />

      <FeaturesSection />

      <AISection />

      <CTASection />

      <Footer />

    </div>
  );
}

export default LandingPage;