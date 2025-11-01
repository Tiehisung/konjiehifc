import Image from "next/image";
import { ReactNode } from "react";
import VerticalSwiper from "./carousel/vertical";

interface IProps {
  className?: string;
  bg?: string;
  slides?: string[];
  children: ReactNode;
  graphicStyles?: string;
}

export function GraphicWrapper({
  bg,
  slides = [],
  className,
  children,
  graphicStyles = " max-md:hidden",
}: IProps) {
  return (
    <div
      className={`flex flex-wrap lg:flex-row items-start w-full ${className}`}
    >
      <div className="grow ">{children}</div>

      <div className={"h-full grow " + graphicStyles}>
        {bg ? (
          <Image
            alt="signing"
            src={bg}
            className="h-full w-auto "
            width={500}
            height={500}
          />
        ) : (
          <VerticalSwiper
            slides={slides.map((s) => (
              <Image
                alt="signing"
                src={s}
                className="max-h-[70vh] h-auto w-full bg-cover ring"
                width={500}
                height={500}
              />
            ))}
            showNavigation={false}
            showPagination={false}
          />
        )}
      </div>
    </div>
  );
}
