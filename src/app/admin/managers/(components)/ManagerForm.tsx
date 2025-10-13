"use client";

import { apiConfig } from "@/lib/configs";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";
import { getErrorMessage } from "@/lib";
import { IFileProps, IResultProps, ISelectOptionLV } from "@/types";
import { DateTimeInput, IconInputWithLabel } from "@/components/input/Inputs";
import Select from "react-select";
import { customStyles } from "@/styles";
import { ManagerRole } from "./Managers";
import { IManager } from "../page";
import AvatarPicker from "@/components/files/Avatar";
import { Title } from "@/components/Elements";
import { Button } from "@/components/buttons/Button";

export default function TechnicalManagerForm({
  existingManager,
  availablePortfolios,
}: {
  existingManager?: IManager;
  availablePortfolios: ManagerRole[];
}) {
  const router = useRouter();
  // Available portfolios

  const [fileToUpload, setFileToUpload] = useState<string | null>(null);
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

      //Upload image if selected
      let uploadedImage: IFileProps = {
        _id: "",
        secure_url: "",
        resource_type: "",
      };
      if (fileToUpload) {
        const upload = await fetch(apiConfig.fileUpload, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: (formData?.fullname ?? "").replaceAll(" ", "_"),
            path: fileToUpload,
            type: "image",
            folder: "managers/" + new Date().getFullYear(),
          }),
        });
        const uploadResult: IResultProps<IFileProps> = await upload.json();

        if (!uploadResult.success || !uploadResult.data) {
          setWaiting(false);
          toast.error(uploadResult.message);
          return;
        }

        uploadedImage = uploadResult.data;
      }

      //Proceed to save to database
      const apiRoute = existingManager
        ? `${apiConfig.managers}/${existingManager?._id}`
        : apiConfig.managers;
      const response = await fetch(apiRoute, {
        body: JSON.stringify(
          uploadedImage ? { ...formData, avatar: uploadedImage } : formData
        ),
        cache: "no-cache",
        method: existingManager ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
      });
      const results = await response.json();
      setWaiting(false);

      toast(results.message, { type: results.success ? "success" : "error" });
      if (results.success) {
        const formEl = document.getElementById(
          "manager-form"
        ) as HTMLFormElement;

        formEl.reset();
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      router.refresh();
      setWaiting(false);
    }
  };
  return (
    <div className="">
      <Title className=" text-center  p-3">
        {existingManager
          ? `${existingManager.fullname} details`
          : "Manager registration"}
      </Title>

      <div className={`container w-fit transition-all duration-300 p-2 `}>
        <h2 className="mt-5 mb-2 text-teal-700 text-xl text-center ">
          {existingManager?.role}
        </h2>
        <form
          id="manager-form"
          onSubmit={handleCreateNewManager}
          className={`grid gap-9 w-fit transition-all duration-300 delay-75 ease-in _secondaryBg shadow border _borderColor rounded-md p-6 pt-10 text-sm  `}
        >
          <section className="grid gap-8">
            <IconInputWithLabel
              label="Fullname"
              onChange={OnchangeManager}
              type="text"
              required
              name="fullname"
              value={formData?.fullname}
              className=" px-2 w-52 sm:w-60 h-7 rounded font-semibold"
            />

            <IconInputWithLabel
              label="Phone"
              onChange={OnchangeManager}
              type="tel"
              required
              name="phone"
              value={formData?.phone}
              className=" px-2 w-52 sm:w-60 h-7 rounded font-semibold"
            />

            <IconInputWithLabel
              label="Email"
              onChange={OnchangeManager}
              type="email"
              required
              name="email"
              value={formData?.email}
              className=" px-2 w-52 sm:w-60 h-7 rounded font-semibold"
            />

            <div>
              <p className="">Date of birth</p>
              <DateTimeInput
                type="date"
                onChange={OnchangeManager}
                name="dob"
                required
                value={formData?.dob}
                className=" px-2 w-52 sm:w-60 h-7 rounded font-semibold"
              />
            </div>

            <div>
              <p className="">Date signed</p>
              <DateTimeInput
                type="date"
                onChange={OnchangeManager}
                name="dateSigned"
                required
                value={formData?.dateSigned}
                className=" px-2 w-52 sm:w-60 h-7 rounded font-semibold"
              />
            </div>

            <div>
              <p className=" ">
                Assigned Role: <strong>{existingManager?.role ?? ""}</strong>
              </p>
              <Select
                options={availablePortfolios.map((r) => ({
                  label: r,
                  value: r,
                }))}
                name="role"
                placeholder="Available portofolios"
                className="bg-background rounded"
                styles={customStyles}
                onChange={(newValue: unknown) => {
                  const e = newValue as ISelectOptionLV;
                  setFormData((p) => ({ ...p, role: e.value as ManagerRole }));
                }}
              />
            </div>
          </section>

          <section>
            <p className="">Avatar</p>
            <AvatarPicker
              imageUrl={existingManager?.avatar.secure_url}
              setImageUrl={setFileToUpload}
              inputId={existingManager?._id ?? "new-man"}
              inputLabel={existingManager ? "Change picture" : ""}
            />
            <br />
            <Button
              type="submit"
              waiting={waiting}
              waitingText={"Please wait..."}
              disabled={waiting}
              primaryText={"Submit"}
              className="_primaryBtn px-12 h-10 py-1 w-fit mt-12"
            />
          </section>
        </form>
      </div>
    </div>
  );
}
