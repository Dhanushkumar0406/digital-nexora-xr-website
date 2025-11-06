import { Suspense, lazy } from "react";
import { About, Hero, Tech, Contact } from "../components";
const StarsCanvas = lazy(() => import("../components/canvas/Stars"));

const DigitalMarketing = lazy(() => import("../components/DigitalMarketing/DigitalMarketing"));

const Home = () => {
  return (
    <div className="relative">
      {/* Stars Background - Fixed behind all content (lazy-loaded) */}
      <Suspense fallback={null}>
        <div className="fixed inset-0 z-0 pointer-events-none">
          <StarsCanvas />
        </div>
      </Suspense>

      {/* Main Content - Layered above stars */}
      <div className="relative z-10">
        <Hero />
        <About />
        <Tech />
        <Suspense fallback={<div className="min-h-[420px] flex items-center justify-center">Loading section…</div>}>
          <DigitalMarketing />
        </Suspense>
        <Contact />
      </div>
    </div>
  );
};

export default Home;
