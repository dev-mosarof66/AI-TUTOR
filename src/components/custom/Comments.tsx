'use client'
import { useAppSelector } from "@/app/hooks";
import React from "react";

const dummyComments = [
  {
    username: "Mosarof Hossain",
    text: "Great post!This helps me a lot to know about HTML",
    time: "2 hours ago",
    upvote: 20,
    downvote: 5,
    upvoted: true,
    downvoted: false,
  },
  {
    username: "Mr. Khaled",
    text: "Thanks for sharing. This is really a nice video for beginner",
    time: "1 hour ago",
    upvote: 50,
    downvote: 1,
    upvoted: false,
    downvoted: true,
  },
  {
    username: "Labib Sarkar",
    text: "Very helpful.Please continue with such video",
    time: "30 minutes ago",
    upvote: 100,
    downvote: 2,
    upvoted: true,
    downvoted: false,
  },
];

const Comments = () => {
  const isDarkMode = useAppSelector((state) => state.theme.theme);
  return (
    <div className="w-full flex flex-col gap-3 lg:gap-6 pb-20">
      <div className="w-full flex items-center justify-between">
        <h3 className="text-purple-600 sm:text-xl">
          Comments({dummyComments.length})
        </h3>
      </div>
      <ul className="grid grid-cols-1 gap-3 lg:gap-5">
        {dummyComments.map((comment, idx) => (
          <li
            key={idx}
            className="w-full bg-purple-500/10 p-3 lg:p-5 rounded-sm lg:rounded-md flex flex-col gap-2"
          >
            <div className="flex gap-2">
              <div className="size-8 sm:size-10 rounded-full cursor-pointer transition duration-300 hover:bg-green-600/80 active:ring active:ring-purple-500 bg-green-600"></div>
              <div>
                <h2 className={`text-sm ${isDarkMode ?'text-gray-300':'text-gray-600'}  cursor-pointer hover:text-gray-400 active:text-gray-500 transition-all duration-300 font-semibold`}>
                  {comment.username}
                </h2>
                <p className={`text-xs ${isDarkMode ?'text-green-500/60':''}`}>{comment.time}</p>
              </div>
            </div>
            <p className={`${isDarkMode?' text-gray-400':''} text-sm px-2`}>{comment.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
