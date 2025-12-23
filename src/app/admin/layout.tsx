import { ReactNode } from "react";
import AdminFooter from "./Footer";
import { LeftPaneDesktop, LeftPaneMobile } from "./AdminSidebar";
import { Metadata } from "next";
import Image from "next/image";
import { staticImages } from "@/assets/images";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Admin",
  description: "konjiehifc admin",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="md:flex relative">
      <LeftPaneDesktop />
      <section className="flex-1 md:h-screen md:overflow-y-auto">
        <Header />

        <div className="pt-4 md:pt-2 bg-accent">{children}</div>

        <AdminFooter />
      </section>
    </main>
  );
}

const Header = async () => {
  const session = await auth( );
  const alias =
    session?.user?.name?.split(" ")?.[0] ??
    session?.user?.email?.split("@")?.[0];
    console.log({session})
  return (
    <header className="flex justify-between px-6 pt-2 sticky top-1 bg-accent z-20 items-center border-b border-border pb-3">
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
