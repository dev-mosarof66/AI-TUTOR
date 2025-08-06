/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Divider,
} from "@mui/material";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as RechartTooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { formatDistanceToNow, parseISO } from "date-fns";
import { FaUserGraduate, FaClock, FaCheckCircle } from "react-icons/fa";
import { useAppSelector } from "@/app/hooks";

interface LessonPopularity {
  lessonId: string;
  title: string;
  views: number;
  completions: number;
}

interface WeeklyActive {
  weekStart: string; // ISO date
  activeUsers: number;
}

interface CourseAnalytics {
  totalEnrolled: number;
  completionRate: number; // 0-1
  averageTimeSpentMinutes: number;
  activeThisWeek: number;
  weeklyActiveUsers: WeeklyActive[];
  lessonPopularity: LessonPopularity[];
  updatedAt: string;
}

interface Props {
  courseId: string;
  analyticsData?: CourseAnalytics; // optional override
}

const sampleData: CourseAnalytics = {
  totalEnrolled: 1240,
  completionRate: 0.58,
  averageTimeSpentMinutes: 72.4,
  activeThisWeek: 312,
  weeklyActiveUsers: [
    { weekStart: "2025-07-07", activeUsers: 180 },
    { weekStart: "2025-07-14", activeUsers: 210 },
    { weekStart: "2025-07-21", activeUsers: 245 },
    { weekStart: "2025-07-28", activeUsers: 300 },
    { weekStart: "2025-08-04", activeUsers: 312 },
  ],
  lessonPopularity: [
    {
      lessonId: "l1",
      title: "Introduction to ML",
      views: 1024,
      completions: 678,
    },
    {
      lessonId: "l2",
      title: "Supervised Learning",
      views: 980,
      completions: 512,
    },
    {
      lessonId: "l3",
      title: "Unsupervised Learning",
      views: 840,
      completions: 410,
    },
    {
      lessonId: "l4",
      title: "Model Evaluation",
      views: 760,
      completions: 390,
    },
    {
      lessonId: "l5",
      title: "Feature Engineering",
      views: 680,
      completions: 325,
    },
    {
      lessonId: "l6",
      title: "Deployment Basics",
      views: 500,
      completions: 220,
    },
  ],
  updatedAt: new Date().toISOString(),
};

const CourseAnalyticsPage: React.FC<Props> = ({ courseId, analyticsData }) => {
  const [data, setData] = useState<CourseAnalytics | null>(
    analyticsData || null
  );
  const isDarkMode = useAppSelector((state) => state.theme.theme);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // if no override passed, simulate fetching sample after short delay
  useEffect(() => {
    if (analyticsData) return;
    setLoading(true);
    const timer = setTimeout(() => {
      setData(sampleData);
      setLoading(false);
    }, 500); // simulate latency
    return () => clearTimeout(timer);
  }, [analyticsData]);

  if (loading) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20 gap-4">
        <CircularProgress />
        <Typography variant="body1">Loading analytics...</Typography>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20 gap-4">
        <Typography color="error" variant="h6">
          {error || "No analytics available."}
        </Typography>
      </div>
    );
  }

  // prepare chart data
  const weeklyLineData = data.weeklyActiveUsers.map((w) => ({
    week: formatDateLabel(w.weekStart),
    active: w.activeUsers,
  }));

  const lessonBarData = data.lessonPopularity.slice(0, 8).map((l) => ({
    name: l.title,
    views: l.views,
    completions: l.completions,
  }));

  const completionPie = [
    { name: "Completed", value: data.completionRate * 100 },
    { name: "Incomplete", value: 100 - data.completionRate * 100 },
  ];

  function formatDateLabel(iso: string) {
    try {
      const d = parseISO(iso);
      return `${d.getMonth() + 1}/${d.getDate()}`;
    } catch {
      return iso;
    }
  }

  return (
    <div className="w-full max-w-3xl flex justify-center">
      <div className="w-full space-y-6 p-6">
        {/* Header + summary metrics */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card className={`shadow ${isDarkMode ? "bg-gray-600" : ""}`}>
            <CardContent>
              <div className="flex items-center gap-3">
                <FaUserGraduate size={24} />
                <div>
                  <Typography variant="subtitle2">Total Enrolled</Typography>
                  <Typography variant="h5">{data.totalEnrolled}</Typography>
                </div>
              </div>
              <Typography
                variant="caption"
                className="mt-1 block text-sm text-gray-700"
              >
                Updated{" "}
                {formatDistanceToNow(new Date(data.updatedAt), {
                  addSuffix: true,
                })}
              </Typography>
            </CardContent>
          </Card>

          <Card className="shadow">
            <CardContent>
              <div className="flex items-center gap-3">
                <FaCheckCircle size={24} />
                <div>
                  <Typography variant="subtitle2">Completion Rate</Typography>
                  <Typography variant="h5">
                    {(data.completionRate * 100).toFixed(1)}%
                  </Typography>
                </div>
              </div>
              <Typography
                variant="caption"
                className="mt-1 block text-sm text-gray-700"
              >
                of enrolled users
              </Typography>
            </CardContent>
          </Card>

          <Card className="shadow">
            <CardContent>
              <div className="flex items-center gap-3">
                <FaClock size={24} />
                <div>
                  <Typography variant="subtitle2">Avg Time Spent</Typography>
                  <Typography variant="h5">
                    {Math.round(data.averageTimeSpentMinutes)}m
                  </Typography>
                </div>
              </div>
              <Typography
                variant="caption"
                className="mt-1 block text-sm text-gray-700"
              >
                per user
              </Typography>
            </CardContent>
          </Card>
        </div>

        <Divider />

        {/* Charts */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weekly Active Users */}
          <Card className="col-span-2 shadow">
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <Typography variant="h6">Weekly Active Users</Typography>
                <Typography variant="caption" className="text-gray-500">
                  Trend over recent weeks
                </Typography>
              </div>
              <div style={{ width: "100%", height: 240 }}>
                <ResponsiveContainer>
                  <LineChart data={weeklyLineData}>
                    <XAxis dataKey="week" />
                    <YAxis allowDecimals={false} />
                    <RechartTooltip />
                    <Line
                      type="monotone"
                      dataKey="active"
                      stroke="#6366F1"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Completion Breakdown */}
          <Card className="shadow">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Completion Breakdown
              </Typography>
              <div style={{ width: "100%", height: 200 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={completionPie}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      label={({ name }) => `${name}`}
                    >
                      {completionPie.map((entry, idx) => (
                        <Cell
                          key={entry.name}
                          fill={idx === 0 ? "#10B981" : "#E5E7EB"}
                        />
                      ))}
                    </Pie>
                    <Legend verticalAlign="bottom" height={36} />
                    <RechartTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lesson Popularity */}
        <Card className="shadow">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Top Lessons (by views & completions)
            </Typography>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={lessonBarData}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} />
                  <YAxis />
                  <RechartTooltip />
                  <Bar dataKey="views" name="Views" fill="#6366F1" />
                  <Bar
                    dataKey="completions"
                    name="Completions"
                    fill="#10B981"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CourseAnalyticsPage;
