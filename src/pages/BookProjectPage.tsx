import BookProject from "../components/sections/BookProject";
import { StarsCanvas } from "../components";

const BookProjectPage = () => {
  return (
    <div className="relative z-0">
      <div className="min-h-screen pt-32">
        <BookProject />
      </div>
      <StarsCanvas />
    </div>
  );
};

export default BookProjectPage;
