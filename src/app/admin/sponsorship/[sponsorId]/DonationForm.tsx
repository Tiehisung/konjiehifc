"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiConfig } from "@/lib/configs";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib";
import { Button } from "@/components/buttons/Button";
import { ISponsorProps } from "@/app/sponsorship/page";
import {
  DateTimeInput,
  IconInputWithLabel,
  TextArea,
} from "@/components/input/Inputs";
import CloudinaryUploader, {
  ICldFileUploadResult,
} from "@/components/cloudinary/FileUploadWidget";
import { CgAttachment } from "react-icons/cg";

const initialForm = {
  item: "",
  date: "",
  value: "",
  description: "",
  files: [],
};

export default function DonationForm({
  sponsor,
}: {
  sponsor?: ISponsorProps;
}) {
 
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);
  const [clearFiles, setClearFiles] = useState(0);
  const [formData, setFormData] = useState<{
    item: string;
    date: string;
    value: string;
    description: string;
    files: ICldFileUploadResult[];
  }>(initialForm);

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //   Submit to donate

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setWaiting(true);

      //Proceed Without logo
      const response = await fetch(
        `${apiConfig.sponsors}/${sponsor?._id}/donations`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
          cache: "no-store",
        }
      );

      const results = await response.json();
      if (results.success) toast.success(results.message);
      else toast.error(results.message);

      if (results.success) {
        setFormData(initialForm);
        setClearFiles((p) => p + 1);
      }
    } catch (error) {
      toast.error(getErrorMessage(error, "Error saving donation"));
    } finally {
      setWaiting(false);
      router.refresh();
    }
  };
  return (
    <div  >
      <h1 className=" _title">Support the club</h1>
      <form
        onSubmit={handleSubmit}
        className=" relative flex flex-col gap-8 pt-8 justify-center items-center min-w-60 _card"
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
        <TextArea
          onChange={handleOnChange}
          value={formData.description}
          label="Comment"
          name="description"
          type="number"
        />

        <DateTimeInput
          onChange={handleOnChange}
          value={formData.date}
          name="date"
          type="date"
          label="Date received"
          className=""
          wrapperStyles=" w-full"
        />

        <div className="relative w-full border p-4">
          <p className="_label mb-2">Attach files of items(Optional)</p>

          <CloudinaryUploader
            triggerId={""}
            setUploadedFiles={(fs) => setFormData({ ...formData, files: fs })}
            successMessage="Files uploaded"
            maxFiles={10}
            className="hover:bg-accent p-1.5 rounded-md flex text-xs items-center font-light ml-auto _secondaryBtn"
            trigger={
              <>
                <CgAttachment size={24} /> Attach Media
              </>
            }
            folder={`donations/${sponsor?.name}`}
            wrapperStyles="justify-start"
            clearTrigger={clearFiles}
          />
        </div>

        <br />
        <hr />
        {formData.item && formData.date && (
          <Button
            type="submit"
            primaryText="Save"
            className={
              "_primaryBtn px-4 py-2 rounded shadow grow justify-center w-full"
            }
            waiting={waiting}
            disabled={waiting}
            waitingText={"Submitting..."}
          />
        )}
      </form>

      <br />

       
    </div>
  );
}
 