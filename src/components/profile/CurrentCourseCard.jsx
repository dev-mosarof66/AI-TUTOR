import { BookOpen, CheckCircle, PlayCircle } from "lucide-react";

const CurrentCourseCard = ({ title, completedModules, totalModules, onContinue }) => {
  const progress = Math.round((completedModules / totalModules) * 100);

  return (
    <div className="p-6 shadow-lg bg-gradient-to-br from-purple-800 to-purple-900 w-full">
      {/* Title */}
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-6 h-6 text-purple-300" />
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>

      {/* Modules completed */}
      <div className="flex items-center gap-2 text-purple-200 mb-2">
        <CheckCircle className="w-5 h-5 text-emerald-400" />
        <p>
          No. of modules completed: {completedModules} / {totalModules}
        </p>
      </div>

      {/* Completion rate */}
      <div className="flex items-center gap-2 text-purple-200 mb-2">
        <CheckCircle className="w-5 h-5 text-emerald-400" />
        <p>Completion rate: {progress}%</p>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-purple-700 rounded-full h-3 mb-6">
        <div
          className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 h-3 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Button */}
      <div className="w-full flex justify-end">
        <button
          onClick={onContinue}
          className="flex items-center justify-center gap-2 py-2 px-5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium shadow-md hover:from-pink-600 hover:to-purple-700 transition duration-300 cursor-pointer"
        >
          <PlayCircle className="w-5 h-5" />
          Continue
        </button>
      </div>
    </div>
  );
};

export default CurrentCourseCard;
