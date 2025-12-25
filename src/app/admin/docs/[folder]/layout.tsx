import { ReactNode } from "react";
interface IProps {
  children: ReactNode;
}
const DocsLayout = ({ children }: IProps) => {
  return (
    <div className="_page">
      <main>{children}</main>
    </div>
  );
};

export default DocsLayout;
