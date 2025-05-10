import Dashboard from "../components/Dashboard";
import Filters from "../components/Filters";
import Quote from "../components/Quote";
import RecDescription from "../components/RecDescription";
import RecommededMain from "../components/RecommendedMain";

const RecommendedPage = () => {
  return (
    <div className="w-full flex flex-col xl:flex-row gap-2.5 md:gap-4">
      <Dashboard>
        <Filters />
        <RecDescription />
        <Quote />
      </Dashboard>
      <RecommededMain />
    </div>
  );
};

export default RecommendedPage;
