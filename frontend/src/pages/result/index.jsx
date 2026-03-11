import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
// import { base44 } from "@/api/base44Client";
// import { motion } from "framer-motion";
import {
  Trophy,
  AlertCircle,
  CheckCircle2,
  RotateCcw,
  Star,
  Zap,
  ChevronDown,
  ChevronUp,
  BookOpen,
  ArrowUpRight,
  Loader2,
} from "lucide-react";

function ScoreRing({ score, size = 140 }) {
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.max(0, Math.min(100, (score / 10) * 100));
  const offset = circumference - (pct / 100) * circumference;
  const color = score >= 7 ? "#16a34a" : score >= 4 ? "#3538cd" : "#ea580c";

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={10}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
          style={{ filter: `drop-shadow(0 0 6px ${color}50)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="text-4xl font-black text-gray-900"
        >
          {score}
        </motion.span>
        <span className="text-xs text-gray-400 font-medium">/ 10</span>
      </div>
    </div>
  );
}

function QuestionItem({ qa, index }) {
  const [open, setOpen] = useState(false);
  const score = qa.score ?? 5;
  const color =
    score >= 7
      ? "text-emerald-600"
      : score >= 4
        ? "text-[#3538cd]"
        : "text-orange-600";
  const bg =
    score >= 7
      ? "bg-emerald-50 border-emerald-200"
      : score >= 4
        ? "bg-indigo-50 border-indigo-200"
        : "bg-orange-50 border-orange-200";

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 * index }}
      className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-4 p-4 text-left hover:bg-gray-50 transition-colors"
      >
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 border ${bg} ${color}`}
        >
          {index + 1}
        </div>
        <p className="flex-1 text-sm text-gray-700 font-medium line-clamp-1">
          {qa.question}
        </p>
        <div className="flex items-center gap-3">
          <span className={`text-sm font-bold ${color}`}>{score}/10</span>
          {open ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </div>
      </button>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="border-t border-gray-100 p-4 space-y-3"
        >
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1.5 font-semibold">
              Your Answer
            </p>
            <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-lg p-3 border border-gray-200">
              {qa.answer}
            </p>
          </div>
          {qa.feedback && (
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1.5 font-semibold">
                AI Feedback
              </p>
              <p className="text-sm text-gray-700 leading-relaxed bg-indigo-50 border border-indigo-200 rounded-lg p-3">
                {qa.feedback}
              </p>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

export default function Results() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const id = sessionStorage.getItem("interview_session_id");
      if (!id) {
        setLoading(false);
        return;
      }

      // const s = await base44.entities.InterviewSession.get(id);
      const s = {
        tech_stack: "React",
        experience_level: "intermediate",
        overall_score: 7,
        questions: [
          {
            question: "What is React?",
            score: 8,
            feedback: "Good explanation of React concepts.",
          },
          {
            question: "What is JSX?",
            score: 6,
            feedback: "Basic understanding, could improve.",
          },
        ],
      };
      setSession(s);

      const prompt = `Analyze this interview session for ${s.tech_stack} (${s.experience_level}) with overall score ${s.overall_score}/10.
Questions and scores: ${JSON.stringify(s.questions?.map((q) => ({ q: q.question, score: q.score })))}.
Return JSON with:
- strengths: array of 3 short strength strings
- gaps: array of 3-4 short gap/improvement strings
- top_topics: array of 3 topic names to study next
- summary: 2-sentence overall assessment`;

      // const result = await base44.integrations.Core.InvokeLLM({
      //   prompt,
      //   response_json_schema: {
      //     type: "object",
      //     properties: {
      //       strengths: { type: "array", items: { type: "string" } },
      //       gaps: { type: "array", items: { type: "string" } },
      //       top_topics: { type: "array", items: { type: "string" } },
      //       summary: { type: "string" },
      //     },
      //   },
      // });
      // setInsights(result);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-[#3538cd] flex items-center justify-center shadow-xl shadow-indigo-300/40 animate-pulse">
          <Star className="w-8 h-8 text-white" />
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 className="w-4 h-4 animate-spin text-[#3538cd]" />
          Generating your personalized results...
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500">No interview session found.</p>
        <button
          onClick={() => navigate(createPageUrl("/"))}
          className="btn-primary px-6 py-3 rounded-xl text-white font-semibold"
        >
          Start a New Interview
        </button>
      </div>
    );
  }

  const score = session.overall_score ?? 0;
  const grade =
    score >= 8
      ? "Excellent"
      : score >= 6
        ? "Good"
        : score >= 4
          ? "Fair"
          : "Needs Work";
  const gradeColor =
    score >= 8
      ? "text-emerald-600"
      : score >= 6
        ? "text-[#3538cd]"
        : score >= 4
          ? "text-amber-600"
          : "text-orange-600";

  const avgByQuestion = session.questions?.map((q) => q.score ?? 0) || [];
  const highScores = avgByQuestion.filter((s) => s >= 7).length;
  const lowScores = avgByQuestion.filter((s) => s < 5).length;

  return (
    <div className="min-h-screen p-6 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-[#3538cd] text-xs font-semibold tracking-widest uppercase mb-6">
            <Trophy className="w-3 h-3" />
            Interview Complete
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">
            Your Results
          </h1>
          <p className="text-gray-500 text-sm">
            {session.tech_stack} · {session.experience_level} level ·{" "}
            {session.questions?.length || 10} questions
          </p>
        </motion.div>

        {/* Score card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 mb-6 text-center"
        >
          <div className="flex flex-col items-center gap-4">
            <ScoreRing score={score} />
            <div>
              <p className={`text-3xl font-black ${gradeColor}`}>{grade}</p>
              <p className="text-gray-500 text-sm mt-1 max-w-sm">
                {insights?.summary ||
                  "Great effort on completing the interview!"}
              </p>
            </div>
            <div className="flex gap-6 mt-2">
              <div className="text-center">
                <p className="text-2xl font-black text-emerald-600">
                  {highScores}
                </p>
                <p className="text-xs text-gray-400">Strong answers</p>
              </div>
              <div className="w-px bg-gray-200" />
              <div className="text-center">
                <p className="text-2xl font-black text-orange-500">
                  {lowScores}
                </p>
                <p className="text-xs text-gray-400">Need improvement</p>
              </div>
              <div className="w-px bg-gray-200" />
              <div className="text-center">
                <p className="text-2xl font-black text-[#3538cd]">
                  {session.questions?.length || 10}
                </p>
                <p className="text-xs text-gray-400">Total questions</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Strengths & Gaps */}
        {insights && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl border border-emerald-200 p-5 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <h3 className="text-gray-900 font-bold text-sm">
                  Your Strengths
                </h3>
              </div>
              <ul className="space-y-2">
                {(insights.strengths || []).map((s, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl border border-orange-200 p-5 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-orange-600" />
                </div>
                <h3 className="text-gray-900 font-bold text-sm">
                  Areas to Improve
                </h3>
              </div>
              <ul className="space-y-2">
                {(insights.gaps || []).map((g, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                    {g}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        )}

        {/* Study Topics */}
        {insights?.top_topics && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl border border-blue-200 p-5 mb-6 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="text-gray-900 font-bold text-sm">
                Recommended Study Topics
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {insights.top_topics.map((topic, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-[#3538cd] text-sm font-medium"
                >
                  <ArrowUpRight className="w-3 h-3" />
                  {topic}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Q by Q breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
            Question Breakdown
          </p>
          <div className="flex flex-col gap-2">
            {(session.questions || []).map((qa, i) => (
              <QuestionItem key={i} qa={qa} index={i} />
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <button
            onClick={() => {
              sessionStorage.clear();
              navigate(createPageUrl("StartInterview"));
            }}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 font-semibold text-sm hover:border-gray-300 hover:bg-gray-50 transition-all shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </button>
          <button
            onClick={() => {
              sessionStorage.setItem("interview_stack", session.tech_stack);
              sessionStorage.setItem(
                "interview_category",
                session.role_category,
              );
              navigate(createPageUrl("SelectExperience"));
            }}
            className="btn-primary flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm"
          >
            <Zap className="w-4 h-4" />
            New Interview
          </button>
        </motion.div>
      </div>
    </div>
  );
}
