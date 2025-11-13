import { ReactNode } from "react";
import AdminFooter from "./Footer";
import { LeftPaneDesktop, LeftPaneMobile } from "./AdminSidebar";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import Image from "next/image";
import { staticImages } from "@/assets/images";

export const metadata: Metadata = {
  title: "Admin",
  description: "konjiehifc admin",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="md:flex  ">
      <LeftPaneDesktop />
      <section className="flex-1 md:h-screen md:overflow-y-auto">
        <Header />

        <div className="max-md:pt-4 pt-2 px-[4vw] bg-accent">{children}</div>

        <AdminFooter />
      </section>
    </main>
  );
}

const Header = async () => {
  const session = await getServerSession(authOptions);
  const alias =
    session?.user?.name?.split(" ")?.[0] ??
    session?.user?.email?.split("@")?.[0];
  return (
    <header className="flex justify-between px-6 pt-2 sticky top-1">
      <LeftPaneMobile />

      <div className="flex items-center gap-3 text-sm ml-auto divide-x">
        <div className="_label">
          <p className="text-xs italic font-light ">Admin</p>
          <p>{alias}</p>
        </div>
        <Image
          alt="avatar"
          src={session?.user?.image ?? staticImages.avatar}
          width={120}
          height={120}
          className="h-10 w-10 min-h-10 rounded-full object-cover "
        />
      </div>
    </header>
  );
};
