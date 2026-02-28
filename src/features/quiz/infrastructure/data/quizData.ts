import type { QuizFull } from "../../domain/entities/quiz";

export const quizzes: QuizFull[] = [
  {
    id: "q1",
    questionWord: "とら",
    questionVowels: "おあ",
    imageKey: "tora",
    explanation: "「とら」の母音は「おあ」。同じ母音パターンの「おか」が正解。",
    choices: [
      { id: "q1-c1", text: "おか", vowels: "おあ", isCorrect: true },
      { id: "q1-c2", text: "ぶた", vowels: "うあ", isCorrect: false },
      { id: "q1-c3", text: "ふぐ", vowels: "うう", isCorrect: false },
      { id: "q1-c4", text: "さる", vowels: "あう", isCorrect: false },
    ],
  },
  {
    id: "q2",
    questionWord: "くるま",
    questionVowels: "ううあ",
    imageKey: "kuruma",
    explanation: "「くるま」の母音は「ううあ」。同じ母音パターンの「つくば」が正解。",
    choices: [
      { id: "q2-c1", text: "つくば", vowels: "ううあ", isCorrect: true },
      { id: "q2-c2", text: "さくら", vowels: "あうあ", isCorrect: false },
      { id: "q2-c3", text: "みどり", vowels: "いおい", isCorrect: false },
      { id: "q2-c4", text: "かばん", vowels: "ああん", isCorrect: false },
    ],
  },
  {
    id: "q3",
    questionWord: "かいじゅう",
    questionVowels: "あいうう",
    imageKey: "kaiju",
    explanation: "「かいじゅう」の母音は「あいうう」。同じパターンの「さいしゅう」が正解。",
    choices: [
      { id: "q3-c1", text: "さいしゅう", vowels: "あいうう", isCorrect: true },
      { id: "q3-c2", text: "かいすい", vowels: "あいいい", isCorrect: false },
      { id: "q3-c3", text: "たいふう", vowels: "あいうう", isCorrect: true },
      { id: "q3-c4", text: "はなび", vowels: "ああい", isCorrect: false },
      { id: "q3-c5", text: "きょり", vowels: "おい", isCorrect: false },
    ],
  },
  {
    id: "q4",
    questionWord: "せんぱい",
    questionVowels: "えんあい",
    imageKey: "senpai",
    explanation: "「せんぱい」の母音は「えんあい」。同じパターンの「げんかい」と「てんさい」が正解。",
    choices: [
      { id: "q4-c1", text: "げんかい", vowels: "えんあい", isCorrect: true },
      { id: "q4-c2", text: "れんあい", vowels: "えんあい", isCorrect: true },
      { id: "q4-c3", text: "てんさい", vowels: "えんあい", isCorrect: true },
      { id: "q4-c4", text: "まんかい", vowels: "あんあい", isCorrect: false },
      { id: "q4-c5", text: "へんしん", vowels: "えんいん", isCorrect: false },
      { id: "q4-c6", text: "かんぱい", vowels: "あんあい", isCorrect: false },
    ],
  },
  {
    id: "q5",
    questionWord: "おもてなし",
    questionVowels: "おおえあい",
    imageKey: "omotenashi",
    explanation: "「おもてなし」の母音は「おおえあい」。同じパターンの「ところだし」が正解。",
    choices: [
      { id: "q5-c1", text: "ところだし", vowels: "おおえあい", isCorrect: true },
      { id: "q5-c2", text: "おとこだし", vowels: "おおおあい", isCorrect: false },
      { id: "q5-c3", text: "こころなし", vowels: "おおおあい", isCorrect: false },
      { id: "q5-c4", text: "おもいでし", vowels: "おおいえい", isCorrect: false },
      { id: "q5-c5", text: "ひとでなし", vowels: "いおえあい", isCorrect: false },
      { id: "q5-c6", text: "ほとけざし", vowels: "おえあい", isCorrect: false },
    ],
  },
];
