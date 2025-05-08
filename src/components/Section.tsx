import type { ReactNode } from "react";

const Section = ({ children }: { children: ReactNode }) => {
  return <section className="w-full">{children}</section>;
};

export default Section;
