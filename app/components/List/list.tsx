import { PropsWithChildren } from "react";

export const List = ({ children }: PropsWithChildren<{}>) => {
  return <main className="grid gap-5">{children}</main>;
};
