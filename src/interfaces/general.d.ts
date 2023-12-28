import { ReactNode } from "react";

export type TabOptions = "info" | "actions";

export interface LooseObject {
  [key: string]: any;
}
export interface IProtectedRoutes {
  children: ReactNode;
}
export interface IModal {
  cancelModal: function;
  okModal?: function;
  title?: string;
  content?: string;
  okText?: string;
  cancelText?: string;
}

export interface IAuthForm {
  type: { type: "login" | "signup" | "forgot" };
  handleSubmit: function;
}
