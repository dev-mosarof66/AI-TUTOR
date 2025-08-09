/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle, FaCrown } from "react-icons/fa";
import { Button } from "@mui/material";
import axios from "axios";

const plans = [
  {
    name: "Free",
    price: "0",
    features: [
      { text: "Access to 5 modules", included: true },
      { text: "Community support", included: true },
      { text: "AI-generated content", included: false },
      { text: "Certificate of completion", included: false },
    ],
    button: "Choose Plan",
  },
  {
    name: "Basic",
    price: "9",
    popular: true,
    features: [
      { text: "Access to 50 modules", included: true },
      { text: "Email support", included: true },
      { text: "AI-generated content", included: true },
      { text: "Certificate of completion", included: false },
    ],
    button: "Choose Basic",
  },
  {
    name: "Premium",
    price: "19",
    features: [
      { text: "Unlimited modules", included: true },
      { text: "Priority support", included: true },
      { text: "AI-generated content", included: true },
      { text: "Certificate of completion", included: true },
    ],
    button: "Contact Sales",
  },
];

const PricingCards = () => {
  const [loadingPlan, setLoadingPlan] = useState<boolean | null>(null);

  const handlePricing = async (plan: any) => {
    try {
      setLoadingPlan(true);
      const res = await axios.post("/api/payment/init", {
        total_amount: plan.price,
        product_name: plan.name,
        cus_name: "John Doe",
        cus_email: "john@example.com",
        cus_add1: "123 Main St",
        cus_city: "Dhaka",
        cus_country: "Bangladesh",
        cus_phone: "01711111111",
      });

      if (res.data.gatewayUrl) {
        window.location.href = res.data.gatewayUrl;
      } else {
        console.error("Payment initiation failed", res.data);
      }
    } catch (error) {
      console.error("Error initiating payment", error);
    } finally {
      setLoadingPlan(false);
    }
  };

  return (
    <div className="w-full h-full flex md:items-center md:justify-center relative">
      <div className="w-full py-10 px-4 ">
        <div className="grid md:grid-cols-3 gap-14 md:gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const cardContent = (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
                className={`w-full bg-gray-100 ${
                  plan.popular
                    ? "scale-100"
                    : "border border-gray-700 dark:border-none"
                } flex flex-col justify-between dark:bg-gray-800 rounded-2xl shadow-2xl dark:shadow-white/20 text-gray-700 dark:text-gray-400  p-6 relative`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-800 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1 shadow-md">
                    <FaCrown className="text-yellow-300" /> Most Popular
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-semibold text-center mb-4">
                    {plan.name}
                  </h3>
                  <p className="text-center text-3xl font-bold mb-6">
                    ${plan.price}
                    <span className="text-base font-medium text-gray-400">
                      /mo
                    </span>
                  </p>
                  <ul className="mb-6 space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        {feature.included ? (
                          <FaCheckCircle className="text-green-500" />
                        ) : (
                          <FaTimesCircle className="text-red-500" />
                        )}
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button
                  onClick={() => handlePricing(plan)}
                  variant="outlined"
                  className="w-full"
                  disabled={!!loadingPlan}
                >
                  {loadingPlan ? "Processing..." : plan.button}
                </Button>
              </motion.div>
            );

            return plan.popular ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                key={index}
                className="p-[1px] rounded-2xl animated-gradient"
              >
                {cardContent}
              </motion.div>
            ) : (
              <div key={index}>{cardContent}</div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PricingCards;
