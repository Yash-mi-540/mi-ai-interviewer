import { openai } from "../lib/openai.js";

export async function generateQuestion(category, stack, experience) {
  // Generate Prompt
  const prompt = generateQuestionPrompt({
    category,
    stack,
    experience,
    index: 0,
    prevAnswers: [],
  });

  console.log("prompt -->>", prompt);

  // TODO: Remove it after testing
  // return JSON.parse(JSON.stringify(dummyobj));

  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  });

  return JSON.parse(res.choices[0].message.content);
}

export const TOTAL_QUESTIONS = 10;

export const generateQuestionPrompt = ({
  category,
  stack,
  experience,
  index = 0,
  prevAnswers = [],
}) => `
You are a senior technical interviewer conducting a real interview.

Candidate Profile:
- Tech Category: ${category}
- Technology / Stack: ${stack}
- Experience Level: ${experience} (beginner / intermediate / expert)

Interview Context:
- This is question ${index + 1} of ${TOTAL_QUESTIONS}.
- Previous Q&A: ${
  prevAnswers.length > 0 ? JSON.stringify(prevAnswers.slice(-2)) : "none"
}

Instructions:
- Generate ONE interview question tailored to the selected technology and level.
- Focus on real-world engineering scenarios.
- The question should evaluate problem solving, architecture, debugging, or best practices.
- Avoid simple definition-based questions.
- If previous answers exist, generate a logical follow-up question.
- Keep the question concise (maximum 2 sentences).

Difficulty Guidelines:
- Beginner → fundamentals and core concepts.
- Intermediate → real-world implementation and debugging scenarios.
- Expert → system design, scalability, performance, or architecture decisions.

Return ONLY valid JSON in this format:

{
  "question": "Interview question here",
  "topic": "Specific concept being evaluated",
}
`;
