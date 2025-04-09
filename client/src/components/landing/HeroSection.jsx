import React from 'react';
import backgroundImage from '../../assets/images/heroSectionLivWell-1.png';

const HeroSection = () => {
  return (
    <div
      className="relative w-full h-screen flex items-center bg-cover bg-right px-12"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: 'right center',
      }}
    >
      <div className="text-white max-w-lg">
        <h2 className="text-5xl font-bold leading-tight">
          Transform Your Health Habits with LivWell
        </h2>
        <p className="mt-4 text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet lorem ipsum dolor sit amet.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;