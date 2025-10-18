"use client";

import { Button } from "@/components/buttons/Button";
import { DIALOG } from "@/components/Dialog";
import { Card, CardContent } from "@/components/ui/card";
import { apiConfig } from "@/lib/configs";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "sonner";

const UnpublishNews = ({
  newsId,
  type = "Unpublish",
}: {
  newsId?: string;
  type?: "Unpublish" | "Delete";
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const params = useParams();

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${apiConfig.news}/${newsId ? newsId : params.newsId}`,

        {
          method: type == "Delete" ? "DELETE" : "PUT",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        router.back();
      } else toast.error(result.error || "An error occurred");
    } catch (error) {
      console.error("Error saving record:", error);
      toast.error("Failed to save record. Please try again.");
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  };
  return (
    <div className="my-12">
      <Card>
        <CardContent>
          <DIALOG
            trigger={`${type} this news`}
            triggerStyles="_deleteBtn capitalize"
            title={`Are you sure you want to ${type} the record?`}
            closeId={""}
          >
            <Card>
              <CardContent>
                <Button
                  onClick={handleDelete}
                  type="submit"
                  waitingText="Deleting record..."
                  waiting={isLoading}
                  className="_deleteBtn justify-center mx-auto"
                >
                  <MdDeleteForever className="h-4 w-4 mr-2" />
                  {type}
                </Button>
              </CardContent>
            </Card>
          </DIALOG>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnpublishNews;
