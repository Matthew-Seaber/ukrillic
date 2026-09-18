import { WordMap } from "@/lib/transliteration-word-map";

type CyrillicWordOption = {
  text: string;
  score: number;
};

export function transliterateWord(word: string): string[] {
  const input = word.toLowerCase();

  const memo = new Map<number, CyrillicWordOption[]>();

  function recursivelyFindOptions(index: number): CyrillicWordOption[] {
    if (index === input.length) {
      // Base case
      return [{ text: "", score: 0 }];
    }

    if (memo.has(index)) {
      return memo.get(index)!;
    }

    const options: CyrillicWordOption[] = [];

    for (const [latin, cyrillic] of Object.entries(WordMap)) {
      if (!input.startsWith(latin, index)) {
        continue;
      }

      const nextOptions = recursivelyFindOptions(index + latin.length);

      for (const nextOption of nextOptions) {
        options.push({
          text: cyrillic + nextOption.text,
          score: nextOption.score + latin.length * 10, // Gives more weighting to longer mappings (e.g. shch over s)
        });
      }
    }

    const uniqueOptionsMap = new Map<string, CyrillicWordOption>();

    for (const option of options) {
      const existingOption = uniqueOptionsMap.get(option.text);

      if (!existingOption || option.score > existingOption.score) {
        uniqueOptionsMap.set(option.text, option);
      }
    }

    const sortedOptions = [...uniqueOptionsMap.values()].sort(
      (a, b) => b.score - a.score,
    );

    memo.set(index, sortedOptions);

    return sortedOptions;
  }

  return recursivelyFindOptions(0).map((option) => option.text);
}
