import { openai } from "../lib/openai.js";

export async function textToSpeech(text) {
  const response = await openai.audio.speech.create({
    model: "gpt-4o-mini-tts",
    voice: "alloy",
    input: text,
  });

  return Buffer.from(await response.arrayBuffer());
}
