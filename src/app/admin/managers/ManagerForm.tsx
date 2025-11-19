"use client";

import { apiConfig } from "@/lib/configs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { getErrorMessage } from "@/lib";
import { ISelectOptionLV } from "@/types";
import { DateTimeInput, IconInputWithLabel } from "@/components/input/Inputs";
import Select from "react-select";
import { customStyles } from "@/styles";
import { IManager } from "./page";
import { Button } from "@/components/buttons/Button";
import ImageUploaderCldWidget from "@/components/cloudinary/AvatarUploadWidget";
import { staticImages } from "@/assets/images";
import { PrimarySelect } from "@/components/select/Select";
import { COMBOBOX } from "@/components/ComboBox";

export default function TechnicalManagerForm({
  existingManager,
  availableRoles,
  className,
}: {
  existingManager?: IManager;
  availableRoles: ISelectOptionLV[];
  className?: string;
}) {
  const router = useRouter();
  // Available portfolios

  const [waiting, setWaiting] = useState(false);
  const [formData, setFormData] = useState<Partial<IManager>>(
    existingManager ?? {}
  );

  // consts roles
  const OnchangeManager = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //Handle submit
  const handleCreateNewManager = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      e.preventDefault();
      setWaiting(true);

      //Proceed to save to database
      const apiRoute = existingManager
        ? `${apiConfig.managers}/${existingManager?._id}`
        : apiConfig.managers;
      const response = await fetch(apiRoute, {
        body: JSON.stringify({ ...formData }),
        cache: "no-cache",
        method: existingManager ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
      });
      const results = await response.json();
      setWaiting(false);

      toast.success(results.message);
      if (results.success) {
        setFormData({});
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      router.refresh();
      setWaiting(false);
    }
  };
  return (
    <div
      className={`container mx-auto w-full transition-all duration-300 p-2 `}
    >
      <h1 className="_title text-Green text-center uppercase p-3">
        {existingManager
          ? `${existingManager.fullname} details`
          : "Manager registration"}
      </h1>
      <h2 className="mt-5 mb-2 text-teal-700 text-xl text-center ">
        {existingManager?.role}
      </h2>
      <form
        id="manager-form"
        onSubmit={handleCreateNewManager}
        className={`grid bg-card gap-9 w-full transition-all duration-300 delay-75 ease-in shadow border _borderColor rounded-md p-6 pt-10 text-sm  `}
      >
        <div className="flex flex-col items-center gap-2">
          <ImageUploaderCldWidget
            initialAvatar={existingManager?.avatar ?? staticImages.avatar.src}
            label="Upload"
            onUploaded={(file) =>
              setFormData((prev) => ({
                ...prev,
                avatar: file?.secure_url ?? "",
              }))
            }
            className="flex text-sm items-center gap-2 border"
          />

          {!formData.avatar && (
            <p className="text-red-500 text-xs">Avatar is required</p>
          )}
        </div>

        <section className={`grid gap-8 ${className}`}>
          <IconInputWithLabel
            label="Fullname"
            onChange={OnchangeManager}
            type="text"
            required
            name="fullname"
            value={formData?.fullname}
            className=" px-2 w-52 sm:w-60 rounded font-semibold"
          />

          <IconInputWithLabel
            label="Phone"
            onChange={OnchangeManager}
            type="tel"
            required
            name="phone"
            value={formData?.phone}
            className=" px-2 w-52 sm:w-60 rounded font-semibold"
          />

          <IconInputWithLabel
            label="Email"
            onChange={OnchangeManager}
            type="email"
            required
            name="email"
            value={formData?.email}
            className=" px-2 w-52 sm:w-60 rounded font-semibold"
          />

          <DateTimeInput
            label="Date of birth"
            type="date"
            onChange={OnchangeManager}
            name="dob"
            required
            value={formData?.dob}
            className=" px-2 w-52 sm:w-60 rounded font-semibold"
          />

          <DateTimeInput
            label="Date Signed"
            type="date"
            onChange={OnchangeManager}
            name="dateSigned"
            required
            value={formData?.dateSigned}
            className=" px-2 w-52 sm:w-60 rounded font-semibold"
          />

          <div>
            <p className="_label mb-2">
              Assigned Role: <strong>{existingManager?.role ?? ""}</strong>
            </p>

            <COMBOBOX
              placeholder="Role"
              name="role"
              options={availableRoles}
              onChange={(opt) => {
                setFormData((p) => ({
                  ...p,
                  role: opt.value,
                }));
              }}
              className="w-full h-10 "
            />
          </div>
        </section>

        <section>
          <br />
          <Button
            type="submit"
            waiting={waiting}
            waitingText={"Please wait..."}
            disabled={waiting}
            primaryText={"Submit"}
            className="_primaryBtn px-12 h-10 py-1 w-full justify-center mt-12"
          />
        </section>
      </form>
    </div>
  );
}
