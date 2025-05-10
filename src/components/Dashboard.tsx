import clsx from "clsx";
import type { ReactNode } from "react";

interface DashboardProps {
  children: ReactNode;
  className?: string;
}

const Dashboard = ({ children, className }: DashboardProps) => {
  return (
    <aside
      className={clsx(
        "bg-charcoal-black mb-2.5 rounded-4xl p-5 md:mb-4 md:flex md:gap-10 md:p-8 xl:mb-0 xl:flex-col xl:gap-5 xl:px-5 xl:pt-10 xl:pb-5",
        className
      )}>
      {children}
    </aside>
  );
};

export default Dashboard;
