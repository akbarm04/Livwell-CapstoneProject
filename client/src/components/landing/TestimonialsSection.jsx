import React, { useState } from 'react';
import image1 from '../../assets/images/image1.png';
import image2 from '../../assets/images/image2.png';
import image3 from '../../assets/images/image3.png';
import image4 from '../../assets/images/image4.png';

const TestimonialsSection = () => {
  const [activePopup, setActivePopup] = useState(null);

  const testimonials = [
    {
      id: 1,
      image: image1,
      quote:
        'This app is a game-changer for my busy lifestyle. From monitoring my workouts to reminding me about healthy habits, it feels like having a personal health assistant in my pocket. Highly recommend it to anyone looking to balance life and wellness!',
      author: 'Gunawan Busyaeri',
      role: 'Busy Professional',
    },
    {
      id: 2,
      image: image2,
      quote:
        "As a business owner constantly balancing multiple priorities, Reviva has become an indispensable tool. The streamlined interface and actionable insights have significantly improved my focus and productivity. It's now an integral part of my daily routine, helping me achieve both personal and professional goals",
      author: 'Afera Nufariah',
      role: 'Business Owner',
    },
    {
      id: 3,
      image: image3,
      quote:
        'Reviva has transformed my daily routine completely. It helps me track my calorie intake, sleep patterns, and even motivates me to stay hydrated. I finally feel in control of my health journey!',
      author: 'Sultan Badra',
      role: 'Wellness Seeker',
    },
    {
      id: 4,
      image: image4,
      quote:
        'Reviva makes every aspect of wellness feel achievable. The daily reminders and tracking tools have become part of my routine, and I’ve never felt more productive. It’s definitely the best decision I’ve made for my health!',
      author: 'Rafi Islamy',
      role: 'New User',
    },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-green-500 font-semibold mb-2">Testimonials</h2>
        <p className="text-4xl font-bold mb-12">
          What they said about <span className="text-green-500">LivWell?</span>
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative">
          {testimonials.map((testimonial) => {
            const isLeftSide = testimonial.id === 2 || testimonial.id === 4;
            const popupPosition = isLeftSide ? 'right-full mr-4' : 'left-full ml-4';
            const arrowPosition = isLeftSide
              ? 'absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rotate-45 border-r border-b border-gray-100'
              : 'absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-100';

            return (
              <div
                key={testimonial.id}
                className="relative group"
                onMouseEnter={() => setActivePopup(testimonial.id)}
                onMouseLeave={() => setActivePopup(null)}
              >
                <div className="w-32 h-32 mx-auto rounded-lg overflow-hidden shadow-md transition-all duration-300 group-hover:scale-105 cursor-pointer">
                  <img src={testimonial.image} alt={testimonial.author} className="w-full h-full object-cover" />
                </div>

                {activePopup === testimonial.id && (
                  <div
                    className={`absolute z-20 top-1/2 ${popupPosition} transform -translate-y-1/2 w-64 bg-white p-6 rounded-xl shadow-2xl border border-gray-100`}
                  >
                    <div className="text-sm italic text-gray-600 mb-3">"{testimonial.quote}"</div>
                    <div className="font-semibold text-gray-800">{testimonial.author}</div>
                    <div className="text-xs text-gray-500 mt-1">{testimonial.role}</div>

                    {/* Arrow pointer */}
                    <div className={arrowPosition}></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
