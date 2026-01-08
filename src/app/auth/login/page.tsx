"use client";

// import TextDivider from "@/components/Divider";
import { LoginBtn } from "@/components/auth/Auth";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useSession } from "next-auth/react";
import { IUser } from "@/types/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginPage = () => {
  const { data: session } = useSession();

  const router = useRouter();

  //Return if logged in
  useEffect(() => {
    if (session) router.back();
  }, [session]);

  //may not display
  if (session?.user) {
    const path =
      (session.user as IUser).role == "player"
        ? "/players/dashboard"
        : "/admin";
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-4">You are already logged in</h1>
        <p className="text-center">
          Go to{" "}
          <Link href={path} className="text-blue-500 underline">
            Dashboard
          </Link>
        </p>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col  pt-20 items-center">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <div className=" flex flex-col gap-5 rounded-2xl min-w-2xs md:min-w-xl max-w-md mx-auto border pt-6">
        <LoginBtn
          text="Sign In with Google"
          variant={"outline"}
          className="mx-4"
        >
          <FcGoogle size={24} />
        </LoginBtn>

        <br />
      </div>
    </div>
  );
};

export default LoginPage;
