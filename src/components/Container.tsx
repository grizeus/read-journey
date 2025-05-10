import type { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mx-auto px-5 lg:px-8">
      {children}
    </div>
  );
};

export default Container;
