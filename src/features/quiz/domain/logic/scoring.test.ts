import { describe, it, expect } from "vitest";
import { calculateScore } from "./scoring";

describe("calculateScore", () => {
  it("calculates correct score and percentage", () => {
    const results = [
      { isCorrect: true },
      { isCorrect: false },
      { isCorrect: true },
      { isCorrect: true },
      { isCorrect: false },
    ];
    const score = calculateScore(results);
    expect(score.correct).toBe(3);
    expect(score.total).toBe(5);
    expect(score.percentage).toBe(60);
  });

  it("handles empty results", () => {
    const score = calculateScore([]);
    expect(score.correct).toBe(0);
    expect(score.total).toBe(0);
    expect(score.percentage).toBe(0);
  });

  it("handles 100% correct", () => {
    const results = [{ isCorrect: true }, { isCorrect: true }];
    const score = calculateScore(results);
    expect(score.percentage).toBe(100);
  });
});
