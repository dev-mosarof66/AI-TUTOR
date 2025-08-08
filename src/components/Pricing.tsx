"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle, FaCrown } from "react-icons/fa";
import { Button } from "@mui/material";

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
  return (
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
                plan.popular ? "" : "border border-gray-700 dark:border-none"
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
              <Button variant="outlined" className="w-full">
                {plan.button}
              </Button>
            </motion.div>
          );

          // Wrap the card in a gradient border if popular
          return plan.popular ? (
            <div key={index} className="p-[2px] rounded-2xl animated-gradient">
              {cardContent}
            </div>
          ) : (
            <div key={index}>{cardContent}</div>
          );
        })}
      </div>
    </div>
  );
};

export default PricingCards;
