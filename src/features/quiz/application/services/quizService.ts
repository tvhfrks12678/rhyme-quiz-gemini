import type { QuizFull, QuizResult } from "../../domain/entities/quiz";
import type { QuizRepository } from "../../domain/ports/quizRepository";
import type { QuizResponse, SubmitAnswerResponse } from "../../contracts/quiz";

export class QuizService {
  constructor(private readonly quizRepository: QuizRepository) {}

  async getNextQuiz(currentIndex: number): Promise<QuizResponse | null> {
    const quiz = await this.quizRepository.findNext(currentIndex);
    if (!quiz) return null;

    return {
      id: quiz.id,
      questionWord: quiz.questionWord,
      imageKey: quiz.imageKey,
      choices: quiz.choices.map((c) => ({
        id: c.id,
        text: c.text,
      })),
    };
  }

  async submitAnswer(
    id: string,
    selectedChoiceIds: string[]
  ): Promise<SubmitAnswerResponse | null> {
    const quiz = await this.quizRepository.findById(id);
    if (!quiz) return null;

    const correctChoiceIds = quiz.choices
      .filter((c) => c.isCorrect)
      .map((c) => c.id);

    // Check if selected IDs match correct IDs (order doesn't matter)
    const isCorrect =
      selectedChoiceIds.length === correctChoiceIds.length &&
      selectedChoiceIds.every((sid) => correctChoiceIds.includes(sid));

    return {
      isCorrect,
      questionVowels: quiz.questionVowels,
      correctChoiceIds,
      explanation: quiz.explanation,
      choiceDetails: quiz.choices.map((c) => ({
        id: c.id,
        text: c.text,
        vowels: c.vowels,
        isCorrect: c.isCorrect,
      })),
    };
  }
}
