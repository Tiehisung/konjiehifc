"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IconInputWithLabel } from "@/components/input/Inputs";
import { Button } from "@/components/buttons/Button";
import { PrimarySelect } from "@/components/select/Select";
import { enumToOptions } from "../../../lib/select";
import { EUserRole } from "../../../types/user";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib";
import { fireEscape } from "@/hooks/Esc";
import { apiConfig } from "@/lib/configs";

export default function AddUser() {
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: EUserRole.ADMIN,
    },
  });

  const onSubmit = async (data: CreateUserInput) => {
    setServerError("");
    setSuccess(false);

    try {
      const res = await fetch(apiConfig.users, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setServerError(result.error);
        return;
      }

      setSuccess(true);
      reset();
      toast.success("User created successfully");
      fireEscape();
    } catch (e) {
      toast.error(getErrorMessage(e));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md space-y-6">
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
            error={fieldState.error?.message}
            triggerStyles="grow w-full justify-center"
          />
        )}
      />

      <Button
        primaryText="Create User "
        waiting={isSubmitting}
        waitingText="Creating ..."
        type="submit"
        className=" _primaryBtn p-2 grow w-full justify-center"
        variant="secondary"
      />
    </form>
  );
}

export const createUserSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.email("Invalid email"),
  password: z.string().min(6, "Minimum 6 characters"),
  role: z.enum(Object.values(EUserRole)),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
