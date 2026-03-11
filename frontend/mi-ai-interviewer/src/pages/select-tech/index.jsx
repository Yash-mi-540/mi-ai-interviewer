import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowLeft } from "lucide-react";
import ProgressSteps from "../../components/interview/ProgressSteps";
import { TECH_CATEGORIES } from "../../lib/utils";

export default function SelectTech() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedStack, setSelectedStack] = useState(null);

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat.id);
    setSelectedStack(null);
  };

  const handleNext = () => {
    if (!selectedStack) return;
    const cat = TECH_CATEGORIES.find((c) => c.id === selectedCategory);
    sessionStorage.setItem("interview_category", cat.label);
    sessionStorage.setItem("interview_stack", selectedStack.name);
    navigate(createPageUrl("SelectExperience"));
  };

  const activeCat = TECH_CATEGORIES.find((c) => c.id === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col items-center p-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl"
      >
        {/* Header */}
        <div className="flex items-center mb-8 gap-4">
          <button
            onClick={() => navigate(createPageUrl("/"))}
            className="p-2 rounded-lg bg-gray-100 border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Choose Your Tech Stack
            </h2>
            <p className="text-gray-500 text-sm mt-0.5">
              Select a category and then a specific technology
            </p>
          </div>
        </div>

        <ProgressSteps currentStep={1} />

        {/* Category grid */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {TECH_CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => handleCategoryClick(cat)}
              className={`relative p-5 rounded-2xl border text-left transition-all duration-300 group overflow-hidden
                ${
                  selectedCategory === cat.id
                    ? `${cat.selectedBg} ${cat.accent} shadow-lg ${cat.glow}`
                    : "card-glass hover:border-gray-300"
                }
              `}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}
              />
              <div className="relative">
                <span className="text-2xl mb-3 block">{cat.emoji}</span>
                <h3 className="text-gray-900 font-bold text-base mb-1">
                  {cat.label}
                </h3>
                <span
                  className={`inline-block text-xs px-2 py-0.5 rounded-full border ${cat.badge}`}
                >
                  {cat.stacks.length} technologies
                </span>
              </div>
              {selectedCategory === cat.id && (
                <div
                  className={`absolute top-3 right-3 w-2 h-2 rounded-full ${cat.dot} shadow-lg`}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Stack picker */}
        <AnimatePresence mode="wait">
          {activeCat && (
            <motion.div
              key={activeCat.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-4">
                Select a technology
              </p>
              <div className="flex flex-col gap-2">
                {activeCat.stacks.map((stack, i) => (
                  <motion.button
                    key={stack.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => setSelectedStack(stack)}
                    className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-200
                      ${
                        selectedStack?.id === stack.id
                          ? `${activeCat.selectedBg} ${activeCat.accent} shadow-sm`
                          : "card-glass hover:border-gray-300"
                      }
                    `}
                  >
                    <span className="text-2xl">{stack.icon}</span>
                    <div className="flex-1">
                      <p className="text-gray-900 font-semibold text-sm">
                        {stack.name}
                      </p>
                      <p className="text-gray-500 text-xs mt-0.5">
                        {stack.desc}
                      </p>
                    </div>
                    {selectedStack?.id === stack.id && (
                      <div className="w-5 h-5 rounded-full bg-[#3538cd] flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: selectedStack ? 1 : 0.4 }}
          className="flex justify-end"
        >
          <button
            onClick={handleNext}
            disabled={!selectedStack}
            className="btn-primary flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next: Experience Level
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
