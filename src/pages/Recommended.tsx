import Dashboard from "../components/Dashboard";
import DocumentTitle from "../components/DocumentTitle";
import Filters from "../components/Filters";
import Quote from "../components/Quote";
import RecDescription from "../components/RecDescription";
import RecommededMain from "../components/RecommendedMain";

const RecommendedPage = () => {
  return (
    <div className="flex w-full flex-col gap-2.5 md:gap-4 xl:flex-row">
      <DocumentTitle>ReadJourney — Recommended</DocumentTitle>
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
