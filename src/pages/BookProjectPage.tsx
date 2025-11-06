import { Suspense, lazy } from "react";
import BookProject from "../components/sections/BookProject";
const StarsCanvas = lazy(() => import("../components/canvas/Stars"));

const BookProjectPage = () => {
  return (
    <div className="relative z-0">
      <div className="min-h-screen pt-32">
        <BookProject />
      </div>
      <Suspense fallback={null}>
        <StarsCanvas />
      </Suspense>
    </div>
  );
};

export default BookProjectPage;
