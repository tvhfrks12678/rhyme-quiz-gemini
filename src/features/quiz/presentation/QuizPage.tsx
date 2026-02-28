import { useEffect } from "react";
import { useQuizStore, useQuizQuery, useSubmitMutation } from "./hooks/useQuiz";
import { ScoreDisplay } from "./parts/ScoreDisplay";
import { QuizCard } from "./parts/QuizCard";
import { ResultDisplay } from "./parts/ResultDisplay";
import { FinishedDisplay } from "./parts/FinishedDisplay";
import { Loader2 } from "lucide-react";

export function QuizPage() {
  const {
    currentIndex,
    selectedChoiceIds,
    results,
    phase,
    toggleChoice,
    setPhase,
    addResult,
    nextQuestion,
    reset,
  } = useQuizStore();

  const { data: quiz, isLoading, isError, error } = useQuizQuery(currentIndex);
  const submitMutation = useSubmitMutation();

  const handleSubmit = async () => {
    if (!quiz) return;
    try {
      const result = await submitMutation.mutateAsync({
        id: quiz.id,
        selectedChoiceIds,
      });
      addResult(result);
      setPhase("result");
    } catch (err) {
      console.error(err);
    }
  };

  const isLast = quiz ? currentIndex === 4 : false; // Total 5 questions

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4 text-slate-500 font-bold">
        <Loader2 className="w-12 h-12 animate-spin text-cyan-500" />
        <p className="text-xl">問題を読み込み中...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4 text-red-500 font-bold">
        <p className="text-xl">エラーが発生しました</p>
        <p className="text-sm font-medium opacity-70">{(error as any)?.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          再読み込み
        </button>
      </div>
    );
  }

  if (phase === "finished") {
    return (
      <div className="max-w-4xl mx-auto py-12 px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <FinishedDisplay results={results} onReset={reset} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-12 animate-in fade-in duration-500">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight text-center">
          韻クイズに挑戦！
        </h1>
        <ScoreDisplay currentIndex={currentIndex} total={5} />
      </div>

      {quiz && (
        <div className="relative">
          <QuizCard
            quiz={quiz}
            selectedIds={selectedChoiceIds}
            onToggle={toggleChoice}
            onSubmit={handleSubmit}
            disabled={phase === "result"}
          />

          {phase === "result" && results[currentIndex] && (
            <div className="animate-in zoom-in-95 fade-in duration-300">
              <ResultDisplay
                result={results[currentIndex]}
                onNext={nextQuestion}
                isLast={isLast}
                onFinish={() => setPhase("finished")}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
