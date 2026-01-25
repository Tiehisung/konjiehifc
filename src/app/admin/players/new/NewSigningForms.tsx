"use client";

import { useState } from "react";
import { toast } from "sonner";
import { apiConfig } from "@/lib/configs";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/lib";
import { Button } from "@/components/buttons/Button";
import {
  DateTimeInput,
  IconInputWithLabel,
  TextArea,
} from "@/components/input/Inputs";
import { useForm, Controller } from "react-hook-form";
import DiveUpwards from "@/components/Animate";
import ImageUploaderCldWidget from "@/components/cloudinary/AvatarUploadWidget";
import { EPlayerPosition, IPlayer } from "@/types/player.interface";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { staticImages } from "@/assets/images";
import ContentShowcaseWrapper from "@/components/ShowcaseWrapper";
import { PrimarySelect } from "@/components/select/Select";
import { Label } from "@/components/ui/label";
import { enumToOptions } from "@/lib/select";
import QuillEditor from "@/components/editor/Quill";

interface IFormData {
  firstName: string;
  lastName: string;
  number: string | number;
  dateSigned: string;
  height: number;
  phone: string;
  about: string;
  email: string;
  dob: string;
  avatar: string;
  position: EPlayerPosition;
  manager: {
    fullname: string;
    phone: string;
  };
}

