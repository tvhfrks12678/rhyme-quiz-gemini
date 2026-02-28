import { create } from "zustand";
import { useQuery, useMutation } from "@tanstack/react-query";
import type { QuizResponse, SubmitAnswerResponse } from "../../contracts/quiz";
import { getNextQuizFn, submitAnswerFn } from "../../application/services/quizFns";

interface QuizState {
  currentIndex: number;
  selectedChoiceIds: string[];
  results: SubmitAnswerResponse[];
  phase: "answering" | "result" | "finished";
  
  // Actions
  toggleChoice: (id: string) => void;
  setPhase: (phase: "answering" | "result" | "finished") => void;
  addResult: (result: SubmitAnswerResponse) => void;
  nextQuestion: () => void;
  reset: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  currentIndex: 0,
  selectedChoiceIds: [],
  results: [],
  phase: "answering",

  toggleChoice: (id) =>
    set((state) => ({
      selectedChoiceIds: state.selectedChoiceIds.includes(id)
        ? state.selectedChoiceIds.filter((cid) => cid !== id)
        : [...state.selectedChoiceIds, id],
    })),

  setPhase: (phase) => set({ phase }),

  addResult: (result) =>
    set((state) => ({
      results: [...state.results, result],
    })),

  nextQuestion: () =>
    set((state) => ({
      currentIndex: state.currentIndex + 1,
      selectedChoiceIds: [],
      phase: "answering",
    })),

  reset: () =>
    set({
      currentIndex: 0,
      selectedChoiceIds: [],
      results: [],
      phase: "answering",
    }),
}));

export function useQuizQuery(currentIndex: number) {
  return useQuery<QuizResponse>({
    queryKey: ["quiz", currentIndex],
    queryFn: async () => {
      const quiz = await getNextQuizFn({ data: currentIndex });
      if (!quiz) throw new Error("Quiz not found");
      return quiz;
    },
    enabled: true,
  });
}

export function useSubmitMutation() {
  return useMutation<SubmitAnswerResponse, Error, { id: string; selectedChoiceIds: string[] }>({
    mutationFn: async ({ id, selectedChoiceIds }) => {
      const result = await submitAnswerFn({ data: { id, selectedChoiceIds } });
      if (!result) throw new Error("Failed to submit answer");
      return result;
    },
  });
}
