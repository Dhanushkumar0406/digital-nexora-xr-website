import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { styles } from "../../constants/styles";
import { navLinks } from "../../constants";
import * as Assets from "../../assets";
import { config } from "../../constants/config";

const Navbar = () => {
  const [active, setActive] = useState<string | null>();
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (navId: string) => {
    if (navId === "book-project") {
      navigate("/book-project");
      window.scrollTo(0, 0);
    } else if (navId === "projects") {
      navigate("/projects");
      window.scrollTo(0, 0);
    } else {
      // If not on home page, navigate to home first
      if (location.pathname !== "/") {
        navigate("/");
        // Wait for navigation then scroll to section
        setTimeout(() => {
          const element = document.getElementById(navId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        // Already on home page, just scroll
        const element = document.getElementById(navId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
    setActive(navId);
    setToggle(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
        setActive("");
      }
    };

    window.addEventListener("scroll", handleScroll);

    const navbarHighlighter = () => {
      const sections = document.querySelectorAll("section[id]");

      sections.forEach((current) => {
        const sectionId = current.getAttribute("id");
        // @ts-ignore
        const sectionHeight = current.offsetHeight;
        const sectionTop =
          current.getBoundingClientRect().top - sectionHeight * 0.2;

        if (sectionTop < 0 && sectionTop + sectionHeight > 0) {
          setActive(sectionId);
        }
      });
    };

    window.addEventListener("scroll", navbarHighlighter);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", navbarHighlighter);
    };
  }, []);

  return (
    <nav
      className={`${
        styles.paddingX
      } fixed top-0 z-20 flex w-full items-center py-5 transition-all duration-300 ${
        scrolled ? "bg-primary backdrop-blur-lg shadow-lg" : "bg-transparent backdrop-blur-sm"
      }`}
      style={{
        backdropFilter: scrolled ? "blur(16px)" : "blur(8px)",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "blur(8px)",
      }}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 group"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >

          <p
            className="flex cursor-pointer text-[18px] font-bold text-white transition-all duration-300 group-hover:tracking-wider"
            style={{
              transform: scrolled ? "none" : "perspective(500px) rotateX(2deg)",
            }}
          >
            {config.html.title}
          </p>
        </Link>

        <ul className="hidden list-none flex-row gap-10 sm:flex">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.id ? "text-white" : "text-secondary"
              } cursor-pointer text-[18px] font-medium hover:text-white`}
              onClick={() => handleNavClick(nav.id)}
            >
              <span>{nav.title}</span>
            </li>
          ))}
        </ul>

        {/* Desktop CTA removed as requested */}

        <div className="flex flex-1 items-center justify-end sm:hidden">
          <img
            src={toggle ? Assets.close ?? "" : Assets.menu ?? ""}
            alt="menu"
            className="h-[28px] w-[28px] object-contain"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } black-gradient absolute right-0 top-20 z-10 mx-4 my-2 min-w-[140px] rounded-xl p-6`}
          >
            <ul className="flex flex-1 list-none flex-col items-start justify-end gap-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins cursor-pointer text-[16px] font-medium ${
                    active === nav.id ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => handleNavClick(nav.id)}
                >
                  <span>{nav.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
