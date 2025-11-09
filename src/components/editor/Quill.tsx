"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
}

const QuillEditor: React.FC<QuillEditorProps> = ({
  value,
  onChange,
  placeholder = "Enter text...",
  label,
  className = "",
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Inject custom styles
  useEffect(() => {
    const styleId = "quill-editor-styles";
    if (document.getElementById(styleId)) return;

    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      .ql-toolbar {
        border-top: none !important;
        border-left: none !important;
        border-right: none !important;
        border-bottom: 1px solid #d1d5db !important;
        background-color: #f9fafb !important;
        padding: 8px 12px !important;
      }
      .ql-container {
        border: none !important;
        font-family: inherit !important;
      }
      .ql-editor {
        padding: 12px !important;
        font-size: 14px !important;
        line-height: 1.5 !important;
        color: #374151 !important;
        min-height: 100px !important;
      }
      .ql-editor.ql-blank::before {
        color: #9ca3af !important;
        font-style: normal !important;
        left: 12px !important;
      }
      .ql-toolbar .ql-stroke { stroke: #6b7280 !important; }
      .ql-toolbar .ql-fill { fill: #6b7280 !important; }
      .ql-toolbar button:hover .ql-stroke { stroke: #374151 !important; }
      .ql-toolbar button:hover .ql-fill { fill: #374151 !important; }
      .ql-toolbar button.ql-active .ql-stroke { stroke: #3b82f6 !important; }
      .ql-toolbar button.ql-active .ql-fill { fill: #3b82f6 !important; }
      .ql-toolbar button { padding: 4px !important; margin: 0 2px !important; }
    `;

    document.head.appendChild(style);

    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) existingStyle.remove();
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const initializeQuill = async () => {
      if (
        typeof window === "undefined" ||
        !editorRef.current ||
        quillRef.current
      )
        return;

      try {
        const { default: Quill } = await import("quill");

        if (!isMounted || quillRef.current) return;

        editorRef.current.innerHTML = "";

        quillRef.current = new Quill(editorRef.current, {
          theme: "snow",
          placeholder,
          modules: {
            toolbar: [
              ["bold", "italic", "underline", "strike"],
              [{ color: [] }, { background: [] }],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link"],
              ["clean"],
              ["undo", "redo"], // custom handlers
            ],
          },
        });

        // Add undo/redo functionality
        const undoHandler = () => quillRef.current.history.undo();
        const redoHandler = () => quillRef.current.history.redo();

        const toolbar = quillRef.current.getModule("toolbar");
        toolbar.addHandler("undo", undoHandler);
        toolbar.addHandler("redo", redoHandler);

        // Enable history module
        quillRef.current.getModule("history");

        if (value && value !== "<p><br></p>") {
          quillRef.current.root.innerHTML = value;
        }

        quillRef.current.on("text-change", () => {
          if (quillRef.current && isMounted) {
            const html = quillRef.current.root.innerHTML;
            onChange(html);
          }
        });

        setIsLoaded(true);
      } catch (error) {
        console.error("Failed to load Quill:", error);
      }
    };

    initializeQuill();

    return () => {
      isMounted = false;
      if (quillRef.current) {
        try {
          quillRef.current.off("text-change");
          quillRef.current = null;
        } catch (error) {
          console.error("Error cleaning up Quill:", error);
        }
      }
      setIsLoaded(false);
    };
  }, []);

  useEffect(() => {
    if (
      quillRef.current &&
      isLoaded &&
      value !== quillRef.current.root.innerHTML
    ) {
      const currentSelection = quillRef.current.getSelection();
      quillRef.current.root.innerHTML = value || "";
      if (currentSelection) quillRef.current.setSelection(currentSelection);
    }
  }, [value, isLoaded]);

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {label}
        </label>
      )}
      <div className="border border-gray-300 rounded-xl overflow-hidden bg-white">
        <div ref={editorRef} className="min-h-[120px] min-w-[500px] px-2" />
      </div>
    </div>
  );
};

export default QuillEditor;
