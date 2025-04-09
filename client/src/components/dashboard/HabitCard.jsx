const HabitCard = ({ name, progress, target, streak, unit, color }) => {
    const percent = Math.round((progress / target) * 100);
  
    return (
      <div className="bg-white p-4 rounded-xl shadow-md">
        <div className="flex justify-between items-center">
          <h3 className="text-md font-bold">{name}</h3>
          <span className="text-sm text-gray-500">{streak} day streak</span>
        </div>
        <p className="text-sm mt-1 text-gray-600">Progress: {progress} / {target} {unit}</p>
        <div className="mt-2">
          <div className="w-16 h-16 rounded-full border-4 border-dashed flex items-center justify-center"
               style={{ borderColor: color }}>
            <span className="text-lg font-bold">{percent}%</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default HabitCard;
  