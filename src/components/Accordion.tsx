import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ReactNode } from "react";

export interface IAccordionProps {
  className?: string;
  data: { trigger: ReactNode; value: string; content: ReactNode }[];
}
export function PrimaryAccordion(props: IAccordionProps) {
  return (
    <Accordion type="single" collapsible className={props.className}>
      {props.data?.map((d) => (
        <AccordionItem value={d.value} key={d.value}>
          <AccordionTrigger>{d.trigger}</AccordionTrigger>
          <AccordionContent>{d.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
