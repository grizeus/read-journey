import AddBook from "../components/AddBook";
import Dashboard from "../components/Dashboard";
import DocumentTitle from "../components/DocumentTitle";
import LibraryMain from "../components/LibraryMain";
import RecommendedBooks from "../components/RecommendedBooks";

const LibraryPage = () => {
  return (
    <div className="flex w-full flex-col gap-2.5 md:gap-4 xl:flex-row">
      <DocumentTitle>ReadJourney — Library</DocumentTitle>
      <Dashboard className="xl:gap-19.5">
        <AddBook />
        <RecommendedBooks />
      </Dashboard>
      <LibraryMain />
    </div>
  );
};

export default LibraryPage;
