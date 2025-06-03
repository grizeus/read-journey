import type { ReactNode } from "react";
import { Helmet } from "react-helmet-async";

export default function DocumentTitle({ children }: { children: ReactNode }) {
  return (
    <Helmet>
      <title>{children}</title>
    </Helmet>
  );
}
