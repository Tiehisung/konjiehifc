"use client";

import { useState } from "react";
import { IMatchProps } from "@/app/matches/(fixturesAndResults)";
import { IManager } from "@/app/admin/managers/page";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { friendlyTemplates } from "./_templates/friendly";

interface TemplateSelectorProps {
  match?: IMatchProps;
  official: { requester: IManager };
}

  const TemplateSelector = ({
  match,
  official,
}: TemplateSelectorProps) => {
  const templates = friendlyTemplates(match as IMatchProps, official); // Replace with dynamic tag if needed
  const [selectedTemplateId, setSelectedTemplateId] = useState<
    string | undefined
  >(undefined);

  const selectedTemplate = templates.find((t) => t.id === selectedTemplateId);

  return (
    <div className="space-y-4 p-4 border rounded-lg shadow-sm bg-white">
      <Label htmlFor="template-select">Select a Template</Label>
      <Select value={selectedTemplateId} onValueChange={setSelectedTemplateId}>
        <SelectTrigger>
          <SelectValue placeholder="Choose a template..." />
        </SelectTrigger>
        <SelectContent>
          {templates.map((t) => (
            <SelectItem key={t.id} value={t.id}>
              {t.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedTemplate && (
        <div className="p-4 border rounded-md bg-gray-50">
          <h3 className="font-semibold mb-2">{selectedTemplate.title}</h3>
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: selectedTemplate.body }}
          />
          <Button className="mt-4" variant="default">
            Use this Template
          </Button>
        </div>
      )}
    </div>
  );
};
