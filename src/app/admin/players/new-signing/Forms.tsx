"use client";

import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import { apiConfig } from "@/lib/configs";
import { useRouter } from "next/navigation";
import { FcCamera } from "react-icons/fc";
import { getErrorMessage, getFilePath } from "@/lib";
import { IPlayer } from "@/app/players/page";
import { Button } from "@/components/buttons/Button";
import { DateTimeInput, IconInputWithLabel } from "@/components/input/Inputs";
import { TimelineFlowbite } from "@/components/Timeline";
import { RxAvatar } from "react-icons/rx";
import { BiSolidUserDetail } from "react-icons/bi";
import { GrUserManager } from "react-icons/gr";
import DiveUpwards from "@/components/Animate/DiveUp";
import { ImageMimeTypes } from "@/types/enumerators";
import { IManager } from "../../managers/page";
import { staticImages } from "@/assets/images";
import { SubTitle } from "@/components/Elements";

const dataModel = {
  firstName: "",
  lastName: "",
  jersey: "",
  dateSigned: "",
  height: "",
  phone: "",
  email: "",
  dob: "",
  avatar: { secure_url: "" },
  manager: {
    fullname: "",
    phone: "",
    email: "",
    dob: "",
  },
};

export default function PlayerProfileForm({
  player = null,
}: {
  player?: IPlayer | null;
}) {
  const router = useRouter();
  const [imageFile, setImageFile] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [formData, setFormData] = useState(
    player || {
      ...dataModel,
    }
  );
  const OnchangePlayer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const OnchangeManager = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      manager: { ...prev.manager, [fieldName]: value } as IManager,
    }));
  };

  // console.log("player at edit",player)
  //Handle change image
  async function handleImageSelection(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target?.files?.[0] as File;
    if (!selectedFile) return;
    if (selectedFile.size > 3524000) {
      toast.error(
        selectedFile.size + " is too large. Picture should not exceed 3.5mb"
      );
      return;
    }

    setImageFile(await getFilePath(selectedFile));
  }

  //Handle submit
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setWaiting(true);

      //Save to database
      const apiRoute = player
        ? `${apiConfig.players}/${player?._id}`
        : apiConfig.players + `/new-signing`;

      const response = await fetch(apiRoute, {
        body: JSON.stringify({ ...formData, avatar: imageFile }), //avatar as string | object
        cache: "no-cache",
        method: player ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
      });
      const results = await response.json();
      setWaiting(false);

      toast(results.message, { type: results.success ? "success" : "error" });
      if (results.success) {
        setFormData({ ...dataModel });
        setImageFile("");
      }
    } catch (error) {
      toast.error(
        getErrorMessage(error, "Error saving player. Please try again")
      );
    } finally {
      router.refresh();
    }
  };
  const icons = [
    <RxAvatar key="avatar" />,
    <BiSolidUserDetail key="userDetail" />,
    <GrUserManager key="userManager" />,
  ];

  return (
    <section className="">
      <SubTitle className="mt-5 mb-2 text-teal-600 text-center ">
        {player ? "Edit Player Profile" : "New Player Signup"}
      </SubTitle>
      <form
        onSubmit={handleSignUp}
        className=" py-6 sm:px-6 grid justify-center gap-y-6 border _borderColor rounded-md font-light container w-fit"
      >
        <TimelineFlowbite icons={icons}>
          {/* Avatar */}
          <DiveUpwards>
            <div className=" form-control gap-1 items-center w-full _secondaryBg sm:min-w-72">
              <h2 className="_label">Avatar</h2>
              <Image
                src={
                  imageFile || player?.avatar?.secure_url || staticImages.avatar
                }
                width={300}
                height={300}
                alt="player avatar"
                className="h-36 w-36 rounded-full _primaryBg"
              />
              <label
                htmlFor={player ? player._id : "player-avatar"}
                className="flex items-center shadow w-fit p-1 rounded mt-3 cursor-pointer"
                title="Choose file"
              >
                <FcCamera size={30} /> Choose files
                <input
                  id={player ? player._id : "player-avatar"}
                  hidden
                  type="file"
                  onChange={handleImageSelection}
                  name="image"
                  className=""
                  accept={Object.values(ImageMimeTypes).join(",")}
                />
              </label>
            </div>
          </DiveUpwards>

          {/* Personal information */}
          <DiveUpwards>
            <div className="_secondaryBg p-3 grid gap-7 w-fit">
              <h2 className="_label ">Player personal information form</h2>
              <IconInputWithLabel
                required
                label="Firstname"
                type="text"
                onChange={OnchangePlayer}
                value={formData?.firstName}
                name="firstName"
                className="border _borderColor px-2 w-52 sm:w-60 h-7 rounded font-semibold "
              />

              <IconInputWithLabel
                label="Lastname"
                onChange={OnchangePlayer}
                type="text"
                required
                name="lastName"
                value={formData?.lastName}
                className="border _borderColor px-2 w-52 sm:w-60 h-7 rounded font-semibold"
              />

              <IconInputWithLabel
                label="Jersey number"
                type="number"
                onChange={OnchangePlayer}
                name="jersey"
                required
                value={formData?.jersey}
                className="border _borderColor px-2 w-52 sm:w-60 h-7 rounded font-semibold"
              />

              <div>
                <p className="_label">Date signed</p>
                <DateTimeInput
                  type="date"
                  onChange={OnchangePlayer}
                  name="dateSigned"
                  required
                  value={formData?.dateSigned}
                  className="border _borderColor px-2 w-52 sm:w-60 h-7 rounded font-semibold"
                />
              </div>

              <IconInputWithLabel
                label="Current height"
                type="number"
                onChange={OnchangePlayer}
                name="height"
                required
                value={formData?.height}
                className=" px-2 w-52 sm:w-60 h-7 rounded font-semibold"
              />

              <IconInputWithLabel
                label="Phone"
                onChange={OnchangePlayer}
                type="tel"
                required
                name="phone"
                value={formData?.phone}
                className="border _borderColor px-2 w-52 sm:w-60 h-7 rounded font-semibold"
              />

              <IconInputWithLabel
                label="Email"
                type="email"
                onChange={OnchangePlayer}
                name="email"
                required
                value={formData?.email}
                className="border _borderColor px-2 w-52 sm:w-60 h-7 rounded font-semibold"
              />

              <div>
                <p className="_label">Date of birth</p>
                <DateTimeInput
                  type="date"
                  onChange={OnchangePlayer}
                  name="dob"
                  required
                  value={formData?.dob}
                  className="border _borderColor px-2 w-52 sm:w-60 h-7 rounded font-semibold"
                />
              </div>
            </div>
          </DiveUpwards>

          {/* Manager */}
          <DiveUpwards>
            <div className="grid gap-6 h-fit w-fit _secondaryBg p-3">
              <h2 className="_label ">Manager registration form</h2>

              <IconInputWithLabel
                label="Fullname"
                type="text"
                onChange={(e) => OnchangeManager(e, "fullname")}
                required
                name="man-fullname"
                value={formData?.manager?.fullname}
                className="border _borderColor px-2 w-52 sm:w-60 h-7 rounded font-semibold"
              />

              <IconInputWithLabel
                label="Phone"
                type="tel"
                required
                onChange={(e) => OnchangeManager(e, "phone")}
                name="man-phone"
                value={formData?.manager?.phone}
                className="border _borderColor px-2 w-52 sm:w-60 h-7 rounded font-semibold"
              />

              <IconInputWithLabel
                label="Email"
                type="email"
                required
                onChange={(e) => OnchangeManager(e, "email")}
                name="man-email"
                value={formData?.manager?.email}
                className="border _borderColor px-2 w-52 sm:w-60 h-7 rounded font-semibold"
              />

              <div>
                <p>Date of birth</p>
                <DateTimeInput
                  type="date"
                  onChange={(e) => OnchangeManager(e, "dob")}
                  name="man-dob"
                  required
                  value={formData?.manager?.dob}
                  className=" px-2 w-52 sm:w-60 h-7 rounded font-semibold"
                />
              </div>

              <hr />

              <Button
                type="submit"
                waiting={waiting}
                waitingText={"Please wait..."}
                disabled={waiting}
                primaryText={"Submit"}
                className="_primaryBtn px-12 h-10 py-1 w-full flex-wrap-reverse"
              />
            </div>
          </DiveUpwards>
        </TimelineFlowbite>
      </form>
    </section>
  );
}
