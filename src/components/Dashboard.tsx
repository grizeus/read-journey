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
        "bg-charcoal-black mb-2.5 rounded-4xl p-5 md:mb-4 md:flex md:gap-8 md:p-8 lg:mb-0 lg:flex-col lg:gap-5 lg:px-5 lg:pt-10 lg:pb-5",
        className
      )}>
      {children}
    </aside>
  );
};

export default Dashboard;
