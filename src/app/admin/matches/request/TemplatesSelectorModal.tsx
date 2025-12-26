"use client";

import { IMatchProps } from "@/app/matches/(fixturesAndResults)";
import { generateMatchRequestTemplates } from "./_templates";
import { IManager } from "../../managers/page";
import TemplateCard from "./TemplateCard";
import { useUpdateSearchParams } from "@/hooks/params";
import { fireEscape } from "@/hooks/Esc";
interface IProps {
  match: IMatchProps;
  official: { requester: IManager };
}
export function TemplatesSelector({ match, official }: IProps) {
  const allTemplates = generateMatchRequestTemplates(match, official);
  const { setParam } = useUpdateSearchParams();
  return (
    <div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {allTemplates.map((template) => (
          <TemplateCard
            key={template?.id}
            template={template}
            onClick={() => {
              setParam("templateId", template?.id);
              fireEscape();
            }}
          />
        ))}
      </div>
    </div>
  );
}
