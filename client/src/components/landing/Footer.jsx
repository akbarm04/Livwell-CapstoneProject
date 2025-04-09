import React from 'react';
import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-12 px-4 border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        {/* Main Content - Flex Container */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          {/* Branding Section - Left */}
          <div className="md:w-1/4">
            <h2 className="text-3xl font-bold text-green-500 mb-2">LivWell</h2>
            <p className="text-gray-600">
              Small Steps to Healthy Living, <br /> Big Impact for the Future
            </p>
          </div>

          {/* Links Grid - Middle */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:w-2/4">
            {/* Navigation Column */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-4 text-lg">Navigation</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-green-600 transition">
                    Home Page
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-green-600 transition">
                    Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-green-600 transition">
                    Source of Information
                  </a>
                </li>
              </ul>
            </div>

            {/* About Column */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-4 text-lg">About</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-green-600 transition">
                    Email
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-green-600 transition">
                    Address
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-green-600 transition">
                    Phone Number
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-4 text-lg" id="contact">
                Contact
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-green-600 transition">
                    Career
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-green-600 transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-green-600 transition">
                    Other Information
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Media Section - Right (Vertical) */}
          <div className="md:w-1/4 md:flex md:justify-end">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 text-lg">Follow Us</h3>
              <div className="flex flex-col space-y-4">
                <a href="#" className="text-gray-500 hover:text-green-600 transition flex items-center">
                  <FaInstagram className="w-5 h-5 mr-2" />
                  <span>Instagram</span>
                </a>

                <a href="#" className="text-gray-500 hover:text-green-600 transition flex items-center">
                  <FaFacebook className="w-5 h-5 mr-2" />
                  <span>Facebook</span>
                </a>
                <a href="#" className="text-gray-500 hover:text-green-600 transition flex items-center">
                  <FaLinkedin className="w-5 h-5 mr-2" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="bg-green-500 w-full h-full rounded-lg py-3">
          <div className="text-center text-white text-sm font-medium">© 2025 LivWell Inc. All rights Reserved</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
