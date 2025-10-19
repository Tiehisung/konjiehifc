// "use client";

// import React, { useState } from "react";
// import dynamic from "next/dynamic";
// import "react-quill/dist/quill.snow.css";
// import styles from "./styles.module.css";
// import PrimaryModal from "../modals/Modals";
// import { Title } from "../Elements";

// const ReactQuill = dynamic(() => import("react-quill"), {
//   ssr: false,
// });

// interface RichTextEditorProps {
//   value: string;
//   onChange: (content: string) => void;
//   className?: string;
//   placeholder?: string;
//   label?: string;
//   labelStyles?: string;
//   wrapperStyles?: string;
//   allowPreview?: boolean;
// }

// const RichTextEditor: React.FC<RichTextEditorProps> = ({
//   value,
//   onChange,
//   className,
//   allowPreview = false,
//   label = "Comments",
//   labelStyles = "_label",
//   placeholder = "Write comments here...",
//   wrapperStyles,
// }) => {
//   const [editorValue, setEditorValue] = useState(value);

//   const handleChange = (content: string) => {
//     setEditorValue(content);
//     onChange(content);
//   };
//   const modules = {
//     toolbar: [
//       ["bold", "italic", "underline", "strike", "blockquote"],
//       [{ list: "ordered" }, { list: "bullet" }],
//       [{ align: [] }],
//       [{ color: [] }, { background: [] }],
//       ["link"],
//       ["clean"],
//     ],
//   };

//   const formats = [
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "blockquote",
//     "list",
//     "bullet",
//     "align",
//     "color",
//     "background",
//     "link",
//   ];

//   return (
//     <div className={wrapperStyles}>
//       <p className={labelStyles}>{label}</p>
//       <ReactQuill
//         formats={formats}
//         modules={modules}
//         value={editorValue}
//         onChange={handleChange}
//         className={`focus-within:border-blue-500 border border-transparent rounded ${className}`}
//         placeholder={placeholder}
//       />
//       {allowPreview && <PreviewLessonReqForm editorContent={value} />}
//     </div>
//   );
// };

// export default RichTextEditor;

// export const DisplayEditorContent = ({
//   editorContent,
// }: {
//   editorContent: string;
// }) => {
//   return (
//     <div
//       dangerouslySetInnerHTML={{ __html: editorContent }}
//       className={styles.editor}
//     ></div>
//   );
// };
// // const getEditorImages = (editorValue: string) => {
// //   const parser = new DOMParser();
// //   const doc = parser.parseFromString(editorValue, "text/html");
// //   const images = Array.from(doc.querySelectorAll("img")).map((img) =>
// //     img.getAttribute("src")
// //   );
// //   return images;
// // };

// export const PreviewLessonReqForm = ({
//   editorContent,
// }: {
//   editorContent: string;
// }) => {
//   const [isPreview, setIsPreview] = useState(false);
//   return (
//     <div>
//       <Button
//         primaryText="Preview"
//         handleClickEvent={() => setIsPreview(!isPreview)}
//         className="secBtn"
//       />

//       <PrimaryModal isOpen={isPreview} setIsOpen={setIsPreview}>
//         <div className="_secondaryBg w-[90vw] max-h-[85vh] p-4 rounded-xl py-8 overflow-y-auto">
//           <Title className=" my-3"> Description</Title>
//           <DisplayEditorContent editorContent={editorContent} />
//         </div>
//       </PrimaryModal>
//     </div>
//   );
// };
