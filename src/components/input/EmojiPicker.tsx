"use client";

import { useState } from "react";
import clsx from "clsx";

export const FOOTBALL_EMOJIS = [
  { label: "Goal", value: "⚽" },
  { label: "Assist", value: "🎯" },
  { label: "Yellow Card", value: "🟨" },
  { label: "Red Card", value: "🟥" },
  { label: "Injury", value: "🤕" },
  { label: "Save", value: "🧤" },
  { label: "Trophy", value: "🏆" },
  { label: "Substitution", value: "🔁" },
  { label: "Time", value: "⏱️" },
  { label: "Shot", value: "🥅" },
  { label: "Captain", value: "🫡" },
];

interface EmojiPickerProps {
  emojis?: { label: string; value: string }[];
  onSelect?: (emoji: { label: string; value: string }) => void;
  defaultSelected?: string;
  label?: string;
}

export function EmojiPicker({
  emojis = FOOTBALL_EMOJIS,
  onSelect,
  defaultSelected,
  label,
}: EmojiPickerProps) {
  const [selected, setSelected] = useState(defaultSelected || "");

  const handleSelect = (emoji: { label: string; value: string }) => {
    setSelected(emoji.label);
    onSelect?.(emoji);
  };

  return (
    <div className="space-y-3">
      {label && (
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          {label}
        </h3>
      )}
      <div className="flex items-center gap-1">
        {emojis.map((emoji) => (
          <button
            type="button"
            key={emoji.label}
            onClick={() => handleSelect(emoji)}
            className={clsx(
              "flex flex-col items-center justify-center p-2 rounded-xl border transition-all hover:scale-105",
              selected === emoji.label
                ? "border-primary bg-primary/10 scale-110"
                : "border-gray-300 hover:border-primary/50"
            )}
            title={emoji.label}
          >
            <span className="text-2xl">{emoji.value}</span>
            <span className="text-[10px] font-medium mt-1 text-gray-600">
              {emoji.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
