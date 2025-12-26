"use client";

import { ITemplate } from "./_templates";
import { Button } from "@/components/buttons/Button";
import { CgArrowLongRight } from "react-icons/cg";

interface TemplateItemProps {
  template?: ITemplate;
  className?: string;
  onClick: (template: ITemplate) => void;
}

const TemplateCard: React.FC<TemplateItemProps> = ({
  className,
  template,
  onClick,
}: TemplateItemProps) => {
  return (
    <>
      <div
        className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105 ${
          template?.isPopular ? "ring-2 ring-ring" : ""
        } ${className}`}
      >
        {template?.isPopular && (
          <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
            Popular
          </div>
        )}

        <div className="p-6">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {template?.title}
            </h2>
            <p className="text-gray-600 text-sm mb-4">{template?.tag}</p>
          </div>

          <div dangerouslySetInnerHTML={{ __html: template?.body ?? "" }} />

          <Button
            onClick={() => onClick(template as ITemplate)}
            className={`w-full flex items-center justify-center gap-2 rounded-lg py-3 px-6 transition-colors duration-200  `}
            variant={template?.isPopular ? "default" : "outline"}
          >
            <span>Select Template</span>
            <CgArrowLongRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default TemplateCard;
