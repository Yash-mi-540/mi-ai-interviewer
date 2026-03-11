import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, ArrowRight, Loader2, ChevronRight } from "lucide-react";
import HandwritingText from "../../components/interview/HandwritingText";
import ProgressSteps from "../../components/interview/ProgressSteps";
import { useMutation } from "@tanstack/react-query";
import UserAudioListener from "./UserAudioListener";

const TOTAL_QUESTIONS = 10;

export default function Interview() {
  const navigate = useNavigate();

  const stack = sessionStorage.getItem("interview_stack") || "React";
  const category = sessionStorage.getItem("interview_category") || "Front-End";
  const experience =
    sessionStorage.getItem("interview_experience") || "intermediate";

  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [phase, setPhase] = useState("loading");
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [audioBase64, setAudioBase64] = useState(null);
  const audioRef = useRef(null);
  const audioUnlockedRef = useRef(false);
  const hasPlayedRef = useRef(false);

  const generateQuestionMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/interview/start`,
        {
          category,
          stack,
          experience,
        },
      );
      const data = await response.data;

      console.log("data >>>", data);

      return data;
    },
  });

  const generateQuestion = async () => {
    setPhase("loading");
    setIsTypingDone(false);
    setAnswer("");
    setAudioBase64(null);

    hasPlayedRef.current = false;

    const data = await generateQuestionMutation.mutateAsync();

    setCurrentQuestion(data.question.trim());
    setAudioBase64(data.audioBase64);
    setPhase("question");
  };

  useEffect(() => {
    const unlockAudio = () => {
      audioUnlockedRef.current = true;

      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };

    window.addEventListener("click", unlockAudio);
    window.addEventListener("keydown", unlockAudio);

    return () => {
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      generateQuestion();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const playAudio = useCallback(() => {
    if (!audioBase64 || !audioRef.current) return;
    if (hasPlayedRef.current) return;

    const audioUrl = `data:audio/mpeg;base64,${audioBase64}`;

    audioRef.current.src = audioUrl;

    audioRef.current
      .play()
      .then(() => {
        hasPlayedRef.current = true;
      })
      .catch((err) => {
        console.error("Audio playback failed:", err);
      });
  }, [audioBase64]);

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) return;
    setPhase("evaluating");

    const updated = [...answers, { question: currentQuestion, answer }];
    setAnswers(updated);

    if (questionIndex + 1 >= TOTAL_QUESTIONS) {
      const scorePrompt = `Rate this technical interview session for ${stack} (${experience} level).
Session: ${JSON.stringify(updated)}.
Return JSON: { "questions": [{"question":"...","answer":"...","score":0-10,"feedback":"..."}], "overall_score": 0-10 }`;

      // const result = await base44.integrations.Core.InvokeLLM({
      //   prompt: scorePrompt,
      //   response_json_schema: {
      //     type: "object",
      //     properties: {
      //       questions: {
      //         type: "array",
      //         items: {
      //           type: "object",
      //           properties: {
      //             question: { type: "string" },
      //             answer: { type: "string" },
      //             score: { type: "number" },
      //             feedback: { type: "string" },
      //           },
      //         },
      //       },
      //       overall_score: { type: "number" },
      //     },
      //   },
      // });

      // const session = await base44.entities.InterviewSession.create({
      //   role_category: category,
      //   tech_stack: stack,
      //   experience_level: experience,
      //   questions: result.questions,
      //   overall_score: result.overall_score,
      //   status: "completed",
      // });

      // sessionStorage.setItem("interview_session_id", session.id);
      navigate(createPageUrl("Results"));
    } else {
      const nextIdx = questionIndex + 1;
      setQuestionIndex(nextIdx);
      generateQuestion();
    }
  };

  const expLabel = {
    beginner: "Beginner",
    intermediate: "Intermediate",
    expert: "Expert",
  }[experience];

  return (
    <div className="min-h-screen flex flex-col items-center p-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Live Interview</h2>
            <p className="text-gray-500 text-sm mt-0.5">
              <span className="text-[#3538cd] font-medium">{stack}</span> ·{" "}
              {expLabel}
            </p>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-400 mb-1">Question</div>
            <div className="text-2xl font-black text-[#3538cd]">
              {questionIndex + 1}
              <span className="text-gray-300 text-base">
                /{TOTAL_QUESTIONS}
              </span>
            </div>
          </div>
        </div>

        <ProgressSteps currentStep={3} />

        {/* Progress bar */}
        <div className="mb-10">
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-[#3538cd]"
              initial={{ width: 0 }}
              animate={{ width: `${(questionIndex / TOTAL_QUESTIONS) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between mt-2">
            {Array.from({ length: TOTAL_QUESTIONS }).map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300
                  ${
                    i < questionIndex
                      ? "bg-[#3538cd]"
                      : i === questionIndex
                        ? "bg-[#3538cd] scale-125"
                        : "bg-gray-300"
                  }
                `}
              />
            ))}
          </div>
        </div>

        {/* AI Bot card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-start gap-4">
            {/* Bot avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-xl bg-[#3538cd] flex items-center justify-center shadow-md shadow-indigo-300/40 border border-indigo-200">
                <Bot className="w-6 h-6 text-white" />
              </div>
              {phase === "loading" && (
                <div className="absolute inset-0 rounded-xl border-2 border-[#3538cd]/40 animate-ping" />
              )}
            </div>

            <div className="flex-1 min-h-[100px] flex flex-col justify-center">
              <p className="text-xs text-gray-400 mb-3 font-semibold uppercase tracking-wide">
                AI Interviewer
              </p>

              {phase === "loading" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-gray-400"
                >
                  <Loader2 className="w-4 h-4 animate-spin text-[#3538cd]" />
                  <span className="text-sm">
                    Thinking of your next question...
                  </span>
                </motion.div>
              )}

              {phase === "evaluating" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-gray-400"
                >
                  <Loader2 className="w-4 h-4 animate-spin text-[#3538cd]" />
                  <span className="text-sm">
                    {questionIndex + 1 >= TOTAL_QUESTIONS
                      ? "Analyzing all responses..."
                      : "Processing your answer..."}
                  </span>
                </motion.div>
              )}

              {(phase === "question" || phase === "answering") &&
                currentQuestion && (
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={currentQuestion}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="font-handwriting text-[1.5rem] leading-relaxed text-gray-800"
                    >
                      <HandwritingText
                        text={currentQuestion}
                        speed={18}
                        onComplete={() => {
                          setIsTypingDone(true);
                          playAudio();
                          setPhase("answering");
                        }}
                      />
                    </motion.p>
                  </AnimatePresence>
                )}
            </div>
            <audio ref={audioRef} preload="auto" />
          </div>
        </div>

        {/* Answer area */}
        <AnimatePresence>
          {(phase === "answering" || phase === "evaluating") &&
            isTypingDone && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="relative mb-4">
                  {/* <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    disabled={phase === "evaluating"}
                    placeholder="Type your answer here... Be as detailed as you'd like."
                    rows={5}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-5 text-gray-800 text-sm placeholder-gray-400 resize-none focus:outline-none focus:border-[#3538cd]/50 focus:ring-2 focus:ring-[#3538cd]/10 transition-all"
                  />
                  <div className="absolute bottom-4 right-4 text-xs text-gray-400">
                    {answer.length} chars
                  </div> */}

                  <UserAudioListener question={currentQuestion} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-400 text-xs">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Answer freely — AI adapts to your response
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSubmitAnswer}
                    disabled={!answer.trim() || phase === "evaluating"}
                    className="btn-primary flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {phase === "evaluating" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing...
                      </>
                    ) : questionIndex + 1 >= TOTAL_QUESTIONS ? (
                      <>
                        Finish Interview
                        <ChevronRight className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Next Question
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}
        </AnimatePresence>

        {/* Q counter chips */}
        <div className="mt-8 flex flex-wrap gap-1.5 justify-center">
          {Array.from({ length: TOTAL_QUESTIONS }).map((_, i) => (
            <div
              key={i}
              className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center transition-all duration-300
                ${
                  i < questionIndex
                    ? "bg-indigo-100 text-[#3538cd] border border-indigo-200"
                    : i === questionIndex
                      ? "bg-[#3538cd] text-white shadow-md shadow-indigo-300/40 scale-110"
                      : "bg-gray-100 text-gray-400 border border-gray-200"
                }
              `}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
