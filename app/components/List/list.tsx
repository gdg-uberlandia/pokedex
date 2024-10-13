import { PropsWithChildren } from "react";

export const List = ({ children }: PropsWithChildren<{}>) => {
  return <main className="grid">{children}</main>;
};
