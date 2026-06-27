import HeroSection from "../components/home/HeroSection";
import FeaturesSection from "../components/home/FeaturesSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import BestSellersSection from "../components/home/BestSellersSection";
import CtaBanner from "../components/home/CtaBanner";

const Home = () => {
  return (
    <div className="w-full">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <BestSellersSection />
      <CtaBanner />
    </div>
  );
};

export default Home;
