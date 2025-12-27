"use client";

import { IMatchProps } from "@/app/matches/(fixturesAndResults)";
import { ETemplateTag, generateMatchRequestTemplates } from "./_templates";
import { IManager } from "../../managers/page";
import TemplateCard from "./TemplateCard";
import { useUpdateSearchParams } from "@/hooks/params";
import { fireEscape } from "@/hooks/Esc";
import { SideDrawer } from "@/components/ShadSideDrawer";
import { useMemo, useState } from "react";
import { enumToOptions } from "@/lib/select";
import { Button } from "@/components/buttons/Button";
interface IProps {
  match: IMatchProps;
  official: { requester: IManager };
  searchString?: string;
  modal?: string;
}
export function TemplatesSelector({ match, official, modal }: IProps) {
  const allTemplates = generateMatchRequestTemplates(match, official);
  const { setParam } = useUpdateSearchParams();
  const [tag, setTag] = useState("");

  const filteredTemplates = useMemo(() => {
    if (tag) return allTemplates?.filter((t) => t.tag == tag);
    else return allTemplates;
  }, [allTemplates, tag]);

  if (modal)
    return (
      <SideDrawer
        trigger="Choose Template"
        className="p-[2vw]"
        header={
          <div className="flex items-center gap-1.5 overflow-auto _hideScrollbar p-1">
            {enumToOptions(ETemplateTag)?.map((tg) => (
              <Button
                key={tg?.label}
                primaryText={tg?.label}
                onClick={() => {
                  setTag(tg?.value);
                }}
              />
            ))}
          </div>
        }
        side="bottom"
        roundedTop
      >
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTemplates?.map((template) => (
            <TemplateCard
              key={template?.id}
              template={template}
              onClick={() => {
                setParam("templateId", template?.id);
                fireEscape();
              }}
              className="border"
            />
          ))}
        </div>
      </SideDrawer>
    );

  return (
    <div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTemplates?.map((template) => (
          <TemplateCard
            key={template?.id}
            template={template}
            onClick={() => {
              setParam("templateId", template?.id);
              fireEscape();
            }}
            className="border"
          />
        ))}
      </div>
    </div>
  );
}
