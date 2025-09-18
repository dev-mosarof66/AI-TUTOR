import { CreditCard, CalendarDays, CheckCircle, XCircle } from "lucide-react";
import moment from "moment";

const CurrentSubscriptionCard = ({
  title = "Current Subscription",
  plan = "Premium",
  startDate = "2025-01-01",
  endDate = "2026-01-01",
  isActive = true,
  onManage,
}) => {
  const progress = 50;

  return (
    <div className="w-full flex flex-col gap-2 p-6 shadow-lg bg-gradient-to-br from-purple-800 to-purple-900">
      {/* Title */}
      <div className="flex items-center gap-2">
        <CreditCard className="w-6 h-6 text-purple-300" />
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>

      {/* Plan & Status */}
      <div className="w-full flex items-center justify-between gap-2 text-purple-200">
        <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-700 text-transparent bg-clip-text">
          {plan}
        </p>
        <div className="flex items-center gap-2">
          {isActive ? (
            <>
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <p>Active</p>
            </>
          ) : (
            <>
              <XCircle className="w-5 h-5 text-red-400" />
              <p>Expired</p>
            </>
          )}
        </div>
      </div>

      {/* Dates */}
      <div className="w-full flex items-center justify-between py-2">
        <div className="flex items-center gap-2 text-purple-200">
          <CalendarDays className="w-5 h-5 text-emerald-400" />
          <p>{moment(startDate).format("MMM DD, YYYY")}</p>
        </div>
        <div className="flex items-center gap-2 text-purple-200">
          <CalendarDays className="w-5 h-5 text-emerald-400" />
          <p>{moment(endDate).format("MMM DD, YYYY")}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-purple-700 rounded-full h-3">
        <div
          className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 h-3 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Button */}
      <div className="w-full flex justify-end">
        <button
          onClick={onManage}
          className="flex items-center justify-center gap-2 py-2 px-5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium shadow-md hover:from-pink-600 hover:to-purple-700 transition duration-300 cursor-pointer"
        >
          {isActive ? "Manage" : "Renew"}
        </button>
      </div>
    </div>
  );
};

export default CurrentSubscriptionCard;
