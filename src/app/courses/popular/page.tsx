import CourseCard from "@/components/custom/CourseCard";
import React from "react";

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

const PopularCourse = () => {
  return (
    <div>
      <CourseCard courses={courses} />
    </div>
  );
};

export default PopularCourse;
