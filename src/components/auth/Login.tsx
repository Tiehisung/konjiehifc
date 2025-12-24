"use client";

import { CredentialsLoginForm } from "@/app/auth/login/Credentials";
import { Button } from "../buttons/Button";
import { DIALOG } from "../Dialog";
import { LoginBtn } from "./Auth";
import { FcGoogle } from "react-icons/fc";
import TextDivider from "../Divider";

const AdminLoginController = ({ className }: { className?: string }) => {
  return (
    <>
      <DIALOG
        trigger={
          <Button
            primaryText="Login"
            className={
              "_secondaryBtn justify-center px-2 py-1 h-full " + className
            }
          />
        }
        title={undefined}
      >
        <div className="text-center px-4">
          <LoginBtn
            text="Sign In with Google"
            variant={"outline"}
            className=" w-full "
          >
            <FcGoogle size={24} />
          </LoginBtn>
        </div>
        <TextDivider text="OR" className="px-4 mt-10" />
        <CredentialsLoginForm />
      </DIALOG>
    </>
  );
};

export default AdminLoginController;
