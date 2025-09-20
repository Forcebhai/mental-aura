import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react"; // Import useEffect
import { NavLink ,Link } from "react-router-dom"; // Import NavLink
import logo from "../assets/logo.png";
import { navItems } from "../constants";
const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  // NEW: useEffect to handle body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileDrawerOpen]);

  return (
    // UPDATED: Added a subtle shadow for depth
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80 shadow-md shadow-neutral-900/10">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img className="h-10 w-10 mr-2" src={logo} alt="Logo" />
            <span className="text-xl tracking-tight">Sukoon.ai</span>
          </div>
          <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => (
              <li key={index}>
                {/* UPDATED: Using NavLink for active styling */}
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors duration-300 hover:text-orange-500 ${
                      isActive ? "text-orange-400" : "text-neutral-400"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex justify-center space-x-6 items-center">
            <Link to="/AuthForm" className="py-2 px-3 border rounded-md hover:bg-neutral-800 transition-colors duration-300">
              Sign In
            </Link>
            <Link
              to="/SignUpForm"
              
              className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md hover:opacity-90 transition-opacity duration-300"
            >
              Create an account
            </Link>
          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar} aria-label="Toggle navigation">
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* UPDATED: Mobile drawer with transition for smooth slide-in */}
        <div
          className={`fixed top-[65px] right-0 z-20 bg-neutral-900 w-full h-screen p-12 flex flex-col justify-start items-center lg:hidden transition-transform duration-500 ease-in-out ${
            mobileDrawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ul className="w-full text-center">
            {navItems.map((item, index) => (
              <li key={index} className="py-4">
                <NavLink 
                  to={item.href} 
                  onClick={toggleNavbar} // Closes menu on link click
                  className={({ isActive }) =>
                    `text-xl transition-colors duration-300 hover:text-orange-500 ${
                      isActive ? "text-orange-400" : "text-white"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="flex flex-col items-center space-y-6 mt-8 w-full">
            <a href="#" className="py-2 px-3 border rounded-md w-full text-center hover:bg-neutral-800 transition-colors duration-300">
              Sign In
            </a>
            <a
              href="#"
              className="py-2 px-3 rounded-md bg-gradient-to-r from-orange-500 to-orange-800 w-full text-center hover:opacity-90 transition-opacity duration-300"
            >
              Create an account
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;