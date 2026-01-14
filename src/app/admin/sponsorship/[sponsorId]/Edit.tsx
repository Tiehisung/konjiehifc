"use client";

import { ISponsorProps } from "@/app/sponsorship/page";
import { Button } from "@/components/buttons/Button";
import ImageUploaderCldWidget from "@/components/cloudinary/AvatarUploadWidget";
import { IconInputWithLabel } from "@/components/input/Inputs";
import BottomSheetLite from "@/components/modals/BottomSheetLite";
import ContentShowcaseWrapper from "@/components/ShowcaseWrapper";
import { getErrorMessage } from "@/lib";
import { apiConfig } from "@/lib/configs";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function EditSponsor({ sponsor }: { sponsor?: ISponsorProps }) {
  const router = useRouter();
  const [formData, setFormData] = useState({ ...initialForm });
  const [waiting, setWaiting] = useState(false);

  const OnChangeSponsor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWaiting(true);
    try {
      const response = await fetch(apiConfig.sponsors, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        cache: "no-store",
      });
      const results = await response.json();
      setWaiting(false);
      if (results.success) {
        setFormData(initialForm);
        toast.success(results.message);
      } else toast.error(results.message);
      router.refresh();
    } catch (error) {
      toast.error(getErrorMessage(error, "Add sponsor failed"));
    } finally {
      router.refresh();
      setWaiting(false);
    }
  };

  return (
    <BottomSheetLite
      trigger={
        <>
          <Edit /> Edit sponsor
        </>
      }
      triggerStyles="_primaryBtn justify-center "
      id={"edit-sponsor"}
    >
      <ContentShowcaseWrapper
        images={
          sponsor?.donations
            ?.slice(0, 3)
            ?.map((d) => d.files)
            ?.flat(1)
            ?.filter((f) => f.resource_type == "image")
            ?.map((f) => f.secure_url) ?? []
        }
        graphicsStyles=" "
      >
        <form onSubmit={handleSubmit} className="grid gap-6 pt-4 _card grow ">
          <div className=" flex gap-2 justify-center flex-col items-center relative">
            <ImageUploaderCldWidget
              
              onUploaded={(file) =>
                setFormData({ ...formData, logo: file?.secure_url as string })
              }
            />
          </div>

          <IconInputWithLabel
            onChange={OnChangeSponsor}
            value={formData.name}
            name="name"
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

          <Button
            type="submit"
            waiting={waiting}
            disabled={waiting}
            waitingText={"Saving sponsor..."}
            primaryText={"Save"}
            className="_primaryBtn w-full py-1 my-3 px-10 mx-auto justify-center text-lg md:text-xl"
          />
        </form>
      </ContentShowcaseWrapper>
    </BottomSheetLite>
  );
}

const initialForm = {
  name: "",
  phone: "",
  logo: "",
  businessName: "",
  businessDescription: "",
};
