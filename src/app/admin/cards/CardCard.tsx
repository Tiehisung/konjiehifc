import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/timeAndDate";
import { Calendar, User } from "lucide-react";
import Image from "next/image";
import React, { ReactNode } from "react";
import { CardForm } from "./CardForm";
import { DIALOG } from "@/components/Dialog";
import { ConfirmDialog } from "@/components/Confirm-dialog";
import { ICard } from "@/types/card.interface";
import { IPlayer } from "@/types/player.interface";

interface IProps {
  card: ICard;
  selectedPlayer?: IPlayer;
  badge: ReactNode;
}
const CardCard = ({ card, selectedPlayer, badge }: IProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              {badge}
              <span className="text-sm text-muted-foreground">
                {formatDate(card.createdAt)}
                {card.minute && ` • Minute ${card.minute}`}
              </span>
            </div>


            <p className="text-muted-foreground mb-3">{card.description}</p>

            <div className="flex items-center gap-4 text-sm">
              {!selectedPlayer && (
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center">
                    {card?.player?.avatar ? (
                      <Image
                        src={card?.player?.avatar}
                        alt={card?.player?.name}
                        className="h-6 w-6 rounded-full object-cover"
                        width={200}
                        height={200}
                        priority
                      />
                    ) : (
                      <User className="h-3 w-3" />
                    )}
                  </div>
                  <span className="font-medium">{card?.player?.name}</span>
                  <span className="text-muted-foreground">
                    #{card?.player?.number}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>Reported {formatDate(card.createdAt)}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <DIALOG
              trigger={"Edit"}
              variant={"outline"}
              triggerStyles="text-sm p-1.5 px-2"
            >
              <CardForm match={undefined} card={card} />
            </DIALOG>

            <ConfirmDialog
              description={`Are you sure you want to delete this card? \n <i>${card?.description??''}</>`}
              action={{
                method: "DELETE",
                uri: `/cards/${card._id}`,
              }}
              trigger="Resolve"
              variant={"destructive"}
              title={card.type}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CardCard;
