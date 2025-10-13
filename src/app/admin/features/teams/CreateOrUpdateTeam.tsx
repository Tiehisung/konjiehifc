"use client";

import { ITeamProps } from "@/app/matches/(fixturesAndResults)";
import { Button } from "@/components/buttons/Button";
import AvatarPicker from "@/components/files/Avatar";
import SingleFilePicker from "@/components/files/SingleFilePicker";
import { IconInput, IconInputWithLabel } from "@/components/input/Inputs";
import PrimaryModal from "@/components/modals/Modals";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { apiConfig } from "@/lib/configs";
import { IFileUpload, TConvertedFile } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

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
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    community: "",
    alias: "",
  });
  const [logoFile, setLogoFile] = useState<string | null>(null);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWaiting(true);
    const body = {
      ...formData,
      logo: logoFile, //IFileUpload
    };
    const response = await fetch(apiConfig.teams, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-cache",
    });
    const results = await response.json();
    toast(results.message, { type: results.success ? "success" : "error" });
    setWaiting(false);
    router.refresh();
  };
  return (
    <>
      <Button
        primaryText="Create new team"
        onClick={() => setIsOpen(true)}
        className="_primaryBtn px-2 ml-auto"
      />
      <PrimaryModal isOpen={isOpen} setIsOpen={setIsOpen} >
        <Card className=" rounded-xl p-3">
          <CardHeader>
            <h1 className="font-bold text-lg mb-2 text-primaryRed text-center uppercase">
              Register new team
            </h1>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="p-4 pt-10 border _borderColor max-w-md flex flex-wrap gap-4 gap-y-9 items-start">
                <AvatarPicker
                  imageUrl={logoFile as string}
                  setImageUrl={setLogoFile}
                  inputId={"new-team"}
                  title={"Team logo"}
                  titleStyles="_label"
                  inputLabel="Choose image"
                />
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
                <Button
                  type="submit"
                  waiting={waiting}
                  disabled={waiting}
                  waitingText={"Saving..."}
                  primaryText={"Save Team"}
                  className="_primaryBtn px-3 py-2  mt-2"
                />
              </div>
            </form>
          </CardContent>
        </Card>
      </PrimaryModal>
    </>
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
    toast(results.message, { type: results.success ? "success" : "error" });
    setWaiting(false);
    router.refresh();
  };
  return (
    <div>
      <form className="" onSubmit={handleSubmit}>
        <IconInput
          name="name"
          type="text"
          className=""
          value={formData.name}
          onChange={handleOnChange}
          label="Name"
          placeholder="Name"
        />
        <IconInput
          name="alias"
          type="text"
          className=""
          value={formData.alias}
          onChange={handleOnChange}
          label="alias"
          placeholder="Alias"
        />
        <IconInput
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
            src={team.logo.secure_url}
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
