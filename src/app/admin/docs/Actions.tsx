"use client";

import { ConfirmActionButton } from "@/components/buttons/ConfirmAction";
import { PrimaryDropdown } from "@/components/Dropdown";
import { apiConfig } from "@/lib/configs";
import { Edit } from "lucide-react";
import { MdOutlineDelete } from "react-icons/md";
import { Button } from "@/components/buttons/Button";
import { DIALOG } from "@/components/Dialog";
import { FolderForm } from "./FolderForm";
import { IFolder } from "@/types/doc";

interface IProps {
  folder?: IFolder;
}

export function FolderActions({ folder }: IProps) {
  const className = `flex items-center gap-2 grow _hover _shrink p-2 text-sm`;

  return (
    <PrimaryDropdown id={folder?._id}>
      <ul>
        <li>
          <DIALOG
            trigger={
              <Button
                variant={"ghost"}
                className={`_shrink w-full justify-start rounded-none ${className}`}
              >
                <Edit className="text-muted-foreground" /> Edit
              </Button>
            }
            title={<p>Edit folder - {folder?.name}</p>}
          >
            <FolderForm existingFolder={folder} />
          </DIALOG>
        </li>

        <li>
          <ConfirmActionButton
            primaryText="Delete"
            trigger={
              <div className={`${className} `}>
                <MdOutlineDelete size={24} /> Delete
              </div>
            }
            uri={`${apiConfig.docs}/folders/${folder?._id}`}
            body={{}}
            method={"DELETE"}
            escapeOnEnd
            variant="destructive"
            title="Delete Folder"
            confirmText={`Are you sure you want to delete ${folder?.name}?`}
          />
        </li>
      </ul>
    </PrimaryDropdown>
  );
}
