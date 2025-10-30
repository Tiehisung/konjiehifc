"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcCamera } from "react-icons/fc";
import { apiConfig } from "@/lib/configs";
import { toast } from "sonner";
import { getErrorMessage, getFilePath } from "@/lib";
import { Button } from "@/components/buttons/Button";
import { IFileProps, IFileUpload, IResultProps } from "@/types";
import { ISponsorProps } from "@/app/sponsorship/page";
import { DateTimeInput, IconInputWithLabel } from "@/components/input/Inputs";
// import RichTextEditor from "@/components/editor/RichTextEditor";

const initialForm = {
  item: "",
  date: "",
  value: "",
  description: "",
  files: [],
};
export default function DonateToSponsor({
  sponsor,
}: {
  sponsor: ISponsorProps;
}) {
  console.log({ sponsor });
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);
  const [formData, setFormData] = useState(initialForm);

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [attachedFiles, setAttachedFiles] = useState<IFileUpload[]>([]);
  async function handleImageSelection(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const selectedFiles = event.target.files;

    if (!selectedFiles || selectedFiles.length == 0) return;
    for (const file of Array.from(selectedFiles)) {
      if (file.size > 1024000) {
        toast.error(file.size + " is too large. Picture should not exceed 1mb");
        return;
      }
      const path = await getFilePath(file);
      setAttachedFiles((prev) => [
        ...prev,
        {
          name: file.name,
          path: path,
          type: "image",
          folder: "sponsors/donations/" + sponsor.businessName,
        },
      ]);
    }
  }

  //   Submit to donate

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setWaiting(true);

      //Upload attachment
      const uploadedFiles: IFileProps[] = [];
      if (attachedFiles.length > 0) {
        for (const file of attachedFiles) {
          const uploadsResponse = await fetch(apiConfig.fileUpload, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: file.name,
              type: file.type,
              path: file.path,
              folder: file.folder,
            } as IFileUpload),
          });
          const uploaded: IResultProps<IFileProps> =
            await uploadsResponse.json();
          if (!uploaded.success) {
            setWaiting(false);
            toast(uploaded.message, { position: "bottom-center" });
            return;
          }
          uploadedFiles.push(uploaded?.data as IFileProps);
        }

        //Proceed to database
        const response = await fetch(
          `${apiConfig.sponsors}/${sponsor._id}/donations`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...formData,
              files: uploadedFiles.map((uf) => uf._id), //files
            }),
            cache: "no-cache",
          }
        );
        const donationResult: IResultProps = await response.json();
        // console.log(donationResult);

        setWaiting(false);

        if (donationResult.success) {
          setFormData(initialForm);
          setAttachedFiles([]);
          toast.success(donationResult.message);
        }
        router.refresh();
        return;
      }

      //Proceed Without logo
      const response = await fetch(`${apiConfig.sponsors}/donations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        cache: "no-store",
      });
      
      const results = await response.json();
      if (results.success) toast.success(results.message);
      else toast.error(results.message);

      if (results.success) {
        setFormData(initialForm);
        setAttachedFiles([]);
      }
    } catch (error) {
      toast.error(getErrorMessage(error, "Error saving donation"));
    } finally {
      setWaiting(false);
      router.refresh();
    }
  };
  return (
    <div id="support">
      <h1 className=" _title">Support the club</h1>
      <form
        onSubmit={handleSubmit}
        className="_secondaryBg p-5  relative flex flex-col gap-8 pt-8 justify-center items-center"
      >
        <IconInputWithLabel
          onChange={handleOnChange}
          value={formData.item}
          label="Item(s)"
          name="item"
          required
        />
        <IconInputWithLabel
          onChange={handleOnChange}
          value={formData.value}
          label="Est. value(GHS)"
          name="value"
          type="number"
        />

        <div className="block w-full">
          <p className="_label">Date received</p>
          <DateTimeInput
            onChange={handleOnChange}
            value={formData.date}
            name="date"
            type="date"
          />
        </div>

        {/* <RichTextEditor
          onChange={(dsc) => setFormData((p) => ({ ...p, description: dsc }))}
          value={formData.description}
          label="Description"
          wrapperStyles=" dark:bg-white p-3"
        /> */}

        <div className="relative">
          <p className="">Attach files of items(Optional)</p>

          <label
            htmlFor="file"
            className="flex items-center shadow w-fit p-1 rounded mt-3 cursor-pointer"
            title="Choose file"
          >
            <FcCamera size={30} /> Choose file
            <input
              id="file"
              hidden
              type="file"
              multiple
              onChange={handleImageSelection}
              name="image"
              className=""
            />
          </label>
        </div>

        <div className="flex gap-2 max-w-sm flex-wrap justify-center">
          {attachedFiles
            ? attachedFiles.map((file, index) => (
                <Image
                  src={file.path}
                  width={300}
                  height={300}
                  alt="desc image"
                  className="h-36 w-36 rounded shadow"
                  key={index}
                />
              ))
            : "No files added"}
        </div>

        <br />
        <hr />
        <Button
          type="submit"
          primaryText="Submit"
          className={"_primaryBtn px-4 py-2 rounded shadow"}
          waiting={waiting}
          disabled={waiting}
          waitingText={"Submitting..."}
        />
      </form>
    </div>
  );
}
