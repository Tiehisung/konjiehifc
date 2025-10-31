"use client";

import { useState } from "react";
import { toast } from "sonner";
import { apiConfig } from "@/lib/configs";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/lib";
import { Button } from "@/components/buttons/Button";
import { DateTimeInput, IconInputWithLabel } from "@/components/input/Inputs";
import { TimelineFlowbite } from "@/components/Timeline";
import { RxAvatar } from "react-icons/rx";
import { BiSolidUserDetail } from "react-icons/bi";
import { GrUserManager } from "react-icons/gr";
import { useForm, Controller } from "react-hook-form";
import DiveUpwards from "@/components/Animate";
import AvatarUploader from "@/components/AvatarUpload";
import type { IPlayer } from "@/app/players/page";
import type { IManager } from "../../managers/page";
import { joiResolver } from "@hookform/resolvers/joi";
import { playerJoiSchema } from ".";

interface IFormData {
  firstName: string;
  lastName: string;
  number: string | number;
  dateSigned: string;
  height: number;
  phone: string;
  email: string;
  dob: string;
  avatar: string;
  manager: IManager;
}

export default function PlayerProfileForm({
  player = null,
}: {
  player?: IPlayer | null;
}) {
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);

  const { control, handleSubmit, reset } = useForm<IFormData>({
    resolver: joiResolver(playerJoiSchema),
    defaultValues: {
      firstName: player?.firstName || "",
      lastName: player?.lastName || "",
      number: player?.jersey || "",
      dateSigned: player?.dateSigned || "",
      height: player?.height || 0,
      phone: player?.phone || "",
      email: player?.email || "",
      dob: player?.dob || "",
      avatar: player?.avatar || "",
      manager: player?.manager || {
        fullname: "",
        phone: "",
        email: "",
        dob: "",
      },
    },
  });

  const onSubmit = async (data: IFormData) => {
    try {
      setWaiting(true);
      const apiRoute = player
        ? `${apiConfig.players}/${player._id}`
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
  const icons = [
    <RxAvatar key="a" />,
    <BiSolidUserDetail key="b" />,
    <GrUserManager key="c" />,
  ];

  return (
    <section className="bg-card pt-6 rounded-2xl">
      <h1 className=" mb-2 text-teal-600 text-center _title">
        {player ? "Edit Player Profile" : "New Player Signup"}
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="py-6 sm:px-6 flex items-center justify-center gap-y-6 w-full"
      >
        <TimelineFlowbite
          icons={icons}
          className="flex flex-col gap-12 mx-auto grow w-full"
        >
          {/* Avatar Section */}
          <DiveUpwards layoutId="lid1">
            <div className=" gap-1 items-center w-full sm:min-w-72 ">
              <h2 className="_label">Avatar</h2>
              <Controller
                control={control}
                name="avatar"
                render={({ field: { value, onChange }, fieldState }) => (
                  <div className="flex flex-col items-center gap-2">
                    <AvatarUploader
                      initialAvatar={value}
                      label="Upload"
                      onUploaded={(file) => onChange(file?.secure_url ?? "")}
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
            <div className="p-3 grid gap-10 md:min-w-md lg:min-w-lg">
              <h2 className="_label">Player Information</h2>

              <Controller
                control={control}
                name="firstName"
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <IconInputWithLabel
                    label="Firstname"
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
                    label="Lastname"
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
                name="dateSigned"
                render={({ field, fieldState }) => (
                  <DateTimeInput
                    type="date"
                    label="Date Signed"
                    {...field}
                    error={fieldState.error?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="height"
                render={({ field, fieldState }) => (
                  <IconInputWithLabel
                    type="number"
                    label="Height"
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
                    type='tel'
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
                  />
                )}
              />
            </div>
          </DiveUpwards>

          {/* Manager Section */}
          <DiveUpwards layoutId="lid3">
            <div className="p-3 grid gap-10 md:min-w-md lg:min-w-lg">
              <h2 className="_label">Manager</h2>

              <Controller
                control={control}
                name="manager.fullname"
                render={({ field, fieldState }) => (
                  <IconInputWithLabel
                    label="Fullname"
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
                    type='tel'
                    {...field}
                    error={fieldState.error?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="manager.email"
                render={({ field, fieldState }) => (
                  <IconInputWithLabel
                    label="Email"
                    {...field}
                    error={fieldState.error?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="manager.dob"
                render={({ field, fieldState }) => (
                  <DateTimeInput
                    type="date"
                    label="Date of Birth"
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
                className="_primaryBtn justify-center px-12 h-10 py-1 w-full flex-wrap-reverse"
              />
            </div>
          </DiveUpwards>
        </TimelineFlowbite>
      </form>
    </section>
  );
}
