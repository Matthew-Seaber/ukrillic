"use client";

import { useState } from "react";

import { ArrowRight } from "lucide-react";

export default function Home() {
  const [latinText, setLatinText] = useState("");
  const [cyrillicText, setCyrillicText] = useState("");

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

      <div className="relative w-full min-h-84 grid grid-cols-2 border rounded-2xl overflow-hidden">
        <div className="flex flex-col justify-between gap-4 border-r p-8">
          <div className="flex flex-col gap-4">
            <h3 className="font-ibm-plex-sans font-semibold text-lg text-primary">
              ENGLISH (LATIN)
            </h3>

            <input
              type="text"
              placeholder="Enter text here..."
              value={latinText}
              onChange={(e) => setLatinText(e.target.value)}
              className="text-3xl pb-1 focus:border-b-4 border-primary outline-none"
            />

            {latinText && <div className="absolute">
              
              </div>}
          </div>

          <p className="font-ibm-plex-sans font-medium text-sm text-foreground/60">
            Note: text will always be inserted at the end of the output.
          </p>
        </div>

        <div className="absolute size-14 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary rounded-full flex items-center justify-center">
          <ArrowRight className="size-8 text-white" />
        </div>

        <div className="flex flex-col gap-4 p-8">
          <h3 className="font-ibm-plex-sans font-semibold text-lg text-primary">
            UKRAINIAN (CYRILLIC)
          </h3>

          <input
            type="text"
            placeholder="..."
            value={cyrillicText}
            onChange={(e) => setCyrillicText(e.target.value)}
            className="text-3xl outline-none"
          />
        </div>
      </div>
    </div>
  );
}
