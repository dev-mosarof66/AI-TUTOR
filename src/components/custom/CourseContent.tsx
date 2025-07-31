"use client";
import React, { useState } from "react";
import "../../css/sidebar.css";
import { Button } from "@mui/material";
import CourseCard from "./CourseCard";

const Tabs = [
  {
    id: 0,
    name: "All",
  },
  {
    id: 1,
    name: "C",
  },
  {
    id: 2,
    name: "JS",
  },
  {
    id: 3,
    name: "Python",
  },
  {
    id: 4,
    name: "Java",
  },
  {
    id: 5,
    name: "C++",
  },
  {
    id: 6,
    name: "Ruby",
  },
  {
    id: 7,
    name: "Web",
  },
];

const courses = [
  {
    id: 1,
    title: "React for Beginners",
    description:
      "Learn the fundamentals of building dynamic user interfaces with React, including components, hooks, and JSX.",
    duration: "8h",
    level: "basic",
    lessons: 24,
  },
  {
    id: 2,
    title: "Advanced JavaScript",
    description:
      "Master advanced JavaScript concepts such as closures, prototypes, async/await, and ES6+ features.",
    duration: "10h",
    level: "advance",
    lessons: 30,
  },
  {
    id: 3,
    title: "Python Programming",
    description:
      "Get started with Python for data analysis, automation, and software development.",
    duration: "12h",
    level: "basic",
    lessons: 28,
  },
  {
    id: 4,
    title: "HTML & CSS Essentials",
    description:
      "Build beautiful and responsive web pages using HTML5 and modern CSS, including Flexbox and Grid.",
    duration: "6h",
    level: "basic",
    lessons: 20,
  },
  {
    id: 5,
    title: "Node.js and Express",
    description:
      "Create backend applications using Node.js and Express, including RESTful APIs and middleware.",
    duration: "9h",
    level: "advance",
    lessons: 22,
  },
  {
    id: 6,
    title: "Full-Stack Web Development",
    description:
      "Build full-stack applications using MongoDB, Express, React, and Node.js (MERN Stack).",
    duration: "14h",
    level: "advance",
    lessons: 35,
  },
  {
    id: 7,
    title: "TypeScript Crash Course",
    description:
      "Understand the basics of TypeScript to improve JavaScript development with static typing.",
    duration: "5h",
    level: "basic",
    lessons: 15,
  },
  {
    id: 8,
    title: "Django Web Development",
    description:
      "Build web apps using Django, a high-level Python framework with built-in admin and ORM support.",
    duration: "10h",
    level: "advance",
    lessons: 26,
  },
  {
    id: 9,
    title: "C Programming Basics",
    description:
      "Explore foundational C programming concepts including pointers, memory management, and structures.",
    duration: "7h",
    level: "basic",
    lessons: 18,
  },
  {
    id: 10,
    title: "Java Programming",
    description:
      "Dive into OOP with Java, covering classes, interfaces, inheritance, and multithreading.",
    duration: "11h",
    level: "advance",
    lessons: 27,
  },
];

const CourseContent = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <div className="w-full">
      <div className="w-full md:w-[580px] xl:w-full flex items-center gap-2 overflow-x-scroll scrollbar-hidden">
        {Tabs.map((tab) => (
          <div
            onClick={() => setSelectedTab(tab.id)}
            key={tab.id}
            className={`${
              selectedTab === tab.id && "bg-purple-500/30"
            } duration-200 delay-100 cursor-pointer rounded-sm`}
          >
            <Button
              variant="text"
              className={`px-6 py-1  cursor-pointer transition duration-300 delay-75 active:scale-95`}
            >
              {tab.name}
            </Button>
          </div>
        ))}
      </div>
      <div>
        <CourseCard courses={courses} />
      </div>
    </div>
  );
};

export default CourseContent;
