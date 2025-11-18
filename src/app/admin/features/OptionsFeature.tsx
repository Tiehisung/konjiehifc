"use client";
import { Input } from "@/components/input/Inputs";

import { FormEvent, useState } from "react";

import { apiConfig } from "@/lib/configs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getErrorMessage } from "@/lib";
import { fireEscape } from "@/hooks/Esc";
import { ISelectOptionLV } from "@/types";
import { Button } from "@/components/buttons/Button";
import { AiTwotoneDelete } from "react-icons/ai";
import { ConfirmActionButton } from "@/components/buttons/ConfirmAction";
import { IoMdRemove } from "react-icons/io";

export interface IFeature<T = ISelectOptionLV> {
  _id?: string;
  name: string;
  data: T;
}

interface IProps {
  feature?: IFeature<ISelectOptionLV[]>;
}

export function FeatureForm({ feature }: IProps) {
  const router = useRouter();
  const session = useSession();

  const [waiting, setWaiting] = useState(false);
  const [isEditing, setIsEditing] = useState(!feature);

  const [featureData, setFeatureData] = useState(feature?.data ?? []);
  const [name, setName] = useState(feature?.name ?? "");

  const onSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setWaiting(true);
      const response = await fetch(`${apiConfig.features}`, {
        method: feature ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-cache",
        body: JSON.stringify({
          user: session?.data?.user,
          name: name,
          data: featureData,
          _id: feature?._id,
        }),
      });
      const results = await response.json();
      if (results.success) {
        toast.success(results.message);
        fireEscape();
      } else toast.error(results.message);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setWaiting(false);
      router.refresh();
    }
  };

  const onChange = (option: ISelectOptionLV, index: number) => {
    const toModify = featureData[index];
    const modified = { ...toModify, ...option };
    const newData = [...featureData].map((feat, i) =>
      i !== index ? feat : modified
    );
    setFeatureData(newData);
  };
  return (
    <div>
      <form
        className="  grow grid gap-2.5 _card bg-card w-full "
        onSubmit={onSave}
      >
        <header className="flex items-center gap-6 justify-between">
          {feature ? (
            <p className="_label mb-3 text-muted-foreground">{feature?.name}</p>
          ) : (
            <Input
              name={"new-name"}
              placeholder="Feature Name"
              value={name}
              onChange={(e) => setName(e.target.value)} required
            />
          )}
          {feature && (
            <Button
              onClick={() => {
                if (isEditing) {
                  setFeatureData(feature?.data ?? []);
                }
                setIsEditing((p) => !p);
              }}
              primaryText={isEditing ? "Restore" : "Edit"}
              className="text-primaryBlue _hover px-1"
            />
          )}
        </header>
        {featureData?.map((fd, index) => (
          <div className="group grid grid-cols-2 gap-2.5 " key={`fd${index}`}>
            <Input
              name="label"
              value={fd.label}
              onChange={(e) =>
                onChange({ ...fd, label: e.target.value }, index)
              }
              className="grow "
              placeholder="Key"
              required
              others={{ disabled: !isEditing }}
            />
            <div className="flex items-center gap-1.5 grow ">
              <Input
                name="value"
                value={fd.value}
                onChange={(e) =>
                  onChange(
                    { ...fd, value: e.target.value.toLowerCase() },
                    index
                  )
                }
                className="flex grow "
                wrapperStyles="grow "
                placeholder="Value"
                required
                others={{ disabled: !isEditing }}
              />
              {isEditing && (
                <IoMdRemove
                  size={32}
                  className="lg:invisible group-hover:visible _slowTrans _hover h-fit p-0.5 rounded text-red-500 bg-accent/50"
                  onClick={() =>
                    setFeatureData((p) => p.filter((_, i) => i !== index))
                  }
                />
              )}
            </div>
          </div>
        ))}

        {isEditing && (
          <Button
            onClick={() => {
              if (featureData.find((f) => !f.label || !f.value))
                return toast.error("Fill out all fields");
              setFeatureData((p) => [...p, { label: "", value: "" }]);
            }}
            primaryText="Add Option"
            disabled={
              waiting ||
              (featureData.find((f) => !f.label || !f.value) ? true : false)
            }
            className="w-fit px-1.5 py-0.5 justify-center"
            variant="outline"
          />
        )}

        <div className="flex items-center gap-3.5">
          {isEditing && (
            <Button
              primaryText="SAVE"
              waiting={waiting}
              waitingText="Saving..."
              className="grow justify-center"
              variant="primary"
              type="submit"
            />
          )}
          {feature && (
            <ConfirmActionButton
              method={"DELETE"}
              trigger={
                <span className=" _deleteBtn text-xs ml-auto">Delete</span>
              }
              primaryText=""
              loadingText="Deleting..."
              uri={`${apiConfig.features}`}
              body={{ _id: feature?._id }}
              variant="destructive"
              title={`Delete ${feature?.name}`}
              confirmText={`Are you sure you want to delete "${feature?.name}"?`}
              escapeOnEnd
            >
              <AiTwotoneDelete />
            </ConfirmActionButton>
          )}
        </div>
      </form>
    </div>
  );
}
