import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Badge } from "#/components/ui/badge";
import { ChoiceList } from "./ChoiceList";
import type { QuizResponse } from "../../contracts/quiz";

interface QuizCardProps {
  quiz: QuizResponse;
  selectedIds: string[];
  onToggle: (id: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

export function QuizCard({ quiz, selectedIds, onToggle, onSubmit, disabled }: QuizCardProps) {
  const { questionWord, choices, imageKey } = quiz;

  return (
    <Card className="w-full max-w-2xl mx-auto overflow-hidden shadow-lg border-2 border-slate-100">
      <CardHeader className="bg-slate-50 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="px-3 py-1 bg-white text-base">
            <span className="text-slate-400 mr-2 font-light">問題：</span>
            <span className="text-slate-800 font-bold">{questionWord}</span>
          </Badge>
          <span className="text-slate-400 text-sm">画像を読み込み中 ({imageKey})</span>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-1/3 aspect-square bg-slate-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-200">
            <span className="text-4xl">🎵</span>
          </div>
          <div className="flex-1 space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-slate-800 tracking-tight leading-tight">
                「{questionWord}」で
                <br />
                踏める韻はどれ？
              </h2>
              <p className="text-sm text-slate-400 font-medium">母音パターンが同じものを選ぼう（複数選択可）</p>
            </div>
            
            <ChoiceList
              choices={choices}
              selectedIds={selectedIds}
              onToggle={onToggle}
              disabled={disabled}
            />

            {!disabled && (
              <button
                onClick={onSubmit}
                disabled={selectedIds.length === 0}
                className="w-full py-4 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-200 disabled:cursor-not-allowed text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-cyan-500/20 active:scale-[0.98]"
              >
                解答する
              </button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
