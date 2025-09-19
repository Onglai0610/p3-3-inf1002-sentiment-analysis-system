"use client";
import { useState } from "react";

interface SentimentResult {
  sentiment: string;
  score: number;
}

interface GeminiResult {
  "sentiment(gemini)": string;
  "confident(gemini)": number;
}

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<SentimentResult | null>(null);
  const [geminiResult, setGeminiResult] = useState<GeminiResult | null>(null);

  const analyze = async () => {
    const res = await fetch("http://localhost:8000/sentiment/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data: SentimentResult = await res.json();
    setResult(data);
  };

  const analyzeGemini = async () => {
    const res = await fetch("http://localhost:8000/gemini/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data: GeminiResult = await res.json();
    setGeminiResult(data);
  };

  return (
    <div className="p-10 flex flex-col gap-4 max-w-lg mx-auto">
      <textarea
        className="border p-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
      />
      <div className="flex gap-2">
        <button
          onClick={analyze}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Analyze (AFINN)
        </button>
        <button
          onClick={analyzeGemini}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Analyze (Gemini)
        </button>
      </div>
      {result && (
        <div className="mt-4">
          <p>
            <b>Sentiment:</b> {result.sentiment}
          </p>
          <p>
            <b>Confidence:</b> {result.score.toFixed(2)}
          </p>
        </div>
      )}
      {geminiResult && (
        <div className="mt-4">
          <p>
            <b>sentiment(gemini):</b> {geminiResult["sentiment(gemini)"]}
          </p>
          <p>
            <b>confident(gemini):</b> {geminiResult["confident(gemini)"].toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
}
