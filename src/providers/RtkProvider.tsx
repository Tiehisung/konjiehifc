 
import { Provider } from "react-redux";

import { ReactNode } from "react";
import   store   from "@/features/store";

export default function RTKStoreProvider({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
