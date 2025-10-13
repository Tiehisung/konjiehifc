"use client";

import { useState } from "react";

export default function InputEl({
  showClearBtn,
  inputStyles,
  contStyles,
  type,
}) {
  const [inputString, setInputString] = useState("");
  function handleOnChange(e) {
    setInputString(e.target.value);
    console.log(inputString);
  }
  return (
    <div
      className={`border-b-2 shadow-sm px-1 rounded-md focus-within:border-blue-500 flex gap-1 items-center bg-[#fefefe] ${contStyles}`}
    >
      <input
        value={inputString}
        onChange={handleOnChange}
        type={type || "text"}
        className={`outline-none pl-2 bg-[#fefefe] ${inputStyles}`}
      />
      <button
        onClick={() => setInputString("")}
        className={`text-2xl text-slate-400 hover:text-slate-900 hover:bg-[#fbfbfb] w-fit h-fit px-1 rounded-md ${
          !showClearBtn && "hidden"
        }`}
      >
        &times;
      </button>
    </div>
  );
}
