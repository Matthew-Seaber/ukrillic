"use client";

import { useCallback, useEffect, useState } from "react";

import { transliterateWord } from "@/lib/transliterate";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { ArrowRight, Check, Copy, Keyboard } from "lucide-react";

export default function Home() {
  const [latinText, setLatinText] = useState("");
  const [transliterationOptions, setTransliterationOptions] = useState<
    string[]
  >([]);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    null,
  );
  const [cyrillicText, setCyrillicText] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  const selectTransliterationOption = useCallback(
    (word?: string) => {
      let selectedOption: string;

      if (!word) {
        selectedOption = transliterationOptions[selectedOptionIndex ?? 0];
      } else {
        selectedOption = word;
      }

      if (!selectedOption) return;

      setCyrillicText((prev) =>
        prev === "" ? selectedOption : prev + " " + selectedOption,
      );

      setLatinText("");
      setTransliterationOptions([]);
      setSelectedOptionIndex(null);
    },
    [transliterationOptions, selectedOptionIndex],
  );

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const activeElement = document.activeElement as HTMLElement;
      const inputBox = document.getElementById(
        "latin-input",
      ) as HTMLInputElement | null;

      if (
        activeElement.tagName === "INPUT" ||
        activeElement.tagName === "TEXTAREA" ||
        activeElement.isContentEditable
      ) {
        if (document.activeElement?.id !== "latin-input") {
          return;
        }

        if (event.key === "Enter" || event.key === "Tab" || event.key === " ") {
          event.preventDefault();

          selectTransliterationOption();
        } else if (event.key === "ArrowUp") {
          event.preventDefault();

          setSelectedOptionIndex((prev) =>
            prev === null ? 0 : Math.max(prev - 1, 0),
          );
        } else if (event.key === "ArrowDown") {
          event.preventDefault();

          setSelectedOptionIndex((prev) =>
            prev === null
              ? 0
              : Math.min(prev + 1, transliterationOptions.length - 1),
          );
        } else if (event.key === "Escape") {
          event.preventDefault();

          setLatinText("");
          inputBox?.blur();
        }

        return;
      }

      inputBox?.focus();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    selectTransliterationOption,
    transliterationOptions,
    selectedOptionIndex,
    cyrillicText,
  ]);

  return (
    <div className="flex flex-col items-center justify-center gap-12">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="md:mt-4 font-ibm-plex-sans font-bold text-5xl text-center">
          Type in Latin. <span className="text-primary">Get Cyrillic.</span>
        </h1>
        <h2 className="font-ibm-plex-sans text-lg">
          Instantly transliterate Latin characters into Ukrainian Cyrillic.
        </h2>
      </div>

      <div className="relative w-full min-h-84 grid grid-cols-2 border rounded-2xl overflow-hidden shadow-lg">
        <div className="flex flex-col justify-between gap-4 border-r p-4 md:p-8">
          <div className="flex flex-col gap-4">
            <h3 className="font-ibm-plex-sans font-semibold text-lg text-primary">
              ENGLISH (LATIN)
            </h3>

            <input
              id="latin-input"
              type="text"
              spellCheck={false}
              placeholder="Enter text here..."
              value={latinText}
              onChange={(e) => {
                setLatinText(e.target.value);

                if (!e.target.value.trim()) {
                  setTransliterationOptions([]);
                  setSelectedOptionIndex(null);
                  return;
                }

                const cyrillicOptions = transliterateWord(
                  e.target.value.trim(),
                );
                setTransliterationOptions(cyrillicOptions);
                setSelectedOptionIndex(0);
              }}
              className="text-3xl pb-1 focus:border-b-4 border-primary outline-none"
            />

            {latinText && (
              <div className="w-96 absolute top-32 p-2 bg-background border rounded-md flex flex-col gap-1 font-ibm-plex-sans font-semibold shadow-lg z-20">
                <div className="w-full flex flex-col">
                  {transliterationOptions.map((option, index) => (
                    <p
                      key={index}
                      className={`w-full p-2 rounded-md cursor-default hover:bg-primary/20 ${index === selectedOptionIndex ? "bg-primary/40" : ""}`}
                      onClick={() => {
                        selectTransliterationOption(option);
                      }}
                    >
                      {option}
                    </p>
                  ))}
                </div>

                <Separator />

                <p
                  className="w-full p-2 text-foreground/40 rounded-md cursor-default hover:bg-primary/20"
                  onClick={() => {
                    setCyrillicText((prev) =>
                      prev === "" ? latinText : " " + latinText,
                    );
                    setLatinText("");
                  }}
                >
                  {latinText}
                </p>
              </div>
            )}
          </div>

          <p className="font-ibm-plex-sans font-medium text-sm text-foreground/60">
            Note: text will always be inserted at the end of the output.
          </p>
        </div>

        <div className="absolute size-8 md:size-14 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary rounded-full flex items-center justify-center">
          <ArrowRight className="size-5 md:size-8 text-white" />
        </div>

        <div className="flex flex-col gap-4 p-4 md:p-8">
          <div className="flex flex-row items-center justify-between gap-2">
            <h3 className="font-ibm-plex-sans font-semibold text-lg text-primary">
              UKRAINIAN (CYRILLIC)
            </h3>

            <Button
              size="icon"
              variant="link"
              disabled={!cyrillicText}
              onClick={() => {
                if (copySuccess) return;

                navigator.clipboard.writeText(cyrillicText);
                setCopySuccess(true);

                setTimeout(() => setCopySuccess(false), 3000);
              }}
            >
              {copySuccess ? (
                <Check className="size-5" />
              ) : (
                <Copy className="size-5" />
              )}
            </Button>
          </div>

          <textarea
            placeholder="..."
            spellCheck={false}
            value={cyrillicText}
            onChange={(e) => setCyrillicText(e.target.value)}
            className="h-full text-3xl outline-none resize-none"
          />
        </div>
      </div>

      <div className="flex flex-row items-center justify-center gap-2 py-3 px-4 bg-foreground/1 text-sm rounded-2xl border shadow-md">
        <Keyboard strokeWidth={1.75} className="size-5" />

        <p>
          Use{" "}
          <KbdGroup>
            <Kbd>↑</Kbd>
            <Kbd>↓</Kbd>
          </KbdGroup>{" "}
          to navigate options, and <Kbd>Enter</Kbd> to select
        </p>
      </div>
    </div>
  );
}
