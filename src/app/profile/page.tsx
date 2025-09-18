"use client";
import React from "react";
import UserCard from "@/components/profile/usercard";
import CurrentCourseCard from "@/components/profile/CurrentCourseCard";
import CurrentSubscriptionCard from "@/components/profile/CurrentSubscriptionCard";
import { useAppSelector } from "../hooks";

const Profile = () => {
  const { user, loading } = useAppSelector((state) => state.user);

  if (loading) {
    return (
      <div>
        <p>loading..</p>
      </div>
    );
  }

  const handleContinue = () => {};

  console.log(user);
  return (
    <div className="w-full h-full flex flex-col gap-4 p-4 pb-20">
      <div className="w-full">
        <UserCard />
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* current course  */}
        <div>
          <CurrentCourseCard
            title="WEB DEVELOPMENT 1.0"
            totalModules={40}
            completedModules={10}
            onContinue={handleContinue}
          />
        </div>
        {/* current subscription */}
        <div>
          <CurrentSubscriptionCard
            title="Current Subscription"
            startDate="2025-01-01"
            endDate="2026-01-01"
            isActive={true}
            onManage={() => alert("Managing subscription...")}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
