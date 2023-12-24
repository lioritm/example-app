import * as React from "react";

export interface IErrorTextProps {
  error: string;
  className?: string;
}

export function Error(props: IErrorTextProps) {
  const { error } = props;

  if (error === "") return null;

  return (
    <small className={`text-red-500 mt-1 ${props.className}`}>{error}</small>
  );
}
