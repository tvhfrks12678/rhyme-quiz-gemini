import type { QuizFull } from "../entities/quiz";

export interface QuizRepository {
  findAll(): Promise<QuizFull[]>;
  findById(id: string): Promise<QuizFull | null>;
  findNext(currentIndex: number): Promise<QuizFull | null>;
}
