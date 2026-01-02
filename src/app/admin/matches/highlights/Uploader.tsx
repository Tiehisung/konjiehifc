"use client";

import { useState, FormEvent, useCallback, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/buttons/Button";
import CloudinaryUploader from "@/components/cloudinary/FileUploadWidget";
import { Input } from "@/components/input/Inputs";
import { apiConfig } from "@/lib/configs";
import { getErrorMessage } from "@/lib";
import { IQueryResponse } from "@/types";
import { IPlayer } from "@/types/player.interface";
import MultiSelectionInput from "@/components/select/MultiSelect";
import { ICldFileUploadResult } from "@/types/file.interface";
import { IMatch, IMatchHighlight } from "@/types/match.interface";
import { DIALOG } from "@/components/Dialog";
import { toggleClick } from "@/lib/DOM";
import { useFetch } from "@/hooks/fetch";
import { PrimaryCollapsible } from "@/components/Collapsible";
import { PrimarySelect } from "@/components/select/Select";
import { formatDate } from "@/lib/timeAndDate";
import { symbols } from "../../../../data";

interface GalleryUploadProps {
  trigger?: ReactNode;
  match?: IMatch;
  matches?: IMatch[];
}

interface IForm {
  title: string;
  description: string;
  match: IMatch;
  tags: string[];
}

export function HighlightUpload({
  trigger = <span className="_primaryBtn">Upload Hightlight</span>,
  match,
  matches,
}: GalleryUploadProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<ICldFileUploadResult | null>(null);

  const [form, setForm] = useState<IForm>({
    title: file?.original_filename ?? match?.title ?? "",
    description: "",
    match: matches?.[0] as IMatch,
    tags: [],
  });

  const { results, loading: fetchingPlayers } = useFetch<IPlayer[]>({
    uri: "/players",
  });
  const players = results?.data;

  const [clearTrigger, setClearTrigger] = useState(0);

  /** Reset form state */
  const resetForm = useCallback(() => {
    setForm({
      title: file?.original_filename ?? match?.title ?? "",
      description: "",
      match: matches?.[0] as IMatch,
      tags: [],
    });
    setFile(null);
    setClearTrigger((n) => n + 1);
  }, []);

  /** Handle gallery save */
  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please upload a file.");
      return;
    }

    try {
      setIsLoading(true);

      const payload: IMatchHighlight = {
        ...file,
        ...form,
        tags: [...form.tags, match?.title as string].filter(Boolean),
      };

      const response = await fetch(apiConfig.highlights, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-cache",
        body: JSON.stringify(payload),
      });

      const result: IQueryResponse = await response.json();
      if (result.success) {
        toast.success(result.message || "Highlight saved successfully!");
        resetForm();
        router.refresh();
      } else {
        toast.error(result.message || "Failed to save highlight");
      }
    } catch (error) {
      toast.error(getErrorMessage(error, "Something went wrong"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (file) toggleClick("upload-dialog");
  }, [file]);

  return (
    <>
      <div className="w-full border border-border rounded-xl bg-card/30 shadow-sm space-y-8 p-4 mb-4">
        <CloudinaryUploader
          setUploadedFiles={(f) => setFile(f?.[0])}
          clearTrigger={clearTrigger}
          maxFiles={1}
          trigger={trigger}
          resourceType="video"
          folder="match-highlights"
          multiple={false}
          wrapperStyles="flex flex-col items-center justify-center"
          mediaDisplayStyles="justify-center sm:flex "
          maxFileSize="100_000_000"
          hidePreview={true}
        />
        {file && (
          <DIALOG trigger={undefined} id="upload-dialog">
            <div className="px-2 5">
              <form
                onSubmit={handleSave}
                className="flex flex-col gap-6 md:gap-8 max-w-2xl mx-auto "
              >
                <div className="flex flex-col gap-4">
                  <Input
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, title: e.target.value }))
                    }
                    name="title"
                    value={form.title}
                    placeholder="Highlight title"
                    required
                  />
                  <Input
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    name="description"
                    value={form.description}
                    placeholder="Description"
                  />
                  <PrimarySelect
                    options={
                      matches
                        ?.filter((m) => m?.status !== "UPCOMING")
                        ?.map((m) => ({
                          label:
                            m.title + symbols.longDash + formatDate(m.date),
                          value: m._id,
                        })) ?? []
                    }
                    onChange={(val) =>
                      setForm((prev) => ({
                        ...prev,
                        match: matches?.find((m) => m._id == val) as IMatch,
                      }))
                    }
                    name="match"
                    value={match?._id}
                    placeholder="Match"
                    triggerStyles="grow w-full"
                    required
                  />
                </div>

                {(players?.length ?? 0) > 0 && (
                  <PrimaryCollapsible
                    header={{ icon: "#", label: "Tag Players" }}
                    variant={"secondary"}
                    loading={fetchingPlayers}
                  >
                    <MultiSelectionInput
                      onChange={(ts) =>
                        setForm((prev) => ({
                          ...prev,
                          tags: ts.map((t) => t.value.split(" ").flat()).flat(),
                        }))
                      }
                      options={players?.map((p) => ({
                        label: `${p.firstName} ${p.lastName}`,
                        value: `${p._id} ${p.firstName} ${p.lastName}`,
                      }))}
                      className="text-sm text-foreground "
                      label=""
                      name={"tags"}
                    />
                  </PrimaryCollapsible>
                )}

                <Button
                  type="submit"
                  waiting={isLoading}
                  waitingText="Saving..."
                  primaryText="SAVE HIGHLIGHT"
                  className=" font-semibold grow h-10 justify-center"
                />
              </form>
              <video
                src={file?.secure_url}
                controls
                className="rounded-lg object-cover mt-6 max-h-80 w-full"
              />
            </div>
          </DIALOG>
        )}
      </div>
    </>
  );
}
