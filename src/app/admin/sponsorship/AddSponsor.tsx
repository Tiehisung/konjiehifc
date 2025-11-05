"use client";

import { ISponsorProps } from "@/app/sponsorship/page";
import { staticImages } from "@/assets/images";
import DiveUpwards from "@/components/Animate";
import { Button } from "@/components/buttons/Button";

import { IconInputWithLabel } from "@/components/input/Inputs";
import FlowInPopper from "@/components/modals/FlowIn";
import { getErrorMessage, getFilePath } from "@/lib";
import { apiConfig } from "@/lib/configs";
import { IFileProps, IResultProps } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FcCamera } from "react-icons/fc";
import { IoAdd } from "react-icons/io5";
import { toast } from "sonner";

export function AddNewSponsor({ sponsors }: { sponsors?: ISponsorProps[] }) {
  const router = useRouter();
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [formData, setFormData] = useState({ ...dataModel });
  const [waiting, setWaiting] = useState(false);
  const [error, setError] = useState("");

  const OnChangeSponsor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  //Handle change image
  async function handleImageSelection(
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;
    if (selectedFile.size > 3524000) {
      toast.error(
        selectedFile.size + " is too large. Picture should not exceed 3.5mb"
      );
      return;
    }
    setImageFile(await getFilePath(selectedFile));
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWaiting(true);
    try {
      if (imageFile) {
        //Upload logo
        const upload = await fetch(apiConfig.fileUpload, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.businessName,
            path: imageFile,
            type: "image",
            preset: "konjiehifc",
            folder: "sponsors/logos",
          }),
        });
        const uploadRsp: IResultProps<IFileProps> = await upload.json();
        if (!uploadRsp.success) {
          setWaiting(false);
          toast(uploadRsp.message, { position: "bottom-center" });
          return;
        }

     
        //Proceed to database
        const response = await fetch(apiConfig.sponsors, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, logo: uploadRsp?.data?._id }),
          cache: "no-cache",
        });
        const results = await response.json();
        toast(results.message, {
          position: "bottom-center",
        });
        setWaiting(false);
        if (results.success) {
          setFormData(dataModel);
          setImageFile(null);
        }
        return;
      }

      //Proceed Without logo

      const response = await fetch(apiConfig.sponsors, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        cache: "no-store",
      });
      const results = await response.json();
      toast(results.message, );
      setWaiting(false);
      if (results.success) {
        setFormData(dataModel);
        setImageFile(null);
      }
      router.refresh();
    } catch (error) {
      toast.error(getErrorMessage(error, "Add sponsor failed"));
    } finally {
      router.refresh();
      setWaiting(false);
    }
  };

  const checkBusinessExists = (input: string) => {
    const businessNames = sponsors?.map((s) => s.businessName);

    if (
      businessNames?.find(
        (bn) => bn.trim().toLowerCase() == input.trim().toLowerCase()
      )
    ) {
      setError(`${input} already exists`);
      return;
    }
    setError("");
  };

  useEffect(() => {
    checkBusinessExists(formData.businessName);
  }, [formData.businessName]);
  return (
    <FlowInPopper
      trigger={
        <>
          <IoAdd /> New sponsor
        </>
      }
      className="flex items-center gap-2 "
      wrapperStyles="p-5"
    >
      <form onSubmit={handleSubmit} className="grid gap-6 pt-4 ">
        <div className=" flex gap-2 justify-center flex-col items-center relative">
          <p className="_label">Logo</p>
          <Image
            src={imageFile || staticImages.manager}
            width={300}
            height={300}
            alt="desc image"
            className="h-36 w-36 rounded-full"
          />

          <label
            htmlFor="sponsor-logo"
            className="absolute bottom-2 right-10 cursor-pointer"
            title="Choose logo"
          >
            <FcCamera size={30} />
            <input
              id="sponsor-logo"
              hidden
              type="file"
              onChange={handleImageSelection}
              name="image"
              className=""
            />
          </label>
        </div>

        <IconInputWithLabel
          onChange={OnChangeSponsor}
          value={formData.ownerName}
          name="ownerName"
          label="Owner name"
        />
        <IconInputWithLabel
          onChange={OnChangeSponsor}
          value={formData.businessName}
          label="Business name"
          name="businessName"
          required
        />
        <IconInputWithLabel
          onChange={OnChangeSponsor}
          value={formData.businessDescription}
          label="Business description"
          name="businessDescription"
        />
        <IconInputWithLabel
          onChange={OnChangeSponsor}
          value={formData.phone}
          label="Phone"
          name="phone"
          type="tel"
        />

        {error && (
          <DiveUpwards layoutId={error}>
            <p className="text-error text-sm font-light h-6 text-center">
              {error}
            </p>
          </DiveUpwards>
        )}
        <Button
          type="submit"
          waiting={waiting}
          disabled={waiting || (error ? true : false)}
          waitingText={"Saving sponsor..."}
          primaryText={"Submit"}
          className="_primaryBtn py-1 my-3 w-fit px-10 mx-auto"
        />
      </form>
    </FlowInPopper>
  );
}

const dataModel = {
  ownerName: "",
  phone: "",
  logo: "",
  businessName: "",
  businessDescription: "",
};