export default function PlayerProfileForm({
  player = null,
}: {
  player?: IPlayer | null;
}) {
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);

  const { control, handleSubmit, reset } = useForm<IFormData>({
    resolver: joiResolver(playerJoiSchema, { allowUnknown: true }),
    defaultValues: {
      firstName: player?.firstName || "",
      lastName: player?.lastName || "",
      number: player?.number || "",
      dateSigned: player?.dateSigned?.split("T")?.[0] || "",
      height: player?.height || 3.5,
      phone: player?.phone || "0211111111",
      about: player?.about || "",
      email: player?.email || "",
      dob: player?.dob?.split("T")?.[0] || "",
      avatar: player?.avatar || "",
      position: player?.position,
      manager: player?.manager
        ? { ...player?.manager }
        : {
            fullname: "",
            phone: "0211111111",
          },
    },
  });

  const onSubmit = async (data: IFormData) => {
    try {
      setWaiting(true);
      const apiRoute = player
        ? `${apiConfig.players}/${player?._id}`
        : apiConfig.players;

      const response = await fetch(apiRoute, {
        method: player ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        reset();
      } else toast.error(result.message);
    } catch (error) {
      toast.error(getErrorMessage(error, "Error saving player."));
    } finally {
      setWaiting(false);
      router.refresh();
    }
  };

  const images = Object.values(staticImages);

  return (
    <section className="bg-card _card pt-6 rounded-2xl flex items-start ">
      <ContentShowcaseWrapper images={images as string[]}>
        <div className="w-full">
          <h1 className=" mb-2 text-teal-600 text-center _title">
            {player ? "Edit Player Profile" : "New Player Signup"}
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="py-6 sm:px-6 flex items-center justify-center gap-y-6 w-full"
          >
            <div className="flex flex-col gap-10 mx-auto grow w-full">
              {/* Avatar Section */}
              <DiveUpwards layoutId="lid1">
                <div className=" flex flex-col gap-1 items-center w-full sm:min-w-72 ">
                  <h2 className="_label">Avatar</h2>
                  <Controller
                    control={control}
                    name="avatar"
                    render={({ field: { value, onChange }, fieldState }) => (
                      <div className="flex flex-col items-center gap-2">
                        <ImageUploaderCldWidget
                          initialAvatar={value}
                          label="Upload"
                          onUploaded={(file) =>
                            onChange(file?.secure_url ?? "")
                          }
                          className="flex text-sm items-center gap-2 border"
                        />
                        {fieldState.error && (
                          <p className="text-red-500 text-xs">
                            {fieldState.error.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>
              </DiveUpwards>

              {/* Personal Information */}
              <DiveUpwards layoutId="lid2">
                <div className="p-3 grid gap-8 md:min-w-md lg:min-w-lg">
                  <h2 className="_label">PERSONAL INFORMATION</h2>
                  <Controller
                    control={control}
                    name="firstName"
                    rules={{ required: true }}
                    render={({ field, fieldState }) => (
                      <IconInputWithLabel
                        label="First Name"
                        {...field}
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="lastName"
                    rules={{ required: true }}
                    render={({ field, fieldState }) => (
                      <IconInputWithLabel
                        label="Last Name"
                        {...field}
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="number"
                    rules={{ required: true }}
                    render={({ field, fieldState }) => (
                      <IconInputWithLabel
                        type="number"
                        label="Jersey Number"
                        {...field}
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="position"
                    rules={{ required: true }}
                    render={({ field, fieldState }) => (
                      <div>
                        <Label className="mb-2 _label">Player Position</Label>
                        <PrimarySelect
                          options={enumToOptions(EPlayerPosition)}
                          {...field}
                          error={fieldState.error?.message}
                          triggerStyles="w-full capitalize"
                          className="capitalize"
                        />
                      </div>
                    )}
                  />
                  <Controller
                    control={control}
                    name="height"
                    render={({ field, fieldState }) => (
                      <IconInputWithLabel
                        type="number"
                        label="Height(ft)"
                        {...field}
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="phone"
                    render={({ field, fieldState }) => (
                      <IconInputWithLabel
                        label="Phone"
                        type="tel"
                        {...field}
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="email"
                    render={({ field, fieldState }) => (
                      <IconInputWithLabel
                        label="Email"
                        type="email"
                        {...field}
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="dob"
                    render={({ field, fieldState }) => (
                      <DateTimeInput
                        type="date"
                        label="Date of Birth"
                        {...field}
                        error={fieldState.error?.message}
                        value={field.value.split("T")[0]}
                      />
                    )}
                  />
                 
                  <Controller
                    control={control}
                    name="dateSigned"
                    render={({ field, fieldState }) => (
                      <DateTimeInput
                        type="date"
                        label="Date Signed"
                        {...field}
                        error={fieldState.error?.message}
                        value={field.value.split("T")[0]}
                      />
                    )}
                  /> 
                  <Controller
                    control={control}
                    name="about"
                    render={({ field, fieldState }) => (
                      <QuillEditor
                        label="About this Player"
                        {...field}
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                </div>
              </DiveUpwards>

              {/* Manager Section */}
              <DiveUpwards layoutId="lid3">
                <div className="p-3 grid gap-8 md:min-w-md lg:min-w-lg">
                  <h2 className="_label mb-5 border-b">MANAGER</h2>

                  <Controller
                    control={control}
                    name="manager.fullname"
                    render={({ field, fieldState }) => (
                      <IconInputWithLabel
                        label="Full Name"
                        {...field}
                        error={fieldState.error?.message}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="manager.phone"
                    render={({ field, fieldState }) => (
                      <IconInputWithLabel
                        label="Phone"
                        type="tel"
                        {...field}
                        error={fieldState.error?.message}
                      />
                    )}
                  />

                  <Button
                    type="submit"
                    waiting={waiting}
                    waitingText="Please wait..."
                    primaryText="Submit"
                    className=" justify-center px-12 h-10 py-1 w-full flex-wrap-reverse"
                  />
                </div>
              </DiveUpwards>
            </div>
          </form>
        </div>
      </ContentShowcaseWrapper>
    </section>
  );
}

export const playerManagerJoiSchema = Joi.object({
  fullname: Joi.string().trim().min(2).max(50).required().messages({
    "string.empty": "Manager fullname is required",
  }),
  phone: Joi.string()
    .trim()
    .pattern(/^[0-9]{7,15}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone must contain only digits (7–15 chars)",
      "string.empty": "Manager phone is required",
    }),
  email: Joi.string().email({ tlds: false }).optional().allow("").messages({
    "string.email": "Manager email must be valid",
  }),
});

export const playerJoiSchema = Joi.object({
  firstName: Joi.string().trim().min(2).max(30).required().messages({
    "string.empty": "First name is required",
  }),
  lastName: Joi.string().trim().min(2).max(30).required().messages({
    "string.empty": "Last name is required",
  }),
  about: Joi.string().trim().max(3000).optional().allow(""),
  position: Joi.string()
    .valid(...Object.values(EPlayerPosition))
    .required()
    .messages({
      "any.only": `Position must be one of ${Object.values(
        EPlayerPosition,
      ).toString()}`,
      "string.empty": "Position is required",
    }),
  number: Joi.number().positive().min(1).max(30).required().messages({
    "any.required": "Jersey number is required",
  }),
  dateSigned: Joi.date().iso().required().messages({
    "date.base": "Date signed must be a valid date",
  }),
  height: Joi.number().positive().min(3).max(8).required().messages({
    "number.base": "Height must be a number",
    "number.min": "Height cannot be less than 3 ft",
    "number.max": "Height cannot exceed 8 ft",
  }),
  phone: Joi.string()
    .trim()
    .pattern(/^[0-9]{7,15}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone must contain only digits (7–15 chars)",
      "string.empty": "Phone is required",
    }),
  email: Joi.string().email({ tlds: false }).optional().allow("").messages({
    "string.email": "Invalid email format",
  }),
  dob: Joi.date().iso().less("now").required().messages({
    "date.base": "Date of birth must be valid",
    "any.required": "Date of birth is required",
  }),
  avatar: Joi.string().uri().required().messages({
    "string.empty": "Profile photo is required",
    "string.uri": "Invalid image URL",
  }),
  manager: playerManagerJoiSchema.required(),
});
