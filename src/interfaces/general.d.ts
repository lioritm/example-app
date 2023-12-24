import { ReactNode } from "react";

export type TabOptions = "info" | "actions";

export interface LooseObject {
  [key: string]: any;
}
export interface IProtectedRoutes {
  children: ReactNode;
}
