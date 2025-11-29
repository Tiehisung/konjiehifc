"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MegaSponsors } from "@/app/sponsorship/MegaSponsors";
import { kfc } from "@/data/kfc";

export default function FooterCP({}) {
  const pathname = usePathname()
  return (
    <main
      hidden={pathname.includes("/admin")}
      className={`bg-Orange mt-5`}
    >
      <MegaSponsors />

      <br />
      <div className=" flex gap-2 items-center p-6 mx-auto justify-center">
        <Link href={"/"} className=" mr-3">
          <Image src={kfc.logo} width={40} height={40} priority alt="logo" />
        </Link>

        <cite>&copy; {new Date().getFullYear()}</cite>
      </div>
    </main>
  );
}
