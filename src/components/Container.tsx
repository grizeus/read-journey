import type { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mx-auto max-w-360 px-10 md:px-29.5 lg:px-32">
      {children}
    </div>
  );
};

export default Container;
