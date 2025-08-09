"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransaction() {
      try {
        const res = await fetch(`/api/payment/details/${params?.id}`);
        if (!res.ok) throw new Error("Failed to fetch transaction");
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    if (params?.id) fetchTransaction();
  }, [params?.id]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300 dark:bg-gray-800  p-6">
      {loading ? (
        <div className="text-lg font-medium text-gray-600">
          <span className="loading loading-ring loading-xl"></span>
        </div> 
      ) : (
        <div className=" border border-purple-500 shadow-lg flex flex-col gap-6 shadow-green-500 rounded-2xl p-8 max-w-md w-full text-center">
          <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4 animate-bounce" />
          <h1 className="text-2xl font-bold text-purple-500">
            Payment Successful!
          </h1>
          <p className="text-purple-300 mt-2">
            Your transaction has been completed successfully.
          </p>

          <Button
            onClick={() => router.push("/")}
            variant="outlined"
            className=" inline-block bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600 transition"
          >
            Go to Home
          </Button>
        </div>
      )}
    </div>
  );
}
