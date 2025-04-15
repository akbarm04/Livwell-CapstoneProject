import React from 'react';
import FeatureCard from './FeatureCard';
import backgroundCard from '../../assets/images/background-card.jpg';
import hydrationIcon from '../../assets/images/hydrate-icon.png';
import sleepIcon from '../../assets/images/sleep-icon.png';
import exerciseIcon from '../../assets/images/exercise-icon.png';

const FeaturesSection = () => {
  return (
    <div className="py-16 text-center px-4 sm:px-6 lg:px-8" id="features">
      <style>
        {`
          .card-group:hover .feature-card:not(:hover) {
            filter: blur(6px);
            transform: scale(0.95);
            transition: all 0.4s ease;
          }

          .feature-card {
            transition: all 0.4s ease;
            flex: 1 1 300px; /* Responsive width */
            max-width: 350px;
          }

          .feature-card:hover {
            transform: scale(1.02);
            z-index: 10;
          }
        `}
      </style>

      <p className="text-green-500 font-semibold mb-2">Our Service</p>
      <h2 className="text-3xl font-bold mb-10">
        Features that Improve <span className="text-green-500">Your Life</span>
      </h2>

      {/* Responsive card container */}
      <div className="flex flex-wrap justify-center gap-6 card-group">
        <div className="feature-card">
          <FeatureCard
            title="Hydrate Monitoring"
            description="Never miss a sip! Keep track of your daily water intake and ensure optimal hydration for your body's needs."
            icon={hydrationIcon}
            background={backgroundCard}
          />
        </div>
        <div className="feature-card">
          <FeatureCard
            title="Sleep Tracking"
            description="Monitor your sleep patterns and improve your sleep quality with actionable insights for a healthier, more energized you."
            icon={sleepIcon}
            background={backgroundCard}
          />
        </div>
        <div className="feature-card">
          <FeatureCard
            title="Exercise Scheduling"
            description="Log workouts, track progress, and stay motivated from light exercises to intense routines."
            icon={exerciseIcon}
            background={backgroundCard}
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;