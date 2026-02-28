import { Badge } from "#/components/ui/badge";
import { Card, CardContent } from "#/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";
import type { SubmitAnswerResponse } from "../../contracts/quiz";

interface ResultDisplayProps {
  result: SubmitAnswerResponse;
  onNext: () => void;
  isLast: boolean;
  onFinish: () => void;
}

export function ResultDisplay({ result, onNext, isLast, onFinish }: ResultDisplayProps) {
  const { isCorrect, questionVowels, choiceDetails, explanation } = result;

  return (
    <Card className={`mt-6 overflow-hidden border-2 ${isCorrect ? "border-green-500 bg-green-50/50" : "border-red-500 bg-red-50/50"}`}>
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          {isCorrect ? (
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          ) : (
            <XCircle className="w-8 h-8 text-red-600" />
          )}
          <h2 className={`text-2xl font-bold ${isCorrect ? "text-green-700" : "text-red-700"}`}>
            {isCorrect ? "正解！" : "不正解..."}
          </h2>
        </div>

        <div className="mb-6">
          <p className="text-sm font-semibold text-slate-500 mb-1">問題の母音: <Badge variant="outline" className="ml-1 text-base">{questionVowels}</Badge></p>
          <div className="space-y-2 mt-4">
            {choiceDetails.map((choice) => (
              <div key={choice.id} className="flex items-center justify-between p-2 rounded bg-white/80 border border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="font-bold">{choice.text}</span>
                  <span className="text-slate-400">→</span>
                  <span className="text-slate-600 font-medium">{choice.vowels}</span>
                </div>
                {choice.isCorrect ? (
                  <Badge className="bg-green-600">正解</Badge>
                ) : (
                  <Badge variant="secondary" className="bg-slate-200 text-slate-500">不正解</Badge>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/90 p-4 rounded-lg border border-slate-100 mb-6">
          <p className="text-slate-700 leading-relaxed">{explanation}</p>
        </div>

        <button
          onClick={isLast ? onFinish : onNext}
          className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-lg transition-transform active:scale-[0.98]"
        >
          {isLast ? "結果発表へ" : "次の問題へ"}
        </button>
      </CardContent>
    </Card>
  );
}
