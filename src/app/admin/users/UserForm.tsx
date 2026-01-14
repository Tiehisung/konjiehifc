"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IconInputWithLabel } from "@/components/input/Inputs";
import { Button } from "@/components/buttons/Button";
import { PrimarySelect } from "@/components/select/Select";
import { enumToOptions } from "../../../lib/select";
import { EUserRole, IUser } from "../../../types/user";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib";
import { fireDoubleEscape } from "@/hooks/Esc";
import { apiConfig } from "@/lib/configs";
import { useRouter } from "next/navigation";

export default function UserForm({ user }: { user?: IUser }) {
  const [serverError, setServerError] = useState("");
  const router = useRouter();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
    defaultValues: user
      ? { ...user, password: "" }
      : {
          name: "",
          email: "",
          password: "",
          role: EUserRole.ADMIN,
        },
  });

  const onSubmit = async (data: CreateUserInput) => {
    setServerError("");

    try {
      const res = await fetch(
        user ? `${apiConfig.users}/${user._id}` : apiConfig.users,
        {
          method: user ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();

      if (!result.success)
        return toast.warning(result.message || "Failed to create user");

      router.refresh();
      reset({ name: "", email: "", password: "", role: EUserRole.ADMIN });

      toast.success(result.message || "User created successfully");
      fireDoubleEscape();
    } catch (e) {
      toast.error(getErrorMessage(e));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md space-y-6 pt-5">
      {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

      <Controller
        control={control}
        name="name"
        render={({ field, fieldState }) => (
          <IconInputWithLabel
            label="Name"
            error={fieldState.error?.message}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({ field, fieldState }) => (
          <IconInputWithLabel
            label="Email"
            type="email"
            error={fieldState.error?.message}
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field, fieldState }) => (
          <IconInputWithLabel
            label="Password"
            type="password"
            error={fieldState.error?.message}
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="role"
        render={({ field, fieldState }) => (
          <PrimarySelect
            options={enumToOptions(EUserRole)}
            {...field}
            className="border p-2 w-full "
            triggerStyles="grow w-full py-2"
            label={<p className="text-muted-foreground">Role</p>} 
            error={fieldState.error?.message}
          />
        )}
      />

      <Button
        primaryText={user ? "Update User" : "Create User"}
        waiting={isSubmitting}
        waitingText={user ? "Updating..." : "Creating ..."}
        type="submit"
        className=" p-2 grow w-full justify-center"
      />
    </form>
  );
}
export const createUserSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.email("Invalid email"),
  password: z
    .string()
    .min(4, "Minimum 4 characters")
    .optional()
    .refine(
      (val) => !val || val.length >= 4, // Only validate if there's a value
      { message: "Password must be at least 4 characters" }
    ),
  role: z.enum(Object.values(EUserRole)),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
