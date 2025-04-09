import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import aiImage from '../../assets/images/aiIllustration.png';

const RecommendationSection = () => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;  
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    card.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
  };

  return (
    <div className="flex items-center justify-between p-12 bg-white max-w-6xl mx-auto relative">
      <style>
        {`
          .learn-more {
            width: 12rem;
            height: auto;
            position: relative;
            display: inline-block;
            cursor: pointer;
            outline: none;
            border: 0;
            vertical-align: middle;
            text-decoration: none;
            background: transparent;
            padding: 0;
            font-size: inherit;
            font-family: inherit;
          }

          .learn-more .circle {
            transition: all 0.55s cubic-bezier(0.65, 0, 0.076, 1);
            position: relative;
            display: block;
            margin: 0;
            width: 3rem;
            height: 3rem;
            background: #22c55e;
            border-radius: 1.625rem;
          }

          .learn-more .circle .icon {
            transition: all 0.55s cubic-bezier(0.65, 0, 0.076, 1);
            position: absolute;
            top: 0;
            bottom: 0;
            margin: auto;
            background: #fff;
          }

          .learn-more .circle .icon.arrow {
            left: 0.625rem;
            width: 1.125rem;
            height: 0.125rem;
            background: none;
          }

          .learn-more .circle .icon.arrow::before {
            position: absolute;
            content: "";
            top: -0.29rem;
            right: 0.0625rem;
            width: 0.625rem;
            height: 0.625rem;
            border-top: 0.125rem solid #fff;
            border-right: 0.125rem solid #fff;
            transform: rotate(45deg);
          }

          .learn-more .button-text {
            transition: all 0.55s cubic-bezier(0.65, 0, 0.076, 1);
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            padding: 0.75rem 0;
            margin: 0 0 0 1.85rem;
            color: #22c55e;
            font-weight: 700;
            line-height: 1.6;
            text-align: center;
            text-transform: uppercase;
          }

          .learn-more:hover .circle {
            width: 100%;
          }

          .learn-more:hover .circle .icon.arrow {
            background: #fff;
            transform: translate(1rem, 0);
          }

          .learn-more:hover .button-text {
            color: #fff;
          }

          .cards {
            perspective: 1000px;
          }

          .card {
            transform-style: preserve-3d;
            transition: transform 0.15s ease-out;
            will-change: transform;
            border-radius: 1rem;
            overflow: hidden;
          }
        `}
      </style>

      <div className="max-w-xl">
        <div className="inline-block bg-gray-200 text-gray-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">
          Machine Learning Powered
        </div>
        <h2 className="text-4xl font-bold text-gray-900">
          Smart Recommendations Based on Your Data
        </h2>
        <p className="mt-4 text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet lorem ipsum dolor sit amet.
        </p>

        <Link to="/login" className="learn-more mt-6">
          <span className="circle" aria-hidden="true">
            <span className="icon arrow"></span>
          </span>
          <span className="button-text">Try It Now</span>
        </Link>
      </div>

      <div className="w-1/2 flex justify-center cards">
        <div
          className="card w-full max-w-md"
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <img src={aiImage} alt="AI Illustration" className="w-full h-auto object-cover" />
        </div>
      </div>
    </div>
  );
};

export default RecommendationSection;