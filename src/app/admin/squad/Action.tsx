"use client";

import { Button } from "@/components/buttons/Button";
import { DIALOG } from "@/components/Dialog";
import { Card, CardContent } from "@/components/ui/card";
import { apiConfig } from "@/lib/configs";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "sonner";

const SquadActionButtons = ({ squadId }: { squadId: string }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const params = useParams();

  const handleAction = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${apiConfig.squad}/${squadId ? squadId : params.squadId}`,

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
      } else toast.error(result.error || "An error occurred");
    } catch {
      toast.error("Failed to delete squad. Please try again.");
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  };

  return (
    <div className="my-12 ">
      <DIALOG
        trigger={`Delete Squad`}
        triggerStyles={`text-red-500 capitalize`}
        title={`Are you sure you want to Delete the Squad?`}
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

export default SquadActionButtons;
