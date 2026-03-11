import { openai } from "../lib/openai.js";
import fs from "fs";

export async function speechToText(filePath) {
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream(filePath),
    model: "whisper-1",
  });

  return transcription.text;
}
