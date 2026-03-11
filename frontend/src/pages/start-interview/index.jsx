import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { Bot, ArrowRight } from "lucide-react";
import { GUIDELINES } from "../../lib/utils";

export default function StartInterview() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        {/* AI Bot Icon */}
        <div className="relative inline-block mb-8 animate-float">
          <div className="absolute inset-0 rounded-full bg-indigo-200/60 blur-2xl scale-150" />
          <div className="relative w-24 h-24 rounded-2xl bg-[#3538cd] flex items-center justify-center shadow-2xl shadow-indigo-400/30 border border-indigo-300/50">
            <Bot className="w-12 h-12 text-white" />
          </div>
          <div className="absolute inset-[-12px] rounded-full border-2 border-dashed border-indigo-300/50 animate-spin-slow" />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-[#3538cd] text-xs font-semibold tracking-widest uppercase mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3538cd] animate-pulse" />
          AI-Powered Interview
        </div>

        <h1 className="text-5xl md:text-6xl font-black mb-4 leading-tight">
          <span className="text-pink-500">MI-</span>
          <span className="gradient-text">AI Technical</span>
          <br />
          <span className="text-gray-900">Interviewer</span>
        </h1>
        <p className="text-gray-500 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
          Practice with an intelligent AI interviewer that adapts questions to
          your tech stack and experience level.
        </p>
      </motion.div>

      {/* Guidelines */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-3xl mb-12"
      >
        <p className="text-center text-xs font-semibold tracking-widest text-gray-400 uppercase mb-6">
          Interview Guidelines
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GUIDELINES.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.07 }}
              className={`card-glass rounded-xl p-4 transition-all duration-300 ${g.border} border`}
            >
              <div
                className={`w-9 h-9 rounded-lg ${g.bg} flex items-center justify-center mb-3`}
              >
                <g.icon className={`${g.color}`} size={18} />
              </div>
              <h3 className="text-gray-900 font-semibold text-sm mb-1">
                {g.title}
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed">{g.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.7 }}
        className="flex flex-col items-center gap-4"
      >
        <button
          onClick={() => navigate(createPageUrl("SelectTech"))}
          className="btn-primary flex items-center gap-3 px-10 py-4 rounded-2xl text-white font-bold text-lg"
        >
          Begin Interview
          <ArrowRight className="w-5 h-5" />
        </button>
        <p className="text-gray-400 text-sm">
          ~15–20 minutes · 10 adaptive questions
        </p>
      </motion.div>
    </div>
  );
}
