import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="backdrop-blur-md bg-white/80 shadow-md px-6 py-4 w-full fixed top-0 left-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="text-2xl font-extrabold text-green-600 hover:text-green-700 transition duration-300"
        >
          Liv<span className="text-gray-800">Well</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-10 text-gray-700 font-medium">
          <li>
            <a href="#features" className="hover:text-green-500 transition-colors duration-300">Features</a>
          </li>
          <li>
            <a href="#about" className="hover:text-green-500 transition-colors duration-300">About</a>
          </li>
          <li>
            <a href="#contact" className="hover:text-green-500 transition-colors duration-300">Contact</a>
          </li>
        </ul>

        {/* Desktop Login Button */}
        <Link to="/login" className="hidden md:block">
          <button className="button">Login</button>
        </Link>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 mt-4 shadow-lg rounded-lg px-6 py-4 space-y-4 text-gray-700 font-medium">
          <a href="#features" onClick={() => setIsOpen(false)} className="block hover:text-green-500">Features</a>
          <a href="#about" onClick={() => setIsOpen(false)} className="block hover:text-green-500">About</a>
          <a href="#contact" onClick={() => setIsOpen(false)} className="block hover:text-green-500">Contact</a>
          <Link to="/login" onClick={() => setIsOpen(false)}>
            <button className="w-full button">Login</button>
          </Link>
        </div>
      )}

      {/* Embedded styles for the button */}
      <style>
  {`
    .button {
      cursor: pointer;
      position: relative;
      padding: 6px 16px;
      font-size: 14px;
      color: rgb(34, 197, 94);
      border: 2px solid rgb(34, 197, 94);
      border-radius: 30px;
      background-color: transparent;
      font-weight: 600;
      transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
      overflow: hidden;
      z-index: 0;
    }

    .button::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 40px;
      aspect-ratio: 1 / 1;
      transform: translate(-50%, -50%) scale(0);
      background-color: rgb(34, 197, 94);
      border-radius: 9999px;
      z-index: -1;
      transition: transform 0.9s cubic-bezier(0.23, 1, 0.32, 1);
    }


    .button:hover::before {
      transform: translate(-50%, -50%) scale(10);
    }

    .button:hover {
      color: #fff;
      scale: 1.05;
      box-shadow: 0 0px 12px rgba(34, 197, 94, 0.4);
    }

    .button:active {
      scale: 1;
    }
  `}
</style>

    </nav>
  );
};

export default Navbar;