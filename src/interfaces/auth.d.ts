export type IAuthTypes = "login" | "signup" | "forgot";
export interface IAuthForm {
  type: IAuthTypes;
  handleSubmit: function;
  authenticating: boolean;
  error: string;
  setAuthenticating: React.Dispatch<React.SetStateAction>;
}
export interface IAuthContainer {
  type: IAuthTypes;
  children: JSX.Element | JSX.Element[];
}

export interface IAuthCred {
  email: string;
  password?: string;
  repeatPassword?: string;
}
