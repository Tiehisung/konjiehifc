import { LoginBtn } from "@/components/auth/Auth";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { ISession, IUser } from "@/types/user";
import { IPageProps } from "@/types";
import TextDivider from "@/components/Divider";
import { CredentialsLoginForm } from "./Credentials";
import { auth } from "@/auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const LoginPage = async ({ searchParams }: IPageProps) => {
  const callbackUrl = (await searchParams).callbackUrl ?? "/";

  console.log({ callbackUrl });
  const error = (await searchParams).error;

  const session = await auth();

  if (session?.user as ISession["user"]) {
    const path =
      (session?.user as IUser).role == "player"
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
      <div className="px-4 flex flex-col gap-5 rounded-2xl min-w-2xs md:min-w-xl max-w-md mx-auto border pt-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle />
            <AlertTitle>{error}</AlertTitle>
            <AlertDescription>
              Credentials error! Check your credentials and try again.
            </AlertDescription>
          </Alert>
        )}
        
        <LoginBtn
          text="Sign In with Google"
          variant={"outline"}
          redirectTo={callbackUrl}
        >
          <FcGoogle size={24} />
        </LoginBtn>

        <TextDivider />
        <CredentialsLoginForm />

        
      </div>
    </div>
  );
};

export default LoginPage;
