import { MouseEventHandler } from "react";
import { VscLoading } from "react-icons/vsc";

interface ButtonProps {
  primaryText?: string;
  waiting?: boolean;
  waitingText?: string;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  type?: "submit" | "button" | "reset";
}

interface ClickButtonProps extends ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  title?: string;
}

export function Button({
  primaryText,
  waiting = false,
  waitingText = "Processing...",
  className = "_primaryBtn flex items-baseline gap-1",
  disabled = false,
  type = "button",
  onClick,
  children,
  title = "",
}: ClickButtonProps) {
  return (
    <button
      disabled={waiting || disabled}
      className={`flex items-center gap-2 font-semibold ${className} ${
        waiting ? "cursor-wait" : "cursor-pointer"
      }`}
      type={type}
      onClick={onClick}
      title={title}
    >
      {children}
      {waiting ? (
        <span
          className={`flex items-center gap-2 w-fit min-w-max justify-between whitespace-nowrap disabled:pointer-events-none disabled:hover:bg-transparent overflow-hidden active:scale-95 transition-all`}
        >
          <VscLoading className={` animate-spin `} />
          {waitingText}
        </span>
      ) : (
        <span hidden={!primaryText}>{primaryText}</span>
      )}
    </button>
  );
}
