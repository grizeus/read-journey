import DocumentTitle from "../components/DocumentTitle";
import Dashboard from "../components/Dashboard";
import ReadingForm from "../components/ReadingForm";
import Progress from "../components/Progress";
import RecommededMain from "../components/RecommendedMain";

const ReadingPage = () => {
  <div className="flex w-full flex-col gap-2.5 md:gap-4 xl:flex-row">
    <DocumentTitle>ReadJourney — Reading</DocumentTitle>
    <Dashboard>
      <ReadingForm />
      <Progress />
    </Dashboard>
    <RecommededMain />
  </div>;
};

export default ReadingPage;
