import React from 'react';
import backgroundAbout from '../../assets/images/about-back-1.png';

const AboutSection = () => {
  return (
    <div className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8" id="about">
      {/* Embedded CSS for green pushable button */}
      <style>{`
      .pushable {
        position: relative;
        background: transparent;
        padding: 0px;
        border: none;
        cursor: pointer;
        outline-offset: 4px;
        transition: filter 250ms;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      }

      .shadow {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: rgba(22, 163, 74, 0.5);
        border-radius: 8px;
        filter: blur(2px);
        will-change: transform;
        transform: translateY(2px);
        transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
      }

      .edge {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        border-radius: 8px;
        background: linear-gradient(
          to right,
          #15803d 0%,
          #16a34a 8%,
          #15803d 92%, 
          #166534 100%
        );
      }

      .front {
        display: block;
        position: relative;
        border-radius: 8px;
        background: #16a34a;
        padding: 12px 24px; /* Smaller padding */
        color: white;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1.2px;
        font-size: 0.875rem; /* Smaller font size */
        transform: translateY(-4px);
        transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1), background 300ms;
      }

      .pushable:hover {
        filter: brightness(110%);
      }

      .pushable:hover .front {
        transform: translateY(-6px);
        background: #15803d;
        transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5), background 250ms;
      }

      .pushable:active .front {
        transform: translateY(-2px);
        transition: transform 34ms;
      }

      .pushable:hover .shadow {
        transform: translateY(4px);
        transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
      }

      .pushable:active .shadow {
        transform: translateY(1px);
        transition: transform 34ms;
      }

      .pushable:focus:not(:focus-visible) {
        outline: none;
      }
    `}</style>


      {/* Desktop Section */}
      <div
        className="hidden md:flex w-full h-[90vh] items-center px-20 bg-cover bg-center rounded-2xl"
        style={{ backgroundImage: `url(${backgroundAbout})` }}
      >
        <div className="max-w-xl text-left">
          <h2 className="text-sm text-green-600 mb-2 font-bold">About</h2>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            At <span className="text-green-600">LivWell</span>, we believe that small, consistent habits lead to lasting <br /> well-being.
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Our platform is designed to help you stay hydrated, maintain a regular exercise routine, and improve your sleep quality. With personalized insights and guidance, we make it easier for you to take control of your health and build a balanced lifestyle. Join us on your journey to better living!
          </p>
          <button className="pushable mt-6">
            <span className="shadow"></span>
            <span className="edge"></span>
            <span className="front">Contact Us</span>
          </button>
        </div>
      </div>

      {/* Mobile Section */}
      <div className="md:hidden bg-white">
        <div
          className="relative w-full rounded-2xl shadow-md overflow-hidden"
          style={{
            backgroundImage: `url(${backgroundAbout})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="bg-white/80 backdrop-blur-sm p-6">
            <h2 className="text-sm text-green-600 font-bold mb-2">About</h2>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              At <span className="text-green-600">LivWell</span>, we believe that small, consistent habits lead to lasting well-being.
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm">
              Our platform is designed to help you stay hydrated, maintain a regular exercise routine, and improve your sleep quality. With personalized insights and guidance, we make it easier for you to take control of your health and build a balanced lifestyle. Join us on your journey to better living!
            </p>
            <button className="pushable mt-6">
              <span className="shadow"></span>
              <span className="edge"></span>
              <span className="front">Contact Us</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
