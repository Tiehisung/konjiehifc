"use client";

import QuillEditor from "@/components/editor/Quill";
import { useEffect, useState } from "react";
import { generateMatchRequestTemplates } from "./_templates";
import useGetParam from "@/hooks/params";
import { IMatchProps } from "@/app/matches/(fixturesAndResults)";
import { IManager } from "../../managers/page";
import { TemplatesSelector } from "./TemplatesSelectorModal";
import { POPOVER } from "@/components/ui/popover";
import { ActionButton } from "@/components/buttons/ActionButton";
import { Button } from "@/components/buttons/Button";
import { printMatchRequestLetter } from "./Print";

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
      <header className="flex items-center justify-between gap-4">
        <h1 className="_title">Write Request Letter</h1>
        <TemplatesSelector
          match={match}
          official={official}
          modal
          modalVariant={"outline"}
        />
      </header>
      <QuillEditor
        value={letterForm.body || ""}
        onChange={(text) => {
          setLetterForm((p) => ({ ...p, body: text }));
        }}
        className="w-full "
        placeholder="Type request letter here..."
      />
      <br />
      <POPOVER
        trigger={<span className="_primaryBtn justify-center">Share</span>}
        align="start"
      >
        <Button
          primaryText="Print"
          waitingText="Generating..."
          className="grow w-full justify-start font-normal"
          variant={"ghost"}
          onClick={() => printMatchRequestLetter(letterForm, match, official)}
        />
        <ActionButton
          primaryText="Save"
          loadingText="Saving..."
          method="POST"
          className="grow w-full justify-start font-normal"
          variant={"ghost"}
        />
        <ActionButton
          primaryText="Save & Share"
          loadingText="Saving..."
          method="POST"
          className="grow w-full justify-start font-normal"
          variant={"ghost"}
        />
        <ActionButton
          primaryText="Download"
          loadingText="Saving..."
          method="POST"
          className="grow w-full justify-start font-normal"
          variant={"ghost"}
        />
      </POPOVER>
    </div>
  );
}
