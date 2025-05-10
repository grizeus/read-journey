import AddBook from "../components/AddBook";
import Dashboard from "../components/Dashboard";
import LibraryMain from "../components/LibraryMain";
import RecommendedBooks from "../components/RecommendedBooks";

const LibraryPage = () => {
  return (
    <div className="flex w-full flex-col gap-2.5 md:gap-4 xl:flex-row">
      <Dashboard>
        <AddBook />
        <RecommendedBooks />
      </Dashboard>
      <LibraryMain />
    </div>
  );
};

export default LibraryPage;
