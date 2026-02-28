import { describe, it, expect } from "vitest";
import { extractVowels } from "./rhyme";

describe("extractVowels", () => {
  it('extracts "おあ" from "とら"', () => {
    expect(extractVowels("とら")).toBe("おあ");
  });

  it('extracts "ううあ" from "くるま"', () => {
    expect(extractVowels("くるま")).toBe("ううあ");
  });

  it('extracts "いあい" from "ひかり"', () => {
    expect(extractVowels("ひかり")).toBe("いあい");
  });

  it('extracts "あいあ" from "なみだ"', () => {
    expect(extractVowels("なみだ")).toBe("あいあ");
  });

  it('handles "ん", "っ", "ー"', () => {
    expect(extractVowels("かばん")).toBe("ああん");
    expect(extractVowels("がっこう")).toBe("あっおう");
    expect(extractVowels("らーめん")).toBe("あーえん");
  });
});
