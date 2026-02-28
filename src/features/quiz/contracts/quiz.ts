import { z } from "zod";

// Choices for the client (no vowels/isCorrect)
export const ChoiceResponseSchema = z.object({
  id: z.string(),
  text: z.string(),
});

export type ChoiceResponse = z.infer<typeof ChoiceResponseSchema>;

// Quiz for the client (no vowels/isCorrect)
export const QuizResponseSchema = z.object({
  id: z.string(),
  questionWord: z.string(),
  imageKey: z.string(),
  choices: z.array(ChoiceResponseSchema),
});

export type QuizResponse = z.infer<typeof QuizResponseSchema>;

// Request to submit an answer
export const SubmitAnswerRequestSchema = z.object({
  selectedChoiceIds: z.array(z.string()),
});

export type SubmitAnswerRequest = z.infer<typeof SubmitAnswerRequestSchema>;

// Detailed choice info for the result
export const ChoiceDetailSchema = z.object({
  id: z.string(),
  text: z.string(),
  vowels: z.string(),
  isCorrect: z.boolean(),
});

export type ChoiceDetail = z.infer<typeof ChoiceDetailSchema>;

// Result of a submission
export const SubmitAnswerResponseSchema = z.object({
  isCorrect: z.boolean(),
  questionVowels: z.string(),
  correctChoiceIds: z.array(z.string()),
  explanation: z.string(),
  choiceDetails: z.array(ChoiceDetailSchema),
});

export type SubmitAnswerResponse = z.infer<typeof SubmitAnswerResponseSchema>;
