"use client";

// import TextDivider from "@/components/Divider";
import { LoginBtn } from "@/components/auth/Auth";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useSession } from "next-auth/react";
// import { CredentialsLoginForm } from "./Credentials";

const LoginPage = () => {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-4">You are already logged in</h1>
        <p className="text-center">
          Go to{" "}
          <Link href="/admin" className="text-blue-500 underline">
            Admin Dashboard
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

        {/* <TextDivider text="OR" className="px-4 mt-5" /> */}

        {/* <CredentialsLoginForm /> */}
      </div>
    </div>
  );
};

export default LoginPage;


