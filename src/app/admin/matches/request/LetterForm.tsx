"use client";

import QuillEditor from "@/components/editor/Quill";
import { useEffect, useState } from "react";
import { generateMatchRequestTemplates, ITemplate } from "./_templates";
import useGetParam from "@/hooks/params";
import { IMatchProps } from "@/app/matches/(fixturesAndResults)";
import { IManager } from "../../managers/page";
interface IProps {
  match: IMatchProps;
  official: { requester: IManager };
}
export function MatchRequestForm({ match, official }: IProps) {
  const [letterForm, setLetterForm] = useState({
    body: "",
    title: "",
  });
  const templateId = useGetParam("templateId");

  useEffect(() => {
    if (templateId) {
      const template = generateMatchRequestTemplates(match, official)?.find(
        (t) => t?.id == templateId
      );
      if (template) setLetterForm({ ...template });
    }
  }, [templateId]);
  return (
    <div>
      <h1 className="_title">Write Request Letter</h1>
      <QuillEditor
        value={letterForm.body || ""}
        onChange={(text) => {
          setLetterForm((p) => ({ ...p, body: text }));
        }}
        className="w-full"
        placeholder="Type request letter here..."
      />
    </div>
  );
}
