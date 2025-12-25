"use client";

import { ConfirmActionButton } from "@/components/buttons/ConfirmAction";
import { PrimaryDropdown } from "@/components/Dropdown";
import { apiConfig } from "@/lib/configs";
import { IUser } from "@/types/user";
import { Edit } from "lucide-react";
import { MdOutlineDelete } from "react-icons/md";
import UserForm from "./UserForm";
import { Button } from "@/components/buttons/Button";
import { DIALOG } from "@/components/Dialog";

interface IProps {
  user?: IUser;
}

export function UserActions({ user }: IProps) {
  const className = `flex items-center gap-2 grow _hover _shrink p-2 text-sm`;

  return (
    <PrimaryDropdown id={user?._id}>
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
            title={<p>Edit User - {user?.name}</p>}
          >
            <UserForm user={user} />
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
            uri={`${apiConfig.users}/${user?._id}`}
            body={{}}
            method={"DELETE"}
            escapeOnEnd
            variant="destructive"
            title="Delete Document"
            confirmText={`Are you sure you want to delete ${user?.name}?`}
          />
        </li>
      </ul>
    </PrimaryDropdown>
  );
}
