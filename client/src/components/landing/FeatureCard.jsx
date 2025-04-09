import React from 'react';

const FeatureCard = ({ title, description, icon, background }) => {
  return (
    <div
      className="p-6 rounded-xl shadow-lg flex flex-col items-center text-center w-72 h-64"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
      }}
    >
      <img src={icon} alt={title} className="w-20 h-20 mb-2 object-contain" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm leading-relaxed max-w-xs">{description}</p>
    </div>
  );
};

export default FeatureCard;
