"use client";

import { IPostNews } from "@/app/news/page";
import { RemoveButton } from "@/components/buttons/DelClearRemove";
import { Button } from "@/components/buttons/Button";
// import RichTextEditor from "@/components/editor/RichTextEditor";
import MultiFilePicker from "@/components/files/MultiFilePicker";
import SingleFilePicker from "@/components/files/SingleFilePicker";
import { Input } from "@/components/input/Inputs";
import { getErrorMessage } from "@/lib";
import { apiConfig } from "@/lib/configs";
import { IResultProps, TConvertedFile } from "@/types";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";

const CreateNews = () => {
  const [waiting, setWaiting] = useState(false);
  const router = useRouter();
  const [headlineContent, setHeadlineContent] = useState<{
    text: string;
    image: TConvertedFile;
  } | null>(null);

  const [details, setDetails] = useState<IPostNews["details"]>([]);

  const handleAddContent = (isText: boolean) => {
    setDetails((p) => [...p, { isText }]);
  };
  const handleSave = () => {
    localStorage.setItem(
      "news",
      JSON.stringify({ headline: headlineContent, details })
    );
    toast("Saved", { position: "bottom-center" });
  };

  const handleChangeFiles = (files: TConvertedFile[], index: number) => {
    const copy = [...details];
    copy[index].media = files;
    setDetails(copy);
  };

  // const handleChangeText = (text: string, index: number) => {
  //   const copy = [...details];
  //   copy[index].text = text;
  //   setDetails(copy);
  // };
  const handleRemoveContent = (index: number) => {
    setDetails((p) => p.filter((c) => c !== p[index]));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setWaiting(true);
      const response = await fetch(apiConfig.news, {
        cache: "no-cache",
        method: "POST",
        body: JSON.stringify({ headlineContent, details }),
        headers: {
          "content-type": "application/json",
        },
      });
      const result: IResultProps = await response.json();
      console.log({ result });
      toast(result.message, { type: result.success ? "success" : "error" });
      localStorage.removeItem("news");
    } catch (error) {
      toast.error(getErrorMessage(error, "News post failed"));
      console.log({ error });
    } finally {
      setWaiting(false);
      router.refresh();
    }
  };

  // useEffect(() => {
  //   const savedNews = JSON.parse(localStorage.getItem("news") as string) as {
  //     headline: { image: TConvertedFile; text: string };
  //     details: unknown;
  //   };
  //   setDetails(savedNews.details as IPostNews["details"]);
  //   setHeadlineContent(savedNews.headline);
  // }, []);

  return (
    <form className="p-5 space-y-6" onSubmit={handleSubmit}>
      {/* Headline */}
      <header className="border-b-2 grid gap-4 py-4 mb-6">
        <Input
          value={headlineContent?.text}
          name="headlineText"
          onChange={(e) =>
            setHeadlineContent({
              image: headlineContent?.image as TConvertedFile,
              text: e.target.value,
            })
          }
          label="Headline text"
          placeholder="Type headline here..."
        />
        <div>
          <p className="_label">Wall image</p>
          <SingleFilePicker
            exportFile={(cf) =>
              setHeadlineContent({
                image: cf as TConvertedFile,
                text: headlineContent?.text as string,
              })
            }
            pickerId="news-headline"
            required
          />
        </div>
      </header>

      <h1 className="_subtitle">Details</h1>
      <main className="border border-border space-y-3 p-4">
        {details.map((detail, detIndex) => (
          <div key={detIndex} className="bg-base-100 flex items-start gap-2">
            {!detail.isText ? (
              <MultiFilePicker
                uniqueId={`media${detIndex}`}
                exportFiles={(files) => handleChangeFiles(files, detIndex)}
                fileWrapperStyles="grow"
                className=""
              />
            ) : (
              <></>
              // <RichTextEditor
              //   label=""
              //   onChange={(txt) => handleChangeText(txt, detIndex)}
              //   value=""
              //   placeholder="Write news here..."
              //   wrapperStyles="grow"
              // />
            )}

            <RemoveButton
              handleRemove={async () => handleRemoveContent(detIndex)}
              buttonText=""
              className="w-fit"
            />
          </div>
        ))}

        <div className="flex items-center gap-2 justify-end p-3">
          <Button
            onClick={() => handleAddContent(true)}
            className={`px-2 py-1 border _borderColor _secondaryBg hover:bg-base-300 `}
            title="Add text"
          >
            Add Text
          </Button>

          <Button
            title="Add files"
            onClick={() => handleAddContent(false)}
            className={`px-2 py-1 border _borderColor _secondaryBg hover:bg-base-300 `}
          >
            Add Files
          </Button>

          <Button
            title="Save"
            onClick={handleSave}
            className={`px-2 py-1 border _borderColor _secondaryBg hover:bg-base-300 `}
          >
            Save
          </Button>
        </div>
      </main>

      <Button
        type="submit"
        primaryText="Post news"
        waiting={waiting}
        disabled={waiting}
        waitingText="Posting..."
        className="_primaryBtn p-3 ml-auto"
      />
    </form>
  );
};

export default CreateNews;
