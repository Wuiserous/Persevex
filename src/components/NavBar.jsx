"use client";
import { useRef, useState } from "react";

export default function NavBar() {
  const navRef = useRef(null);
  const [hoverBox, setHoverBox] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const handleMouseEnter = (e) => {
    const nav = navRef.current;
    const rect = e.target.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();

    setHoverBox({
      left: rect.left - navRect.left,
      width: rect.width,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setHoverBox((prev) => ({
      ...prev,
      opacity: 0,
    }));
  };

  return (
    <div
      className={`nav-bar w-full absolute z-10 h-16 flex justify-start p-2 pl-10 bg-black/5 backdrop-blur-xl items-center`}
    >
      <div
        ref={navRef}
        className="nav-content relative flex w-fit gap-3 items-center justify-center"
        onMouseLeave={handleMouseLeave}
      >
        {/* HOVER BOX */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-10  rounded highlight-section   transition-all duration-200 ease-out pointer-events-none"
          style={{
            left: `${hoverBox.left - 8.5}px`,
            width: `${hoverBox.width + 17}px`,
            opacity: hoverBox.opacity,
          }}
        ></div>

        <span
          className="text-2xl font-bold mr-5 relative z-10 cursor-pointer text-white/95"
        >
          Persevex
        </span>
        <span className="relative z-10 cursor-pointer mr-5 text-blue-500/60 hover:text-white" onMouseEnter={handleMouseEnter}>
          Courses
        </span>
        <span className="relative z-10 cursor-pointer mr-5 text-blue-500/60 hover:text-white" onMouseEnter={handleMouseEnter}>
          Internship
        </span>
        <span className="relative z-10 cursor-pointer mr-5 text-blue-500/60 hover:text-white" onMouseEnter={handleMouseEnter}>
          LMS
        </span>
        <span className="relative z-10 cursor-pointer mr-5 text-blue-500/60 hover:text-white" onMouseEnter={handleMouseEnter}>
          features
        </span>
        <span className="relative z-10 cursor-pointer mr-5 text-blue-500/60 hover:text-white" onMouseEnter={handleMouseEnter}>
          Contact
        </span>
        <span className="relative z-10 cursor-pointer mr-5 text-blue-500/60 hover:text-white" onMouseEnter={handleMouseEnter}>
          Blogs
        </span>
        <span className="relative z-10 cursor-pointer text-blue-500/60 hover:text-white/40" onMouseEnter={handleMouseEnter}>
          Privacy Policy
        </span>
      </div>
    </div>
  );
}
