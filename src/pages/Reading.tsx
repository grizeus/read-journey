import DocumentTitle from "../components/DocumentTitle";
import Dashboard from "../components/Dashboard";
import ReadingForm from "../components/ReadingForm";
import Progress from "../components/Progress";
import ReadingMain from "../components/ReadingMain";

const ReadingPage = () => {
  return (
    <div className="flex w-full flex-col gap-2.5 md:gap-4 xl:flex-row">
      <DocumentTitle>ReadJourney — Reading</DocumentTitle>
      <Dashboard className="pb-5 md:pb-4 xl:pb-5">
        <ReadingForm />
        <Progress />
      </Dashboard>
      <ReadingMain />
    </div>
  );
};

export default ReadingPage;
