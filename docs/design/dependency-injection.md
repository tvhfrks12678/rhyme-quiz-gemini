# 依存性の注入 (Dependency Injection: DI) の解説

このプロジェクトでは、コードの柔軟性とテストの容易性を高めるために **依存性の注入 (Dependency Injection: DI)** というデザインパターンを採用しています。

## 1. DI の基礎知識

### DI とは？
DI とは、オブジェクトが必要とする依存オブジェクト（サービスやリポジトリなど）を、自分自身で作成するのではなく、**外部から注入**する手法です。

- **注入なし**: クラスの中で `new SpecificRepository()` を呼び出す。
  - 問題点: 特定の実装に強く結合してしまい、テスト時に差し替えたり、別のDBに変更したりするのが困難になります。
- **注入あり (DI)**: コンストラクタなどで `interface Repository` を受け取る。
  - 利点: クラスは「何を使うか」だけを知り、「それがどう実装されているか」を知りません。

---

## 2. DI が使われているコードの解説

このプロジェクトでの DI の主要な例は `QuizService` です。

### クラス定義とコンストラクタ

**`src/features/quiz/application/services/quizService.ts`**
```typescript
// (1) 抽象（インターフェース）をインポートする
import type { QuizRepository } from "../../domain/ports/quizRepository";

export class QuizService {
  // (2) コンストラクタで依存オブジェクトを受け取る
  constructor(private readonly quizRepository: QuizRepository) {}

  async getNextQuiz(currentIndex: number) {
    // (3) 注入されたオブジェクトを使用する
    const quiz = await this.quizRepository.findNext(currentIndex);
    // ...
  }
}
```

#### 1行ずつの解説
1.  `import type { QuizRepository } ...`: 具体的な「クラス」ではなく、機能の定義である「インターフェース」をインポートしています。
2.  `constructor(private readonly quizRepository: QuizRepository)`: ここが DI の核心です。`QuizService` は自分でリポジトリを作らず、外部から渡されたものを受け取ります。
    - `private readonly` を付けることで、クラス内部で安全に使用できるプロパティとして自動的に定義されます。
3.  `this.quizRepository.findNext(...)`: 渡されたリポジトリのメソッドを呼び出しています。この時点では、これが JSON から読んでいるのか、DB から読んでいるのかを `QuizService` は気にしません。

---

### 注入の実行（インスタンス化）

実際に DI を行っている（注入している）場所はここです。

**`src/features/quiz/application/services/quizFns.ts`**
```typescript
export const getNextQuizFn = createServerFn({ method: 'GET' })
  .handler(async ({ data: currentIndex }) => {
    // (4) 具体的な実装（アダプター）を取得する
    const repository = getQuizRepository() 
    
    // (5) インスタンス生成時に、依存オブジェクトを「注入」する
    const service = new QuizService(repository)
    
    return await service.getNextQuiz(currentIndex)
  })
```

#### 1行ずつの解説
4.  `const repository = getQuizRepository()`: ここで具体的な実装（例: `JsonQuizRepository`）のインスタンスを取得します。
5.  `new QuizService(repository)`: ここで **DI（注入）** が行われています。`QuizService` という「脳」に、`repository` という「手足」を授けているイメージです。

---

## 3. なぜ DI を使うのか？

### テストが圧倒的に楽になる
テストコードでは、本物のDBやファイルを使わずに「偽物のリポジトリ（モック）」を注入できます。

**テストコードの例:**
```typescript
// テスト用の偽リポジトリ
const mockRepo = {
  findNext: async () => ({ id: 'test', questionWord: 'テスト', ... })
}

// 偽物を注入してサービスをテストする
const service = new QuizService(mockRepo as any);
const result = await service.getNextQuiz(0);

expect(result.questionWord).toBe('テスト'); // 外部環境に左右されずテストできる！
```

### 実装の切り替えが容易
「今はJSONだけど、来月からは Turso(DB) に変えたい」という時、`QuizService` のコードを一切変えずに、注入するオブジェクトを `JsonQuizRepository` から `DrizzleQuizRepository` に変えるだけで対応が可能になります。
