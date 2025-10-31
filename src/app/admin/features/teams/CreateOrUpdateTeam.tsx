"use client";

import { ITeamProps } from "@/app/matches/(fixturesAndResults)";
import AvatarUploader from "@/components/AvatarUpload";
import { Button } from "@/components/buttons/Button";
import { DIALOG } from "@/components/Dialog";
import SingleFilePicker from "@/components/files/SingleFilePicker";
import { IconInputWithLabel } from "@/components/input/Inputs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { apiConfig } from "@/lib/configs";
import { IFileUpload, TConvertedFile } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { toast } from "sonner";

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

export const NewTeamForm = () => {
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    community: "",
    alias: "",
    contact: "",
    logo: "",
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWaiting(true);
  
    const response = await fetch(apiConfig.teams, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      cache: "no-cache",
    });
    const results = await response.json();
    toast.success(results.message);
    setWaiting(false);
    router.refresh();
  };
  return (
    <Card className=" rounded-none p-3">
      <CardHeader>
        <h1 className="font-bold text-lg mb-2 text-teal-700 text-center uppercase">
          Register new opponent team
        </h1>
      </CardHeader>

      <CardContent className="mx-auto ">
        <form
          onSubmit={handleSubmit}
          className="p-4 pt-10 border _borderColor max-w-md flex flex-col gap-4 gap-y-8 items-center justify-center mx-center md:min-w-md"
        >
          <div className="flex flex-col items-center justify-center gap-2 mx-auto ">
            <AvatarUploader
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
            primaryText={"Save Team"}
            className="_primaryBtn px-3 py-2 w-full mt-2 justify-center"
          />
        </form>
      </CardContent>
    </Card>
  );
};
export const UpdateTeamForm = ({ team }: { team: ITeamProps }) => {
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);

  const [formData, setFormData] = useState({
    name: team.name ?? "",
    community: team.community ?? "",
    alias: team.alias ?? "",
  });
  const [logoFile, setLogoFile] = useState<TConvertedFile | null>(null);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWaiting(true);
    const body = {
      ...team,
      ...formData,
      logo: logoFile,
    };
    const response = await fetch(apiConfig.teams, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-cache",
    });
    const results = await response.json();
    toast.success(results.message);
    setWaiting(false);
    router.refresh();
  };
  return (
    <div>
      <form className="" onSubmit={handleSubmit}>
        <IconInputWithLabel
          name="name"
          type="text"
          className=""
          value={formData.name}
          onChange={handleOnChange}
          label="Name"
          placeholder="Name"
        />
        <IconInputWithLabel
          name="alias"
          type="text"
          className=""
          value={formData.alias}
          onChange={handleOnChange}
          label="alias"
          placeholder="Alias"
        />
        <IconInputWithLabel
          name="community"
          type="text"
          className=""
          value={formData.community}
          onChange={handleOnChange}
          label="Community"
          placeholder="Community"
        />

        <div>
          <p className="_label">Existing logo</p>
          <Image
            src={team.logo}
            width={400}
            height={400}
            className={`bg-gray-400  w-32 h-32 rounded-md border`}
            alt="ex-logo"
          />
        </div>

        <SingleFilePicker pickerId="team-logo" exportFile={setLogoFile} />
        <div>
          <Button
            type="submit"
            waiting={waiting}
            disabled={waiting}
            waitingText={"Saving..."}
            primaryText={"Update Team"}
            className="_secondaryBtn px-3 mt-2"
          />
        </div>
      </form>
    </div>
  );
};
