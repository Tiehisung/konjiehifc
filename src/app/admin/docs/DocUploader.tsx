"use client";

import { ICldFileUploadResult } from "@/components/cloudinary/FileUploadWidget";
import FileUploader from "@/components/cloudinary/SimpleFileUploader";
import { PrimaryCollapsible } from "@/components/Collapsible";
import { DIALOG } from "@/components/Dialog";
import { apiConfig } from "@/lib/configs";
import { Upload } from "lucide-react";
import { FormEvent, ReactNode, useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import { useRouter } from "next/navigation";
import MultiSelectionInput from "@/components/select/MultiSelect";
import { IQueryResponse, ISelectOptionLV } from "@/types";
import { FancyMotion } from "@/components/Animate/MotionWrapper";
import { COMBOBOX } from "@/components/ComboBox";
import { PiFolderPlusLight } from "react-icons/pi";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib";
import { Button } from "@/components/buttons/Button";
import { fireDoubleEscape } from "@/hooks/Esc";
import { useFetch } from "@/hooks/fetch";
import { Separator } from "@/components/ui/separator";

interface IProps {
  defaultFolder?: string;
  tagsData?: {
    name: string;
    options: ISelectOptionLV[];
  }[];
  trigger?: ReactNode;
  className?: string;
  folders?: { name: string; _id: string }[];
}

export function DocumentUploader({
  defaultFolder = "",
  tagsData = [],
  trigger,
  className,
}: IProps) {
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<ICldFileUploadResult | null>(
    null
  );

  const [tags, setTags] = useState<Record<string, string[]> | object>({});

  const [selectedFolder, setSelectedFolder] = useState(defaultFolder);

  const { loading: fetchingFolders, results: folderMetrics } = useFetch<{
    folders: { name: string; _id: string }[];
  }>({
    uri: `${apiConfig.docs}/metrics`,
  });

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
        }),
        headers: { "content-type": "application/json" },
      });

      const result: IQueryResponse = await response.json();
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
        <>
          <Upload size={24} /> Upload Document
        </>
      }
      triggerStyles="justify-start"
      className="min-w-57.5"
      title="Upload Document"
      variant={"outline"}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 items-center justify-center _card rounded-xl mx-auto"
      >
        <div className="flex flex-col gap-4 items-center justify-center grow w-full pb-3">
          <FileUploader
            hidePreview
            trigger={
              <div className="_secondaryBtn grow w-full ">Choose Document</div>
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
              <p className="line-clamp-2 wrap-break-word">
                {uploadedFile?.name ?? uploadedFile?.original_filename}
              </p>
            </div>
          )}
        </div>

        <Separator />

        {tagsData?.map((tagGroup, tIndex) => {
          return (
            <PrimaryCollapsible
              header={{
                label: tagGroup?.name,
                className: "_label",
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
                className="text-sm "
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
              options={
                folderMetrics?.data?.folders?.map((f) => ({
                  label: f?.name,
                  value: f?.name,
                })) ?? []
              }
              onChange={(op) => setSelectedFolder(op.value)}
              placeholder="Select Folder"
              className="capitalize"
              defaultOptionValue={defaultFolder}
              isLoading={fetchingFolders}
            />
          </div>
        )}
        <br />
        <FancyMotion direction="left" preset="fade" className=" w-full">
          <Button
            type="submit"
            primaryText="Save Form"
            waitingText="Saving..."
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
