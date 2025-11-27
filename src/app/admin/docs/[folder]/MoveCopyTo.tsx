"use client";

import { COMBOBOX } from "@/components/ComboBox";
import { DIALOG } from "@/components/Dialog";
import { IFileProps } from "@/types";
import { Badge } from "@/components/ui/badge";
import { ActionButton } from "@/components/buttons/ActionButton";
import { apiConfig } from "@/lib/configs";
import { IDocMoveCopy } from "@/app/api/docs/move-copy/route";
import { ReactNode, useState } from "react";
import { DocumentFolder } from "../page";

interface IProps {
  document?: IFileProps;
  actionType: "Move" | "Copy";
  trigger: ReactNode;
}
export function DocMoveOrCopyTo({ document, actionType, trigger }: IProps) {
  const [destinationFolder, setDestinationFolder] = useState("");
  return (
    <DIALOG trigger={trigger}>
      <div className="flex flex-col gap-3 justify-center items-center">
        <div>
          {actionType}
          <Badge variant={"secondary"}>
            {document?.name ?? document?.original_filename}
          </Badge>
          to{" "}
        </div>
        <COMBOBOX
          options={Object.values(DocumentFolder).map((f) => ({
            label: f,
            value: f,
          }))}
          onChange={(op) => setDestinationFolder(op.value)}
          className="min-w-60 "
        />

        <ActionButton
          method="PUT"
          body={
            { actionType, file: document, destinationFolder } as IDocMoveCopy
          }
          escapeOnEnd
          uri={apiConfig.moveCopyDoc}
          primaryText={actionType.toUpperCase()}
          className="justify-center min-w-60"
          disabled={!destinationFolder}
        />
      </div>
    </DIALOG>
  );
}
