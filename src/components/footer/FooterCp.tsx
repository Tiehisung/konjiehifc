"use client";

import Link from "next/link";
import Logo from "@/app/favicon.ico";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MegaSponsors } from "@/app/sponsorship/Sponsors";

export default function FooterCP({}) {
  const pathname = usePathname()
  return (
    <main
      hidden={pathname.includes("/admin")}
      className={`bg-Orange mt-5`}
    >
      <MegaSponsors />

      <br />
      <div className=" flex gap-2 items-center p-6">
        <Link href={"/"} className=" mr-3">
          <Image src={Logo} width={40} height={40} priority alt="logo" />
        </Link>

        <cite>&copy; {new Date().getFullYear()}</cite>
      </div>
    </main>
  );
}
