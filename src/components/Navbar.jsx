import { useState, useEffect } from "react";
import logo from "../assets/scoutripper-logo-light.png";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons for menu and close

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  // Function to handle scroll
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Add event listener on mount and clean up on unmount
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header>
      <nav
        className={`fixed left-0 right-0 top-0 z-10 flex w-full items-center justify-between px-8 py-5 transition-colors duration-300 ${
          isScrolled ? "bg-[#324B4C]" : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <div>
          <img src={logo} alt="Logo" className="h-10" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden flex-1 justify-center lg:flex">
          <ul className="flex items-center gap-5 text-white">
            <li>
              <a href="">Home</a>
            </li>
            <li>
              <a href="">Treks</a>
            </li>
            <li>
              <a href="">Explore</a>
            </li>
            <li>
              <a href="">Cleanup Drive</a>
            </li>
            <li>
              <a href="">Trek Essentials</a>
            </li>
          </ul>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden gap-5 lg:flex">
          <button className="rounded-md bg-white p-3 px-7 text-sm">
            Become An Expert
          </button>
          <button className="rounded-md border border-white bg-transparent p-3 px-7 text-sm text-white">
            Sign In / Register
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center lg:hidden">
          <button onClick={toggleMenu} className="text-2xl text-white">
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed left-0 right-0 top-0 z-20 flex h-auto flex-col gap-5 bg-[#324B4C] p-6 text-white">
          <button onClick={toggleMenu} className="self-end text-2xl text-white">
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
          <ul className="flex flex-col items-center gap-4">
            <li>
              <a href="">Home</a>
            </li>
            <li>
              <a href="">Treks</a>
            </li>
            <li>
              <a href="">Explore</a>
            </li>
            <li>
              <a href="">Cleanup Drive</a>
            </li>
            <li>
              <a href="">Trek Essentials</a>
            </li>
          </ul>
          <div className="mt-5 flex flex-col gap-3">
            <button className="mx-auto rounded-md bg-white p-3 px-7 text-sm text-[#324B4C]">
              Become An Expert
            </button>
            <button className="mx-auto rounded-md border border-white bg-transparent p-3 px-7 text-sm text-white">
              Sign In / Register
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
