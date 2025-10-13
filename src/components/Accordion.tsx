import { ReactNode } from "react";

interface AccordionProps {
  headers: ReactNode[];
  children: ReactNode[];
  defaultCheckIndex?: number;
}
const Accordion = ({
  headers,
  children,
  defaultCheckIndex,
}: AccordionProps) => {
  if (headers.length !== children.length)
    return (
      <div className="text-error border">
        Invalid data. Number of &apos;headers&apos; must be equal to number of
        &apos;children&apos;
      </div>
    );
  return (
    <div>
      {children.map((child, index) => {
        return (
          <div className="collapse " key={index}>
            <input
              type="radio"
              name="my-accordion-1"
              defaultChecked={defaultCheckIndex == index}
            />
            <div className="collapse-title text-xl font-medium">
              {headers[index]}
            </div>
            <div className="collapse-content">{child}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
