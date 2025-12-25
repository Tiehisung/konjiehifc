"use client";

import { icons } from "@/assets/icons/icons";
import { Button } from "@/components/buttons/Button";
import { DIALOG } from "@/components/Dialog";
import { IconInputWithLabel, TextArea } from "@/components/input/Inputs";
import { useAction } from "@/hooks/action";
import { IFolder } from "@/types/doc";
import { useState } from "react";

export function FolderForm({ existingFolder }: { existingFolder?: IFolder }) {
  const [nameError, setNameError] = useState("");
  const [name, setFolderName] = useState(existingFolder?.name || "");
  const [tags, setTags] = useState(existingFolder?.tags || []);
  const [description, setDescription] = useState(
    existingFolder?.description || ""
  );

  const { handleAction, isLoading, error: respError } = useAction();
  return (
    <DIALOG
      title={
        <p className="text-2xl font-semibold uppercase text-center">
          {existingFolder
            ? `Update ${existingFolder?.name}`
            : "Create New Folder"}
        </p>
      }
      trigger={
        existingFolder ? (
          "Edit Folder"
        ) : (
          <Button
            variant="outline"
            className="p-2 select-auto h-24 w-24 text-2xl"
            size="lg"
          >
            {<icons.new size={32} />}
          </Button>
        )
      }
    >
      <div className="sm:max-w-lg space-y-8 pt-6">
        <IconInputWithLabel
          label="New Folder Name"
          error={nameError}
          onChange={(e) => {
            setFolderName(e.target.value);
            if (e.target.value.trim()) setNameError("");
          }}
          name="name"
          value={name}
        />
        <IconInputWithLabel
          label="Description"
          onChange={(e) => setDescription(e.target.value)}
          name="description"
          value={description}
        />

        <TextArea
          label="Tags (semi-colon separated)"
          onChange={(e) =>
            setTags(e.target.value.split(";").map((tag) => tag.trim()))
          }
          name="tags"
          value={tags.join("; ")}
        />

        <Button
          onClick={() => {
            if (!name?.trim()) {
              setNameError("Folder name is required");
              return;
            }
            handleAction({
              method: existingFolder ? "PUT" : "POST",
              uri: `/docs/folders${
                existingFolder ? `/${existingFolder._id}` : ""
              }`,
              body: { name, description, tags },
            }).then(() => {
              if (!existingFolder) {
                setFolderName("");
                setDescription("");
                setTags([]);
              }
            });
          }}
          primaryText={existingFolder ? "Update Folder" : "Create Folder"}
          waiting={isLoading}
          waitingText={existingFolder ? "Updating..." : "Creating ..."}
          className="w-full"
        />

        {respError && <p className="text-red-500 mt-2">{respError}</p>}
      </div>
    </DIALOG>
  );
}
