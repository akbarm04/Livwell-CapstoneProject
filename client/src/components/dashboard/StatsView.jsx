import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

const getCategoryGradient = (color) => {
  const colorMap = {
    '#3B82F6': 'from-blue-100 to-blue-50', // Water
    '#8B5CF6': 'from-purple-100 to-purple-50', // Sleep
    '#EF4444': 'from-red-100 to-red-50', // Exercise
  };
  return colorMap[color] || 'from-gray-100 to-gray-50';
};

const StatsView = ({ habits }) => {
  // Filter hanya main habits (isMain: true)
  const mainHabits = habits.filter(habit => habit.isMain);

  const generateDailyFeedback = () => {
    return mainHabits.map(habit => {
      const progress = habit.progress || 0;
      const current = parseFloat(habit.current || 0);
      const goal = parseFloat(habit.goal || 1);
      const unit = habit.unit || 'times';
      const progressWithUnit = `${current}/${goal} ${unit}`;
      const habitColor = habit.color || '#10B981';
      const colorClass = getCategoryGradient(habitColor);

      let feedback = '';
      let emoji = '';
      let motivation = '';

      switch (habit.name.toLowerCase()) {
        case 'sleep':
          if (progress >= 90) {
            feedback = "Tidur optimal tercapai!";
            emoji = "😊";
            motivation = "Kualitas tidurmu luar biasa! Tubuhmu pasti sangat berterima kasih!";
          } else if (progress >= 70) {
            feedback = "Tidur cukup baik";
            emoji = "🛌";
            motivation = "Hampir mencapai target ideal! Coba tidur 30 menit lebih awal besok!";
          } else {
            feedback = "Perlu lebih banyak tidur";
            emoji = "😴";
            motivation = "Tidur adalah fondasi kesehatan. Yuk, prioritaskan istirahat malam ini!";
          }
          break;

        case 'daily water':
          if (progress >= 100) {
            feedback = "Hidrasi sempurna!";
            emoji = "💧✅";
            motivation = "Tubuhmu pasti segar dengan hidrasi optimal seperti ini!";
          } else if (progress >= 75) {
            feedback = "Hidrasi cukup";
            emoji = "😐💦";
            motivation = "Tinggal sedikit lagi menuju target harian! Minum segelas lagi yuk!";
          } else {
            feedback = "Perbanyak minum";
            emoji = "⚠💦";
            motivation = "Jangan lupa bawa botol minum kemana pun! Setiap teguk berarti!";
          }
          break;

        case 'exercise':
          if (progress >= 100) {
            feedback = "Latihan sempurna!";
            emoji = "💪🔥";
            motivation = "Konsistensimu menginspirasi! Pertahankan energi positif ini!";
          } else if (progress >= 66) {
            feedback = "Latihan cukup baik";
            emoji = "🏋‍♂️⚠";
            motivation = "Tingkatkan 10 menit lagi besok untuk hasil lebih maksimal!";
          } else {
            feedback = "Ayo lebih aktif!";
            emoji = "❌🏋‍♂️";
            motivation = "Mulai dengan gerakan kecil, yang penting konsisten! Kamu bisa!";
          }
          break;

        default:
          if (progress >= 90) {
            feedback = "Luar biasa!";
            emoji = "🎉";
            motivation = "Prestasi hari ini patut dirayakan! Pertahankan semangatnya!";
          } else if (progress >= 70) {
            feedback = "Bagus!";
            emoji = "👍";
            motivation = "Sedikit lagi mencapai kesempurnaan! Kamu hebat!";
          } else {
            feedback = "Bisa lebih baik";
            emoji = "💪";
            motivation = "Setiap kemajuan adalah kemenangan! Besok pasti lebih baik!";
          }
      }

      return {
        habit: habit.name,
        progress,
        feedback,
        emoji,
        icon: habit.icon,
        progressWithUnit,
        colorClass,
        habitColor,
        motivation
      };
    });
  };

  const dailyFeedback = generateDailyFeedback();

  return (
    <div className="bg-gray-50 p-6 rounded-2xl">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Core Habits Achievement</h3>

      {/* Bar Chart Section - Tetap tampilkan semua habits */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 mb-8">
        <h4 className="text-lg font-semibold text-gray-700 mb-4">Progress Overview</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={habits}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
              <YAxis unit="%" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />
              <Bar dataKey="progress" radius={[6, 6, 0, 0]}>
                {habits.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || '#10B981'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

     {/* Feedback Cards - Hanya untuk 3 main habits */}
      {dailyFeedback.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-4">
            Personalized Insights for Core Habits
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dailyFeedback.slice(0, 3).map((item, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${item.colorClass} p-5 rounded-xl shadow-md transition-transform duration-300 hover:scale-[1.02]`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-full text-2xl"
                    style={{
                      backgroundColor: `${item.habitColor}20`,
                      color: item.habitColor,
                      border: `2px solid ${item.habitColor}`
                    }}
                  >
                    {item.icon}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h5 className="font-semibold text-gray-800">{item.habit}</h5>
                      <div className="flex items-center">
                        <span
                          className="text-xs font-bold px-2 py-1 rounded-full mr-2"
                          style={{ backgroundColor: item.habitColor, color: 'white' }}
                        >
                          {item.progress}%
                        </span>
                        <span className="text-xl">{item.emoji}</span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">{item.feedback}</span>
                        <span className="font-medium" style={{ color: item.habitColor }}>
                          {item.progressWithUnit}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${item.progress}%`, backgroundColor: item.habitColor }}
                        ></div>
                      </div>
                    </div>

                    <div className="bg-white bg-opacity-70 p-3 rounded-lg">
                      <p className="text-sm text-gray-700 italic">"✨ {item.motivation}"</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default StatsView;