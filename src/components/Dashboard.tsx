import type { ReactNode } from "react";
import clsx from "clsx";

interface DashboardProps {
  children: ReactNode;
  className?: string;
}

const Dashboard = ({ children, className }: DashboardProps) => {
  return (
    <aside
      className={clsx(
        "bg-charcoal-black mb-2.5 rounded-4xl p-5 md:mb-4 md:flex md:gap-10 md:p-8 xl:mb-0 xl:w-88 xl:flex-col xl:gap-5 xl:px-5 xl:pt-10",
        className
      )}>
      {children}
    </aside>
  );
};

export default Dashboard;
