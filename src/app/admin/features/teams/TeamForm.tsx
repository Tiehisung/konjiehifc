"use client";

import { ITeamProps } from "@/app/matches/(fixturesAndResults)";
import ImageUploaderCldWidget from "@/components/cloudinary/AvatarUploadWidget";
import { Button } from "@/components/buttons/Button";
import { IconInputWithLabel } from "@/components/input/Inputs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { apiConfig } from "@/lib/configs";
import { IFileUpload } from "@/types";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib";
import { fireDoubleEscape } from "@/hooks/Esc";

export interface IPostTeam {
  name: string;
  community: string;
  alias: string;
  logo: IFileUpload;
  currentPlayers: string[];
}

export interface IUpdateTeam extends IPostTeam {
  _id: string;
}

interface IProps {
  team?: ITeamProps;
}

export const TeamForm = ({ team }: IProps) => {
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);

  const [formData, setFormData] = useState(
    team ?? {
      name: "",
      community: "",
      alias: "",
      contact: "",
      contactName: "",
      logo: "",
    }
  );

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setWaiting(true);
      const response = await fetch(apiConfig.teams, {
        method: team ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(team ? { ...team, ...formData } : formData),
        cache: "no-cache",
      });

      const results = await response.json();

      if (results.success) {
        toast.success(results.message);
        if (!team)
          setFormData({
            name: "",
            community: "",
            alias: "",
            contact: "",
            logo: "",
            contactName: "",
          });

        fireDoubleEscape();
      } else {
        toast.success(results.message);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setWaiting(false);
      router.refresh();
    }
  };
  return (
    <Card className="w-fit p-3 mx-auto grow">
      <CardHeader>
        <h1 className="font-bold text-lg mb-2 text-teal-700 text-center uppercase">
          {team ? `Update ${team?.name}` : "Register New Opponent Team"}
        </h1>
      </CardHeader>

      <CardContent className="mx-auto ">
        <form
          onSubmit={handleSubmit}
          className="p-4 pt-10 border _borderColor max-w-md flex flex-col gap-4 gap-y-8 items-center justify-center mx-center w-full  grow md:min-w-sm"
        >
          <div className="flex flex-col items-center justify-center gap-2 mx-auto ">
            <ImageUploaderCldWidget
              initialAvatar={formData.logo as string}
              label="Upload"
              onUploaded={(file) =>
                setFormData({ ...formData, logo: file?.secure_url ?? "" })
              }
              className="flex text-sm items-center gap-2 border"
            />
            {!formData.logo && (
              <p className="text-red-500 text-xs">Logo is required</p>
            )}
          </div>
          <IconInputWithLabel
            name="name"
            type="text"
            className=""
            value={formData.name}
            onChange={handleOnChange}
            label="Name"
            required
          />

          <IconInputWithLabel
            name="alias"
            type="text"
            className=""
            value={formData.alias}
            onChange={handleOnChange}
            label="Alias"
            required
          />

          <IconInputWithLabel
            name="community"
            type="text"
            className=""
            value={formData.community}
            onChange={handleOnChange}
            label="Community"
            required
          />
          <IconInputWithLabel
            name="contactName"
            type="text"
            className=""
            value={formData.contactName}
            onChange={handleOnChange}
            label="Contact Person Name"
            required
          />
          <IconInputWithLabel
            name="contact"
            type="tel"
            className=""
            value={formData.contact}
            onChange={handleOnChange}
            label="Contact"
            required
          />
          <Button
            type="submit"
            waiting={waiting}
            disabled={waiting}
            waitingText={"Saving..."}
            primaryText={"SAVE"}
            className="_primaryBtn px-3 py-2 w-full mt-2 justify-center"
          />
        </form>
      </CardContent>
    </Card>
  );
};
