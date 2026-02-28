export function calculateScore(results: { isCorrect: boolean }[]) {
  const total = results.length;
  const correct = results.filter((r) => r.isCorrect).length;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  return {
    correct,
    total,
    percentage,
  };
}
