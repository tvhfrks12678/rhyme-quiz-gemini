import { Card, CardContent } from "#/components/ui/card";
import { Badge } from "#/components/ui/badge";
import { PartyPopper, RotateCcw } from "lucide-react";
import { calculateScore } from "../../domain/logic/scoring";
import type { SubmitAnswerResponse } from "../../contracts/quiz";

interface FinishedDisplayProps {
  results: SubmitAnswerResponse[];
  onReset: () => void;
}

export function FinishedDisplay({ results, onReset }: FinishedDisplayProps) {
  const { correct, total, percentage } = calculateScore(results);

  return (
    <Card className="w-full max-w-2xl mx-auto overflow-hidden shadow-2xl border-2 border-cyan-100 bg-gradient-to-br from-white to-cyan-50/20">
      <CardContent className="p-12 text-center space-y-8">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-cyan-100 rounded-full flex items-center justify-center animate-bounce">
            <PartyPopper className="w-12 h-12 text-cyan-600" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            クイズ終了！
          </h1>
          <p className="text-slate-500 font-medium">お疲れ様でした。あなたのスコアは...</p>
        </div>

        <div className="py-8 space-y-4">
          <div className="text-7xl font-black text-cyan-600 tracking-tighter tabular-nums">
            {percentage}%
          </div>
          <div className="flex items-center justify-center gap-4 text-xl font-bold text-slate-600">
            <span>{total}問中</span>
            <span className="text-3xl text-slate-900">{correct}問正解</span>
          </div>
        </div>

        <div className="pt-8 flex flex-col items-center gap-4">
          <button
            onClick={onReset}
            className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-xl flex items-center justify-center gap-3 transition-all hover:shadow-xl shadow-slate-900/10 active:scale-[0.98]"
          >
            <RotateCcw className="w-6 h-6" />
            もう一度挑戦する
          </button>
          
          <p className="text-sm text-slate-400 font-medium italic">
            "韻を踏んで、言葉を研ぎ澄ませ"
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
