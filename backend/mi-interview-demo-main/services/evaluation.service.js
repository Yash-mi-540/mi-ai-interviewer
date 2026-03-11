import { openai } from "../lib/openai.js";

export async function evaluateAnswer(question, answer) {
  const prompt = `
You are a senior frontend interviewer.

Question:
${question}

Candidate Answer:
${answer}

Evaluate and return JSON:
{
  "scores": {
    "correctness": 0,
    "depth": 0,
    "realWorld": 0
  },
  "strengths": [],
  "gaps": [],
  "improvements": []
}
`;

  const res = await openai.chat.completions.create({
    model: "gpt-4.1",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  });

  return JSON.parse(res.choices[0].message.content);
}
