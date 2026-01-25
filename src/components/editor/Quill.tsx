"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
// If you installed quill@1.3.7, this import should work:
import "quill/dist/quill.snow.css";
 

import type Quill from "quill";

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  error?: string;
}

const QuillEditor: React.FC<QuillEditorProps> = ({
  value,
  onChange,
  placeholder = "Enter text...",
  label,
  className = "",error
}) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const toolbarRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Inject small custom styles for toolbar look (optional)
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
      .ql-container { border: none !important; font-family: inherit !important; }
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
      .ql-custom-btn { display:inline-flex; align-items:center; justify-content:center; width:28px; height:28px; border-radius:4px; }
      .ql-custom-btn:hover { background: rgba(0,0,0,0.04); }
    `;
    document.head.appendChild(style);

    return () => {
      const existing = document.getElementById(styleId);
      if (existing) existing.remove();
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

        // Clean previous content
        editorRef.current!.innerHTML = "";

        // Build a toolbar container programmatically so we can add undo/redo buttons
        const toolbarContainer = document.createElement("div");
        toolbarContainer.className = "ql-toolbar ql-snow";
        toolbarRef.current = toolbarContainer;

        // Standard toolbar groups; leave space for custom undo/redo at the end
        toolbarContainer.innerHTML = `
          <span class="ql-formats">
            <button class="ql-bold" aria-label="Bold"></button>
            <button class="ql-italic" aria-label="Italic"></button>
            <button class="ql-underline" aria-label="Underline"></button>
            <button class="ql-strike" aria-label="Strike"></button>
          </span>
          <span class="ql-formats">
            <select class="ql-color"></select>
            <select class="ql-background"></select>
          </span>
          <span class="ql-formats">
            <button class="ql-list" value="ordered"></button>
            <button class="ql-list" value="bullet"></button>
          </span>
          <span class="ql-formats">
            <button class="ql-link"></button>
            <button class="ql-clean"></button>
          </span>
          <span class="ql-formats ql-undo-redo" style="margin-left:8px"></span>
        `;

        // Insert toolbar before editor
        const wrapper = document.createElement("div");
        wrapper.appendChild(toolbarContainer);

        // Create the editor container element that Quill will attach to
        const quillEditorRoot = document.createElement("div");
        quillEditorRoot.className = "ql-container ql-snow";
        const editorInner = document.createElement("div");
        editorInner.className = "ql-editor";
        quillEditorRoot.appendChild(editorInner);

        wrapper.appendChild(quillEditorRoot);

        // Replace the existing editorRef DOM with our wrapper (so toolbar is present)
        if (editorRef.current) {
          // replace editorRef.current with wrapper in the DOM
          const parent = editorRef.current.parentElement;
          if (parent) {
            parent.replaceChild(wrapper, editorRef.current);
            // point refs to new nodes for later usage
            editorRef.current = editorInner;
            // store container for cleanup
          } else {
            // fallback: append wrapper
            editorRef.current.appendChild(wrapper);
          }
        }

        // Now initialize Quill with toolbar container and history module
        quillRef.current = new Quill(quillEditorRoot, {
          theme: "snow",
          placeholder,
          modules: {
            toolbar: {
              container: toolbarContainer,
              // we will attach custom handlers for undo/redo later
            },
            history: {
              delay: 500,
              maxStack: 100,
              userOnly: true,
            },
          },
        });

        // If initial value provided, set it
        if (value && value !== "<p><br></p>") {
          quillRef.current.root.innerHTML = value;
        }

        // Attach text-change -> onChange
        quillRef.current.on("text-change", () => {
          if (quillRef.current && isMounted) {
            const html = quillRef.current.root.innerHTML;
            onChange(html);
          }
        });

        // Create undo/redo buttons in the toolbar (typed handlers)
        const undoRedoContainer = toolbarContainer.querySelector(
          ".ql-undo-redo"
        ) as HTMLElement | null;

        if (undoRedoContainer) {
          // Undo button
          const undoBtn = document.createElement("button");
          undoBtn.type = "button";
          undoBtn.className = "ql-custom-btn";
          undoBtn.title = "Undo";
          undoBtn.setAttribute("aria-label", "Undo");
          // simple SVG icon
          undoBtn.innerHTML = `
            <svg viewBox="0 0 18 18" width="18" height="18" class="ql-stroke" >
              <polyline points="7 7 3 11 7 15"></polyline>
              <path d="M3 11h6a4 4 0 0 0 0-8h0"></path>
            </svg>
          `;

          // Redo button
          const redoBtn = document.createElement("button");
          redoBtn.type = "button";
          redoBtn.className = "ql-custom-btn";
          redoBtn.title = "Redo";
          redoBtn.setAttribute("aria-label", "Redo");
          redoBtn.innerHTML = `
            <svg viewBox="0 0 18 18" width="18" height="18" class="ql-stroke" >
              <polyline points="11 7 15 11 11 15"></polyline>
              <path d="M15 11H9a4 4 0 0 1 0-8h0"></path>
            </svg>
          `;

          // Handler functions - typed
          const handleUndo = (ev?: Event) => {
            ev?.preventDefault();
            try {
              quillRef.current?.history.undo();
              // Optional: focus the editor after undo
              quillRef.current?.focus();
            } catch (err) {
              // minor guard; typically won't be needed
              console.warn("Undo failed:", err);
            }
          };

          const handleRedo = (ev?: Event) => {
            ev?.preventDefault();
            try {
              quillRef.current?.history.redo();
              quillRef.current?.focus();
            } catch (err) {
              console.warn("Redo failed:", err);
            }
          };

          undoBtn.addEventListener("click", handleUndo);
          redoBtn.addEventListener("click", handleRedo);

          undoRedoContainer.appendChild(undoBtn);
          undoRedoContainer.appendChild(redoBtn);
        }

        setIsLoaded(true);
      } catch (error) {
        console.error("Failed to load Quill:", error);
      }
    };

    initializeQuill();

    return () => {
      isMounted = false;
      // Clean up Quill instance and any attached listeners
      try {
        if (quillRef.current) {
        
          quillRef.current.off && quillRef.current.off("text-change");
          // attempt to remove DOM toolbar if it exists
          const tb = toolbarRef.current;
          if (tb && tb.parentElement) tb.parentElement.removeChild(tb);
          // There's no explicit destroy() in v1; clear ref
          quillRef.current = null;
        }
      } catch (err) {
        console.error("Error cleaning up Quill:", err);
      }
      setIsLoaded(false);
    };
  }, []); // run once

  // Update content when value changes externally
  useEffect(() => {
    if (
      quillRef.current &&
      isLoaded &&
      value !== quillRef.current.root.innerHTML
    ) {
      const currentSelection = quillRef.current.getSelection();
      quillRef.current.root.innerHTML = value || "";
      if (currentSelection) {
        try {
          quillRef.current.setSelection(currentSelection);
        } catch {
          // ignore if selection can't be restored
        }
      }
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
        {/* Placeholder div: we replaced this node with Quill's DOM during init */}
        <div ref={editorRef} className="min-h-30 min-w-125 px-2" />
      </div>
       {error && <p className={` text-red-500  text-xs mt-1`}>{error}</p>}
    </div>
  );
};

export default QuillEditor;
