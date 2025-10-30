"use client";

import { apiConfig } from "@/lib/configs";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";
import { ISponsorProps } from "@/app/sponsorship/page";
import { IResultProps } from "@/types";
import { Button } from "@/components/buttons/Button";
import { Title } from "@/components/Elements";
import { IconInputWithLabel } from "@/components/input/Inputs";
import AvatarPicker from "@/components/files/Avatar";

export default function EditSponsor({ sponsor }: { sponsor: ISponsorProps }) {
  const router = useRouter();
  const [formData, setFormData] = useState(sponsor);
  const [imageFile, setImageFile] = useState<string | null>(null);

  const [waiting, setWaiting] = useState(false);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //Handle submit

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWaiting(true);

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
          presetType: "authenticated",
        }),
      });
      const uploadRsp: IResultProps = await upload.json();
      if (!uploadRsp.success) {
        setWaiting(false);
        toast(uploadRsp.message, { position: "bottom-center" });
        return;
      }

      //Proceed to database
      const response = await fetch(apiConfig.sponsors, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, logo: uploadRsp.data }),
        cache: "no-cache",
      });
      const results: IResultProps = await response.json();
      toast.success(results.message, {
        position: "bottom-center",
      });
      setWaiting(false);
      if (results.success) {
        setImageFile(null);
      }
      router.refresh();
      return;
    }

    //Proceed Without logo
    const response = await fetch(apiConfig.sponsors, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      cache: "no-store",
    });

    const results: IResultProps = await response.json();

    setWaiting(false);
    if (results.success) {
      setFormData(sponsor);
      setImageFile(null);
      toast.success(results.message);
    } else toast.error(results.message);

    router.refresh();
  };
  return (
    <div id="edit-sponsor">
      <Title className="_title text-center ">Edit sponsor</Title>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-10 justify-center items-center p-2 _secondaryBg border _borderColor"
      >
        <AvatarPicker
          inputId={sponsor?._id}
          setImageUrl={setImageFile}
          imageUrl={formData?.logo?.secure_url}
          inputLabel="Change logo"
          title="Logo"
        />

        <IconInputWithLabel
          onChange={handleOnChange}
          value={formData?.ownerName}
          name="ownerName"
          label="Owner name"
        />
        <IconInputWithLabel
          onChange={handleOnChange}
          value={formData?.businessName}
          label="Business name"
          name="businessName"
          required
        />
        <IconInputWithLabel
          onChange={handleOnChange}
          value={formData?.businessDescription}
          label="Business description"
          name="businessDescription"
        />
        <IconInputWithLabel
          onChange={handleOnChange}
          value={formData?.phone}
          label="Phone"
          name="phone"
          type="tel"
        />

        <Button
          type="submit"
          primaryText="Save changes"
          className={"_primaryBtn px-4 py-2 rounded shadow"}
          waiting={waiting}
          disabled={waiting}
          waitingText={"Saving changes..."}
        />
      </form>
    </div>
  );
}
