"use client";

 
 
import QuillEditor from "@/components/editor/Quill";
import React from "react";

const TestPage = () => {
  return (
    <div className="p-6 pt-16">
      <QuillEditor value={""} onChange={(e) => console.log(e)} placeholder="Type in here..."/>
    </div>
  );
};

export default TestPage;
