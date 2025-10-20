"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineClear } from "react-icons/ai";
import { CgRemove } from "react-icons/cg";
import { GrClear } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbClearAll } from "react-icons/tb";

export default function DeleteButton({
  className = "remove__btn",
  handleDelete,
  buttonText = "Delete",
  disabled = false,
  iconStyle = " ",
  title = "Delete",
}: {
  className?: string;
  handleDelete: () => Promise<void>;
  buttonText?: string;
  disabled?: boolean;
  iconStyle?: string;
  title?: string;
}) {
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);

  const handleDeleleItem = async () => {
    setWaiting(true);
    try {
      await handleDelete();
    } catch (error) {
      console.log(error);
    } finally {
      setWaiting(false);
      router.refresh();
    }
  };
  return (
    <button
      onClick={handleDeleleItem}
      className={`flex items-center gap-1 ${className} `}
      disabled={disabled || waiting}
      style={{ color: waiting ? "red" : "" }}
      type="button"
      title={title}
    >
      <RiDeleteBinLine className={`${iconStyle}`} />
      {buttonText}
    </button>
  );
}

interface RemoveButtonProps {
  className?: string;
  handleRemove: () => Promise<void>;
  buttonText?: string;
  disabled?: boolean;
  iconStyle?: string;
  title?: string;
}

export function RemoveButton({
  className = "_deleteBtn",
  handleRemove,
  buttonText = "Remove",
  disabled = false,
  iconStyle = " ",
  title = "Remove",
}: RemoveButtonProps) {
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);

  const handleRemoveItem = async () => {
    setWaiting(true);
    try {
      await handleRemove();
    } catch (error) {
      console.log(error);
    } finally {
      setWaiting(false);
      router.refresh();
    }
  };
  return (
    <button
      onClick={handleRemoveItem}
      className={`flex items-center gap-1 ${className} `}
      disabled={disabled || waiting}
      style={{ color: waiting ? "red" : "" }}
      type="button"
      title={title}
    >
      <CgRemove className={`${iconStyle}`} />
      {buttonText}
    </button>
  );
}

interface ClearButtonProps {
  className?: string;
  handleClear: () => Promise<void>;
  buttonText?: string;
  disabled?: boolean;
  iconStyle?: string;
  title?: string;
  type?: number;
}

export function ClearButton({
  className = "remove__btn",
  handleClear,
  buttonText = "Clear",
  disabled = false,
  iconStyle = " ",
  title = "Clear",
  type = 1,
}: ClearButtonProps) {
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);

  const handleClearItems = async () => {
    setWaiting(true);
    try {
      await handleClear();
    } catch (error) {
      console.log(error);
    } finally {
      setWaiting(false);
      router.refresh();
    }
  };
  return (
    <button
      onClick={handleClearItems}
      className={`flex items-center gap-1 ${className} `}
      disabled={disabled || waiting}
      style={{ color: waiting ? "red" : "" }}
      type="button"
      title={title}
    >
      {type == 1 ? (
        <GrClear className={`${iconStyle}`} />
      ) : type == 2 ? (
        <TbClearAll className={`${iconStyle}`} />
      ) : (
        <AiOutlineClear className={`${iconStyle}`} />
      )}

      {buttonText}
    </button>
  );
}
