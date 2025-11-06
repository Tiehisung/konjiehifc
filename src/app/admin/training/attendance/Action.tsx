"use client";

import { Button } from "@/components/buttons/Button";
import { DIALOG } from "@/components/Dialog";
import { Card, CardContent } from "@/components/ui/card";
import { fireEscape } from "@/hooks/Esc";
import { apiConfig } from "@/lib/configs";
import { IUser } from "@/types/user";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "sonner";

const TrainingActionButtons = ({ trainingId }: { trainingId: string }) => {
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const params = useParams();

  const handleAction = async () => {
    try {
      const user = session.data?.user as IUser | undefined;
      if (user?.role !== "super_admin")
        return toast.warning(
          "Restricted access. Kindly contact Super Admin for access"
        );
      setIsLoading(true);
      const response = await fetch(
        `${apiConfig.trainingSession}/${
          trainingId ? trainingId : params.trainingId
        }`,

        {
          method: "DELETE",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        fireEscape();
      } else toast.error(result.error || "An error occurred");
    } catch {
      toast.error("Failed to delete addendance. Please try again.");
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  };

  return (
    <div className="my-12 ">
      <DIALOG
        trigger={`Delete Attendance`}
        triggerStyles={`text-red-500 capitalize`}
        title={`Are you sure you want to Delete the Attendance?`}
        closeId={""}
      >
        <Card>
          <CardContent>
            <Button
              onClick={handleAction}
              type="submit"
              waitingText="Processing record..."
              primaryText="Delete Squad"
              waiting={isLoading}
              className="_deleteBtn justify-center mx-auto"
            >
              <MdDeleteForever className="h-4 w-4 mr-2" />
            </Button>
          </CardContent>
        </Card>
      </DIALOG>
    </div>
  );
};

export default TrainingActionButtons;
