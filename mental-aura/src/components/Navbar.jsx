import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { navItems } from "../constants";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  useEffect(() => {
    if (mobileDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileDrawerOpen]);

  return (
    <nav className="sticky top-0 z-50 py-3">
      <div className="container px-4 mx-auto relative lg:text-sm">
        {/* UPDATED: Justification changes for centering */}
        <div className="flex justify-between lg:justify-center items-center">
          {/* UPDATED: Logo is now hidden on desktop */}
          <div className="flex items-center flex-shrink-0 lg:hidden">
            <img className="h-10 w-10 mr-2" src={logo} alt="Logo" />
            <span className="text-xl tracking-tight">ManMitra</span>
          </div>

          {/* Pill-Style Desktop Navigation - Unchanged */}
          <div className="hidden lg:flex items-center space-x-4 bg-neutral-800/90 p-2 rounded-full border border-neutral-700">
            <ul className="flex items-center space-x-1">
              {navItems.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `text-sm font-medium transition-colors duration-300 rounded-full px-4 py-2 block ${
                        isActive
                          ? " text-neutral-400  hover:text-white"
                          : "text-neutral-400 hover:text-white"
                      }`
                    }
                  > 
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="flex items-center space-x-2">
              <Link
                to="/AuthForm"
                className="text-sm font-medium transition-colors duration-300 rounded-full px-4 py-2 text-neutral-400 hover:text-white"
              >
                Sign In
              </Link>
              <Link
                to="/SignUpForm"
                className="text-sm font-medium transition-opacity duration-300 bg-neutral-950 text-white hover:bg-black rounded-full px-4 py-2"
              >
                Create an account
              </Link>
            </div>
          </div>

          {/* Mobile Menu Toggle - Unchanged */}
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar} aria-label="Toggle navigation">
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer - Unchanged */}
        <div
          className={`fixed top-[65px] right-0 z-20 bg-neutral-900 w-full h-screen p-12 flex flex-col justify-start items-center lg:hidden transition-transform duration-500 ease-in-out ${
            mobileDrawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* ... mobile content ... */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
