export type ChoiceFull = {
  id: string;
  text: string;
  vowels: string;
  isCorrect: boolean;
};

export type QuizFull = {
  id: string;
  questionWord: string;
  questionVowels: string;
  imageKey: string;
  explanation: string;
  choices: ChoiceFull[];
};

export type QuizResult = {
  isCorrect: boolean;
  questionVowels: string;
  correctChoiceIds: string[];
  explanation: string;
  choiceDetails: {
    id: string;
    text: string;
    vowels: string;
    isCorrect: boolean;
  }[];
};
