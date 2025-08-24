"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function PaymentCancelledPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300 dark:bg-gray-800 p-6">
      {loading ? (
        <div className="text-lg font-medium text-gray-600">
          <span className="loading loading-ring loading-xl"></span>
        </div>
      ) : (
        <div className="border border-red-500 shadow-lg flex flex-col gap-6 rounded-2xl p-8 max-w-md w-full text-center shadow-red-500">
          <p className="text-red-300 mt-2">
            Something went wrong.
          </p>

          <div className="w-full flex items-center justify-center gap-4">
            <Button
              onClick={() => router.push("/")}
              variant="outlined"
              className="inline-block bg-red-500 text-white px-6 py-2 rounded-lg shadow hover:bg-red-600 transition"
            >
              Go to Home
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
