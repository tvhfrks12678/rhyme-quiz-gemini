import { Progress } from "#/components/ui/progress";

interface ScoreDisplayProps {
  currentIndex: number;
  total: number;
}

export function ScoreDisplay({ currentIndex, total }: ScoreDisplayProps) {
  const progress = (currentIndex / total) * 100;
  
  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm font-semibold text-slate-500">
        <span>韻クイズ {currentIndex + 1} / {total}</span>
        <span>進捗 {Math.round(progress)}%</span>
      </div>
      <Progress value={progress} className="h-2 w-full" />
    </div>
  );
}
