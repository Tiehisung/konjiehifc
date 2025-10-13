"use client";

import { useEffect, useState } from "react";
import { LiaAngleUpSolid } from "react-icons/lia";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Handle scroll visibility
  useEffect(() => {
    if (typeof window === "undefined") return;

    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    if (typeof window !== "undefined")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
  };

  return (
    <div className="fixed bottom-6 right-6">
      {isVisible && (
        <button
          title="Back to Top"
          onClick={scrollToTop}
          className="flex items-center justify-center w-12 h-12 bg-accent text-accent-foreground rounded-full shadow-lg hover:bg-base-100 _slowTrans"
          aria-label="Back to Top"
        >
          <LiaAngleUpSolid />
        </button>
      )}
    </div>
  );
};

export default BackToTopButton;
