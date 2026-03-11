import express from "express";
import multer from "multer";
import path from "path";

import { generateQuestion } from "../services/question.service.js";
import { textToSpeech } from "../services/tts.service.js";
import { speechToText } from "../services/stt.service.js";
import { evaluateAnswer } from "../services/evaluation.service.js";

const router = express.Router();
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });

// STEP 1: Start interview
router.post("/start", async (req, res) => {
  const { category, stack, experience } = req.body;

  console.log("category, stack, experience -->>", category, stack, experience);

  const questionData = await generateQuestion(category, stack, experience);

  console.log("questionData -->>", questionData);

  const audioBuffer = await textToSpeech(questionData.question);

  console.log("audioBuffer -->>", audioBuffer);

  const audioBase64 = audioBuffer.toString("base64");

  res.json({
    question: questionData.question,
    topic: questionData.topic,
    audioBase64: audioBase64,
  });
});

// STEP 2: Submit spoken answer
router.post("/answer", upload.single("audio"), async (req, res) => {
  const { question } = req.body;

  console.log("req.file -->>", req.file);
  console.log("question -->>", question);

  const answerText = await speechToText(req.file.path);

  console.log("answerText -->>", answerText);

  const evaluation = await evaluateAnswer(question, answerText);

  console.log("evaluation -->>", evaluation);

  const feedbackText = `
Strengths: ${evaluation.strengths?.join(", ") || "None"}
Gaps: ${evaluation.gaps?.join(", ") || "None"}
Improvements: ${evaluation.improvements?.join(", ") || "None"}
`;

  console.log("feedbackText -->>", feedbackText);

  const feedbackAudio = await textToSpeech(feedbackText);

  console.log("feedbackAudio -->>", feedbackAudio);

  res.json({
    answerText,
    evaluation,
    feedbackAudioBase64: feedbackAudio.toString("base64"),
  });
});

export default router;
