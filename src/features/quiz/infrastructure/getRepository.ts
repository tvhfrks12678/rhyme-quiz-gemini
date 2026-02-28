import type { QuizRepository } from "../domain/ports/quizRepository";
import { JsonQuizRepository } from "./repositories/jsonQuizRepository";

let repository: QuizRepository | null = null;

export function getQuizRepository(): QuizRepository {
  if (!repository) {
    repository = new JsonQuizRepository();
  }
  return repository;
}
