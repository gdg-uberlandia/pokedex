import { PropsWithChildren } from "react";

export const List = ({ children }: PropsWithChildren<{}>) => {
  return <ul className="grid">{children}</ul>;
};
