import { Checkbox } from "#/components/ui/checkbox";
import { Label } from "#/components/ui/label";

interface Choice {
  id: string;
  text: string;
}

interface ChoiceListProps {
  choices: Choice[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  disabled?: boolean;
}

export function ChoiceList({ choices, selectedIds, onToggle, disabled }: ChoiceListProps) {
  return (
    <div className="space-y-4">
      {choices.map((choice) => (
        <div key={choice.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-100 transition-colors">
          <Checkbox
            id={choice.id}
            checked={selectedIds.includes(choice.id)}
            onCheckedChange={() => onToggle(choice.id)}
            disabled={disabled}
            className="w-6 h-6"
          />
          <Label
            htmlFor={choice.id}
            className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer"
          >
            {choice.text}
          </Label>
        </div>
      ))}
    </div>
  );
}
