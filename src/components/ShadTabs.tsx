import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import React, { FC, ReactNode } from "react";
interface ITabs {
  className?: string;
  tabs: Array<{ value: string; label: ReactNode }>;
  defaultValue?: string;
  content: Array<ReactNode>;
}
export const ShadTabs: FC<ITabs> = (props) => {
  return (
    <Tabs
      defaultValue={props.defaultValue}
      className={`w-[400px] ${props.className}`}
    >
      <TabsList>
        {props.tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {props.content.map((cont, i) => (
        <TabsContent key={i} value={props.tabs[i].value}>
          {cont}
        </TabsContent>
      ))}
    </Tabs>
  );
};
