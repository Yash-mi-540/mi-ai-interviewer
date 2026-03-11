import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { ArrowLeft, Sprout, TrendingUp, Star, Zap } from "lucide-react";
import ProgressSteps from "../../components/interview/ProgressSteps";

const LEVELS = [
  {
    id: "beginner",
    label: "Beginner",
    range: "1 – 2 Years",
    icon: Sprout,
    emoji: "🌱",
    desc: "Core fundamentals, basic concepts, getting started with the tech stack.",
    traits: [
      "Core concepts",
      "Basic patterns",
      "Learning-focused",
      "Foundational Q&A",
    ],
    selectedBg: "bg-emerald-50",
    color: "from-emerald-50 to-green-50",
    barColor: "bg-emerald-400",
    border: "border-emerald-300",
    glow: "shadow-emerald-200",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
    badge: "bg-emerald-100 text-emerald-700",
    checkBorder: "border-emerald-400",
    checkBg: "bg-emerald-100",
    checkColor: "text-emerald-600",
    ring: "ring-emerald-300",
    difficulty: 30,
  },
  {
    id: "intermediate",
    label: "Intermediate",
    range: "2 – 5 Years",
    icon: TrendingUp,
    emoji: "🚀",
    desc: "Applied knowledge, real-world patterns, architecture and optimization.",
    traits: ["Design patterns", "Performance", "Debugging", "System design"],
    selectedBg: "bg-indigo-50",
    color: "from-indigo-50 to-blue-50",
    barColor: "bg-[#3538cd]",
    border: "border-indigo-300",
    glow: "shadow-indigo-200",
    iconColor: "text-[#3538cd]",
    iconBg: "bg-indigo-50",
    badge: "bg-indigo-100 text-indigo-700",
    checkBorder: "border-indigo-400",
    checkBg: "bg-indigo-100",
    checkColor: "text-[#3538cd]",
    ring: "ring-indigo-300",
    difficulty: 60,
  },
  {
    id: "expert",
    label: "Expert",
    range: "5+ Years",
    icon: Star,
    emoji: "⚡",
    desc: "Advanced architecture, leadership, deep internals and system design at scale.",
    traits: ["System design", "Scalability", "Leadership", "Deep internals"],
    selectedBg: "bg-amber-50",
    color: "from-amber-50 to-orange-50",
    barColor: "bg-amber-500",
    border: "border-amber-300",
    glow: "shadow-amber-200",
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
    badge: "bg-amber-100 text-amber-700",
    checkBorder: "border-amber-400",
    checkBg: "bg-amber-100",
    checkColor: "text-amber-600",
    ring: "ring-amber-300",
    difficulty: 90,
  },
];

export default function SelectExperience() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const stack = sessionStorage.getItem("interview_stack") || "React";
  const category = sessionStorage.getItem("interview_category") || "Front-End";

  const handleNext = () => {
    if (!selected) return;
    sessionStorage.setItem("interview_experience", selected.id);
    navigate(createPageUrl("Interview"));
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        {/* Header */}
        <div className="flex items-center mb-8 gap-4">
          <button
            onClick={() => navigate(createPageUrl("SelectTech"))}
            className="p-2 rounded-lg bg-gray-100 border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Experience Level
            </h2>
            <p className="text-gray-500 text-sm mt-0.5">
              Interviewing for{" "}
              <span className="text-[#3538cd] font-medium">{stack}</span> ·{" "}
              {category}
            </p>
          </div>
        </div>

        <ProgressSteps currentStep={2} />

        {/* Cards */}
        <div className="flex flex-col gap-4 mb-10">
          {LEVELS.map((level, i) => {
            const isSelected = selected?.id === level.id;
            return (
              <motion.button
                key={level.id}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelected(level)}
                className={`relative text-left p-6 rounded-2xl border transition-all duration-300 overflow-hidden group
                  ${
                    isSelected
                      ? `${level.selectedBg} ${level.border} shadow-lg ${level.glow} ring-1 ${level.ring}`
                      : "card-glass hover:border-gray-300"
                  }
                `}
              >
                {!isSelected && (
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${level.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                )}

                <div className="relative flex items-start gap-5">
                  <div
                    className={`w-14 h-14 rounded-2xl ${level.iconBg} border border-gray-200 flex items-center justify-center flex-shrink-0 text-2xl`}
                  >
                    {level.emoji}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-gray-900 font-bold text-xl">
                        {level.label}
                      </h3>
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${level.badge}`}
                      >
                        {level.range}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                      {level.desc}
                    </p>

                    {/* Difficulty bar */}
                    <div className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-gray-400">
                          Difficulty
                        </span>
                        <span className={`text-xs ${level.iconColor}`}>
                          {level.difficulty}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${level.difficulty}%` }}
                          transition={{
                            delay: 0.4 + i * 0.1,
                            duration: 0.7,
                            ease: "easeOut",
                          }}
                          className={`h-full rounded-full ${level.barColor}`}
                        />
                      </div>
                    </div>

                    {/* Traits */}
                    <div className="flex flex-wrap gap-2">
                      {level.traits.map((t) => (
                        <span
                          key={t}
                          className={`text-xs px-2 py-0.5 rounded-md border border-gray-200 ${level.badge}`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Check */}
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 transition-all duration-300
                    ${isSelected ? `${level.checkBorder} ${level.checkBg}` : "border-gray-300"}
                  `}
                  >
                    {isSelected && (
                      <svg
                        className={`w-3 h-3 ${level.checkColor}`}
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
                    )}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Start button */}
        <motion.div
          animate={{ opacity: selected ? 1 : 0.35 }}
          className="flex justify-end"
        >
          <button
            onClick={handleNext}
            disabled={!selected}
            className="btn-primary flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-semibold disabled:cursor-not-allowed"
          >
            <Zap className="w-4 h-4" />
            Start Interview
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
