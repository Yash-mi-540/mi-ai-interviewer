import express from "express";
import multer from "multer";
import path from "path";

import { generateQuestion } from "../services/question.service.js";
import { textToSpeech } from "../services/tts.service.js";
import { speechToText } from "../services/stt.service.js";
import { evaluateAnswer } from "../services/evaluation.service.js";
// import { dummyobj, dummyReplyObj } from "../utils/constants.js";

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

  // TODO: Remove it after testing
  // return res.json(dummyobj);

  const questionData = await generateQuestion(category, stack, experience);

  const audioBuffer = await textToSpeech(questionData.question);

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

  // TODO: Remove it after testing
  // return res.json(dummyReplyObj);

  const answerText = await speechToText(req.file.path);

  const evaluation = await evaluateAnswer(question, answerText);

  const feedbackText = `
Strengths: ${evaluation.strengths?.join(", ") || "None"}
Gaps: ${evaluation.gaps?.join(", ") || "None"}
Improvements: ${evaluation.improvements?.join(", ") || "None"}
`;

  const feedbackAudio = await textToSpeech(feedbackText);

  res.json({
    answerText,
    evaluation,
    feedbackAudioBase64: feedbackAudio.toString("base64"),
  });
});

export default router;
