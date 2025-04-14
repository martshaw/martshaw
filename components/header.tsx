"use client";

import { useState, useEffect, useCallback, memo } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Memoize the scroll handler to prevent recreation on each render
  const handleScroll = useCallback(() => {
    // Update header background
    setIsScrolled(window.scrollY > 10);

    // Determine active section
    const sections = [
      "home",
      "profile",
      "work",
      "about",
      "experience",
      "contact",
    ];

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        // If the section is in view (with some tolerance)
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection((prev) => (prev !== section ? section : prev));
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    // Throttled scroll event listener
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollListener, { passive: true });
    return () => window.removeEventListener("scroll", scrollListener);
  }, [handleScroll]);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => scrollToSection("home")}
            className="text-xl font-bold mr-8 text-white uppercase"
          >
            martshaw
          </button>
          <nav className="hidden md:flex space-x-6">
            <button
              onClick={() => scrollToSection("home")}
              className={`text-sm transition-colors uppercase ${
                activeSection === "home"
                  ? "text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Welcome
            </button>
            <button
              onClick={() => scrollToSection("profile")}
              className={`text-sm transition-colors uppercase ${
                activeSection === "profile"
                  ? "text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => scrollToSection("work")}
              className={`text-sm transition-colors uppercase ${
                activeSection === "work"
                  ? "text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Work
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className={`text-sm transition-colors uppercase ${
                activeSection === "about"
                  ? "text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("experience")}
              className={`text-sm transition-colors uppercase ${
                activeSection === "experience"
                  ? "text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className={`text-sm transition-colors uppercase ${
                activeSection === "contact"
                  ? "text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Contact
            </button>
          </nav>
        </div>

        <div className="flex items-center">
          <Button
            variant="outline"
            size="sm"
            className="text-xs hidden md:inline-flex bg-transparent border-white text-white hover:bg-white/10 uppercase"
            asChild
          >
            <a href="mailto:info@martinshaw.com">Say Hello</a>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-black text-white">
              <nav className="flex flex-col space-y-6 mt-10">
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-lg font-medium text-left uppercase"
                >
                  Welcome
                </button>
                <button
                  onClick={() => scrollToSection("profile")}
                  className="text-lg font-medium text-left uppercase"
                >
                  Profile
                </button>
                <button
                  onClick={() => scrollToSection("work")}
                  className="text-lg font-medium text-left uppercase"
                >
                  Work
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-lg font-medium text-left uppercase"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection("experience")}
                  className="text-lg font-medium text-left uppercase"
                >
                  Experience
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-lg font-medium text-left uppercase"
                >
                  Contact
                </button>
                <Button
                  variant="outline"
                  className="mt-4 bg-transparent border-white text-white hover:bg-white/10 uppercase"
                  asChild
                >
                  <a href="mailto:info@martinshaw.com">Say Hello</a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

// Memoize the component to prevent unnecessary re-renders
export const MemoizedHeader = memo(Header);
export { MemoizedHeader as Header };
