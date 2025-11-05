import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { config } from "./constants/config";
import { Navbar } from "./components";
import Home from "./pages/Home";
import BookProjectPage from "./pages/BookProjectPage";
import ProjectsPage from "./pages/ProjectsPage";

const App = () => {
  useEffect(() => {
    if (document.title !== config.html.title) {
      document.title = config.html.title;
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="bg-primary relative z-0">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/book-project" element={<BookProjectPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
