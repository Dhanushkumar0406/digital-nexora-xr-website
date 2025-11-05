import {
  About,
  Hero,
  Tech,
  Contact,
  StarsCanvas,
} from "../components";
import DigitalMarketing from "../components/sections/DigitalMarketing";

const Home = () => {
  return (
    <div className="relative">
      {/* Stars Background - Fixed behind all content */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <StarsCanvas />
      </div>

      {/* Main Content - Layered above stars */}
      <div className="relative z-10">
        <Hero />
        <About />
        <Tech />
        <DigitalMarketing />
        <Contact />
      </div>
    </div>
  );
};

export default Home;
