import type { QuizFull } from "../../domain/entities/quiz";
import type { QuizRepository } from "../../domain/ports/quizRepository";
import { quizzes } from "../data/quizData";

export class JsonQuizRepository implements QuizRepository {
  async findAll(): Promise<QuizFull[]> {
    return quizzes;
  }

  async findById(id: string): Promise<QuizFull | null> {
    return quizzes.find((q) => q.id === id) ?? null;
  }

  async findNext(currentIndex: number): Promise<QuizFull | null> {
    return quizzes[currentIndex] ?? null;
  }
}
