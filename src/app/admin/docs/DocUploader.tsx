"use client";

import { ICldFileUploadResult } from "@/components/cloudinary/FileUploadWidget";
import FileUploader from "@/components/cloudinary/SimpleFileUploader";
import { PrimaryCollapsible } from "@/components/Collapsible";
import { DIALOG } from "@/components/Dialog";
import { apiConfig } from "@/lib/configs";
import { Upload } from "lucide-react";
import { FormEvent, ReactNode, useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import { DocumentFolder, IPostDoc } from "./page";
import { useRouter } from "next/navigation";
import MultiSelectionInput from "@/components/select/MultiSelect";
import { IQueryResponse, ISelectOptionLV } from "@/types";
import { FancyMotion } from "@/components/Animate/MotionWrapper";
import { COMBOBOX } from "@/components/ComboBox";
import { PiFolderPlusLight } from "react-icons/pi";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib";
import { useSession } from "next-auth/react";
import { IUser } from "@/types/user";
import { Button } from "@/components/buttons/Button";
import { fireDoubleEscape } from "@/hooks/Esc";

export function DocumentUploader({
  defaultFolder = "",
  tagsData = [],
  trigger,
  className,
}: {
  defaultFolder?: string;
  tagsData?: { name: string; options: ISelectOptionLV[] }[];
  trigger?: ReactNode;
  className?: string;
}) {
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<ICldFileUploadResult | null>(
    null
  );

  const [tags, setTags] = useState<Record<string, string[]> | {}>({});

  const [selectedFolder, setSelectedFolder] = useState(defaultFolder);

  useEffect(()=>{
    if(defaultFolder)setSelectedFolder(defaultFolder)
  },[defaultFolder])
  const session = useSession();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setWaiting(true);
      const response = await fetch(apiConfig.docs, {
        method: "POST",
        body: JSON.stringify({
          file: uploadedFile,
          tags: Object.values(tags).flat(1).filter(Boolean),
          format: "pdf",
          folder: selectedFolder,
          user: session?.data?.user,
        } as IPostDoc & { user: IUser }),
        headers: { "content-type": "application/json" },
      });

      const result: IQueryResponse = await response.json();
      console.log(result);
      if (result.success) {
        setUploadedFile(null);
        toast.success(result.message);
        router.refresh();
        fireDoubleEscape();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setWaiting(false);
    }
  };

  return (
    <DIALOG
      trigger={
        trigger ?? (
          <div
            title="Upload Document"
            className={`_hover p-1.5 rounded _shrink _secondaryBtn ${className}`}
          >
            <Upload size={24} /> Upload Document
          </div>
        )
      }
      className="min-w-[230px]"
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 items-center justify-center _card rounded-xl max-w-xs mx-auto"
      >
        <div className="flex flex-col gap-4 items-center justify-center border-b grow w-full pb-3">
          <FileUploader
            hidePreview
            trigger={
              <span className="_secondaryBtn grow w-full ">
                Choose Document
              </span>
            }
            name="consentForm"
            accept="pdf"
            exportFileData={(file) => {
              setUploadedFile(file);
            }}
            maxSize={10524000}
          />

          {uploadedFile && (
            <div className="flex flex-col justify-center items-center">
              <FaFilePdf className="text-Red" size={40} />
              <p className="line-clamp-2 break-words">
                {uploadedFile?.name ?? uploadedFile?.original_filename}
              </p>
            </div>
          )}
        </div>

        {tagsData?.map((tagGroup, tIndex) => {
          return (
            <PrimaryCollapsible
              header={{
                label: <p className="_label mb-4">{tagGroup?.name}</p>,
              }}
              key={tIndex}
            >
              <MultiSelectionInput
                onChange={(ts) => {
                  setTags((prev) => ({
                    ...prev,
                    [tagGroup.name]: ts.map((t) => t.value),
                  }));
                }}
                options={tagGroup?.options}
                className="text-sm text-foreground"
                label={tagGroup?.name}
                name={tagGroup?.name}
              />
            </PrimaryCollapsible>
          );
        })}

        {!defaultFolder && (
          <div className="flex items-center gap-2">
            <PiFolderPlusLight
              className="text-primary dark:text-Orange"
              size={30}
            />
            <COMBOBOX
              options={Object.values(DocumentFolder).map((f) => ({
                label: f,
                value: f,
              }))}
              onChange={(op) => setSelectedFolder(op.value)}
              placeholder="Select Folder"
              className="capitalize"
              defaultOptionValue={defaultFolder}
            />
          </div>
        )}
        <br />
        <FancyMotion direction="left" preset="fade" className=" w-full">
          <Button
            type="submit"
            primaryText="Save Form"
            waitingText="Saving..."
            variant="primary"
            className="w-full justify-center max-w-md mx-auto py-3"
            disabled={!uploadedFile || !selectedFolder}
            waiting={waiting}
          />
        </FancyMotion>
      </form>
    </DIALOG>
  );
}

// const _tagsData = [
//   {
//     name: "Category",
//     options: [
//       { label: "Electronics", value: "electronics" },
//       { label: "Clothing", value: "clothing" },
//       { label: "Books", value: "books" },
//       { label: "Home & Garden", value: "home-garden" },
//     ],
//   },
//   {
//     name: "Price Range",
//     options: [
//       { label: "Under $25", value: "0-25" },
//       { label: "$25 - $50", value: "25-50" },
//       { label: "$50 - $100", value: "50-100" },
//       { label: "Over $100", value: "100-plus" },
//     ],
//   },
//   {
//     name: "Brand",
//     options: [
//       { label: "Apple", value: "apple" },
//       { label: "Samsung", value: "samsung" },
//       { label: "Nike", value: "nike" },
//       { label: "Sony", value: "sony" },
//     ],
//   },
//   {
//     name: "Rating",
//     options: [
//       { label: "⭐️⭐️⭐️⭐️⭐️", value: "5" },
//       { label: "⭐️⭐️⭐️⭐️ & up", value: "4" },
//       { label: "⭐️⭐️⭐️ & up", value: "3" },
//       { label: "⭐️⭐️ & up", value: "2" },
//     ],
//   },
//   {
//     name: "Availability",
//     options: [
//       { label: "In Stock", value: "in-stock" },
//       { label: "Pre-order", value: "pre-order" },
//       { label: "Out of Stock", value: "out-of-stock" },
//     ],
//   },
// ];
