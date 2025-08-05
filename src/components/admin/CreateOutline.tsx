"use client";

import React, { useState } from "react";
import { RiAiGenerate } from "react-icons/ri";
import { FaTimes } from "react-icons/fa";
import { Button, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { createOutline, saveOutline } from "@/features/outline/outline";
import { Outline } from "@/features/outline/outline";

const CreateOutline = () => {
  const [showModal, setShowModal] = useState(false);
  const [previewModal, setPreviewModal] = useState(false);
  const { outlines, loading } = useAppSelector((state) => state.outlines);

  const handleGenerate = () => {
    setShowModal(true);
  };

  return (
    <section className="w-[94%] sm:w-[90%] mx-auto py-4">
      <header className="flex justify-end">
        <Button variant="contained" size="small" onClick={handleGenerate}>
          <div className="flex items-center gap-2 py-1">
            <RiAiGenerate size={20} className="text-amber-500" />
            <span className="hidden sm:block">Generate</span>
          </div>
        </Button>
      </header>

      {showModal && (
        <OutlineModal
          loading={loading}
          setShowModal={setShowModal}
          setPreviewModal={setPreviewModal}
        />
      )}

      {Array.isArray(outlines) &&
        outlines.length > 0 &&
        showModal &&
        previewModal && (
          <OutlinePreview
            outline={outlines[0]}
            setShowModal={setShowModal}
            setPreviewModal={setPreviewModal}
          />
        )}
    </section>
  );
};

interface ModalProps {
  loading: boolean;
  setShowModal: (val: boolean) => void;
  setPreviewModal: (val: boolean) => void;
}

const OutlineModal: React.FC<ModalProps> = ({
  loading,
  setShowModal,
  setPreviewModal,
}) => {
  const [prompt, setPrompt] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    try {
      await dispatch(createOutline({ prompt })).unwrap();
      setPreviewModal(true);
    } catch (err) {
      console.error("Outline generation failed:", err);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      className="fixed inset-0 backdrop-blur-xs z-40 flex items-center justify-center"
    >
      <div className="bg-gray-800 w-full max-w-md rounded-xl shadow-lg p-6 space-y-4">
        <header className="w-full flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-400">
            Create Course Outline
          </h2>
          <IconButton
            onClick={() => setShowModal(false)}
            size="small"
            color="secondary"
          >
            <FaTimes />
          </IconButton>
        </header>

        <main>
          <textarea
            rows={5}
            className="w-full p-3 ring ring-purple-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-700 resize-none"
            placeholder="Enter your course title to generate the course outline..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </main>

        <div className="w-full flex items-center justify-center">
          <Button onClick={handleSubmit} size="small" variant="contained">
            {loading ? (
              <div className="flex items-center gap-1">
                <span className="loading loading-sm loading-spinner text-white"></span>
                <p>Generating</p>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <RiAiGenerate size={20} className="text-amber-500" />
                <p>Generate</p>
              </div>
            )}
          </Button>
        </div>
      </div>
    </motion.section>
  );
};

interface OutlinePreviewProps {
  outline: Outline;
  setShowModal: (val: boolean) => void;
  setPreviewModal: (val: boolean) => void;
}

const OutlinePreview = ({
  outline,
  setShowModal,
  setPreviewModal,
}: OutlinePreviewProps) => {
  const dispatch = useAppDispatch();

  const handleSave = () => {
    dispatch(saveOutline(outline)).unwrap();
    setPreviewModal(false);
    setShowModal(false);
  };
  const handleRegenerate = () => {
    setPreviewModal(false);
    setShowModal(true);
  };
  console.log(outline)
  return (
    <div className="  w-full h-screen flex items-center justify-center fixed top-0 left-0 z-50 backdrop-blur-xs">
      <div className="w-full max-w-4xl h-[80vh] bg-gray-800 overflow-y-scroll p-4">
        <h2 className="text-2xl font-bold text-gray-400 mb-4 border-b pb-2">
          {outline.title}
        </h2>

        <div className="space-y-6">
          {outline.modules.map((module, index) => (
            <div key={index} className="p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-purple-700 mb-2">
                {module.title}
              </h3>
              <ul className="list-disc list-inside text-gray-400 ml-4 space-y-1">
                {module.topics.map((topic, idx) => (
                  <li key={idx}>{topic}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="my-4 flex items-center justify-center gap-4">
          <Button onClick={handleRegenerate} variant="contained">
            <div>Regenerate</div>
          </Button>
          <Button onClick={handleSave} variant="contained">
            <div>Save</div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateOutline;
