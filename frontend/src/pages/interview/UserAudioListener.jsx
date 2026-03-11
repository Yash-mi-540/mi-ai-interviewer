import { useState, useRef, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { blobToBase64 } from "../../lib/utils";
import { PlayCircle } from "lucide-react";
import { motion } from "framer-motion";

function UserAudioListener({ question }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });

        // TODO: Will be used for testing the recorded audio
        // const base64 = await blobToBase64(audioBlob);
        // console.log({ audioBlob, base64 });

        setAudioBlob(audioBlob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Please allow microphone access to record your answer.");
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  }, [isRecording]);

  const evaluateAnswerMutation = useMutation({
    mutationFn: async () => {
      if (!audioBlob) {
        throw new Error("No audio recorded");
      }

      const formData = new FormData();
      formData.append("question", question);
      formData.append("audio", audioBlob, "answer.wav");

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/interview/answer`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      const data = await response.data;
      return data;
    },
  });

  const handleSubmit = () => {
    if (audioBlob) {
      evaluateAnswerMutation.mutate();
    }
  };

  const resetRecording = () => {
    setAudioBlob(null);
    setRecordingTime(0);
    evaluateAnswerMutation.reset();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center justify-center">
        {!isRecording && !audioBlob && (
          <motion.button
            onClick={startRecording}
            className="group relative flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#3538cd] to-[#4c50e6] text-white rounded-full hover:from-[#2d30b8] hover:to-[#4c50e6] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-white/20"
            />
            <PlayCircle size={32} className="relative z-10" />
            <motion.div
              className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
              initial={false}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        )}

        {isRecording && (
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-4 h-4 bg-red-500 rounded-full"
              />
              <span className="text-red-500 font-medium text-lg">
                Recording {formatTime(recordingTime)}
              </span>
            </div>
            <motion.button
              onClick={stopRecording}
              className="px-8 py-3 bg-gradient-to-r from-[#3538cd] to-[#4c50e6] text-white rounded-full hover:from-[#2d30b8] hover:to-[#4c50e6] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-3 h-3 bg-white rounded-sm"></div>
              Stop Recording
            </motion.button>
          </div>
        )}

        {audioBlob && !evaluateAnswerMutation.isLoading && (
          <div className="space-y-4">
            <motion.div
              className="flex items-center justify-center gap-2 text-green-600"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: 2 }}
                className="w-3 h-3 bg-green-500 rounded-full"
              />
              <span className="font-medium">
                Recording completed ({formatTime(recordingTime)})
              </span>
            </motion.div>
            <div className="flex gap-3 justify-center">
              <motion.button
                onClick={handleSubmit}
                className={`px-6 py-2 bg-gradient-to-r from-[#3538cd] to-[#4c50e6] text-white rounded-lg hover:from-[#2d30b8] hover:to-[#4c50e6] transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 ${
                  evaluateAnswerMutation.isLoading ||
                  evaluateAnswerMutation.isSuccess
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={
                  evaluateAnswerMutation.isLoading ||
                  evaluateAnswerMutation.isSuccess
                }
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Submit Answer
              </motion.button>
              <motion.button
                onClick={resetRecording}
                className={`px-6 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 ${
                  evaluateAnswerMutation.isLoading ||
                  evaluateAnswerMutation.isSuccess
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={
                  evaluateAnswerMutation.isLoading ||
                  evaluateAnswerMutation.isSuccess
                }
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Record Again
              </motion.button>
            </div>
          </div>
        )}

        {evaluateAnswerMutation.isLoading && (
          <div className="flex items-center gap-2 text-blue-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span>Submitting your answer...</span>
          </div>
        )}

        {evaluateAnswerMutation.isSuccess && (
          <div className="text-green-600 font-medium">
            Answer submitted successfully!
          </div>
        )}

        {evaluateAnswerMutation.isError && (
          <div className="text-red-600">
            Error: {evaluateAnswerMutation.error.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserAudioListener;
