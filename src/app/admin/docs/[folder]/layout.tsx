import React, { ReactNode } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
interface IProps {
  children: ReactNode;
}
const DocsLayout = ({ children }: IProps) => {
  
  return (
    <div className="_page">
      <Breadcrumbs />
      <main>{children}</main>
    </div>
  );
};

export default DocsLayout;
