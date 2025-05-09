import Dashboard from "../components/Dashboard";
import Filters from "../components/Filters";
import Quote from "../components/Quote";
import RecDescription from "../components/RecDescription";

const RecommendedPage = () => {
  return (
    <>
      <Dashboard>
        <Filters />

        <RecDescription />

        <Quote />
      </Dashboard>
    </>
  );
};

export default RecommendedPage;
