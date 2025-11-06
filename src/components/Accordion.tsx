import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ReactNode } from "react";

export interface IAccordionProps {
  className?: string;
  data?: {
    trigger: ReactNode;
    value: string;
    content: ReactNode;
    isDefault?: boolean;
  }[];
  triggerStyles?: string;
}
export function PrimaryAccordion(props: IAccordionProps) {
  if (!props.data || props.data.length === 0) {
    return <p>No data available.</p>;
  }
  return (
    <Accordion
      type="single"
      collapsible
      className={props.className}
      defaultValue={props.data?.find((d) => d.isDefault)?.value}
    >
      {props.data?.map((d) => (
        <AccordionItem value={d.value} key={d.value} className="group">
          <AccordionTrigger className={` ${props.triggerStyles}`}>
            {d.trigger}
          </AccordionTrigger>
          <AccordionContent>{d.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
