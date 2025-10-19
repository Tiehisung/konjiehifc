"use client";

import { Button } from "@/components/buttons/Button";
import { DIALOG } from "@/components/Dialog";
import { Card, CardContent } from "@/components/ui/card";
import { apiConfig } from "@/lib/configs";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { MdDeleteForever, MdPublish, MdUnpublished } from "react-icons/md";
import { toast } from "sonner";

const ActionButtonNews = ({
  newsId,
  type = "Unpublish",
}: {
  newsId?: string;
  type?: "Publish" | "Unpublish" | "Delete";
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const params = useParams();

  const handleAction = async () => {
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
          body: JSON.stringify({
            isPublished: type == "Publish" ? true : false,
          }),
        }
      );
      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        if (type == "Delete") router.back();
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
            triggerStyles={`${
              type == "Publish" ? "_primaryBtn" : "_deleteBtn"
            }  capitalize`}
            title={`Are you sure you want to ${type} the news?`}
            closeId={""}
          >
            <Card>
              <CardContent>
                {type == "Publish" && (
                  <Button
                    onClick={handleAction}
                    type="submit"
                    waitingText="Publishing news..."
                    waiting={isLoading}
                    className="_primaryBtn justify-center mx-auto"
                  >
                    <MdPublish className="h-4 w-4 mr-2" />
                    {type}
                  </Button>
                )}

                {type == "Unpublish" && (
                  <Button
                    onClick={handleAction}
                    type="submit"
                    waitingText="Processing record..."
                    waiting={isLoading}
                    className="_secondaryBtn justify-center mx-auto"
                  >
                    <MdUnpublished className="h-4 w-4 mr-2" />
                    {type}
                  </Button>
                )}

                {type == "Delete" && (
                  <Button
                    onClick={handleAction}
                    type="submit"
                    waitingText="Processing record..."
                    waiting={isLoading}
                    className="_deleteBtn justify-center mx-auto"
                  >
                    <MdDeleteForever className="h-4 w-4 mr-2" />
                    {type}
                  </Button>
                )}
              </CardContent>
            </Card>
          </DIALOG>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActionButtonNews;
