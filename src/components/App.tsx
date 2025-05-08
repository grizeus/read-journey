import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router";
import Layout from "./Layout";

const LibraryPage = lazy(() => import("../pages/Library"));
const ReadingPage = lazy(() => import("../pages/Reading"));  
const RecommendedPage = lazy(() => import("../pages/Recommended"));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/recommended" replace />} />
        <Route path="/recommended" element={<RecommendedPage />} />
        <Route path="/library" element={<LibraryPage />} />
          <Route path="/reading" element={<ReadingPage />} />
        </Route>
      </Routes>

    </Suspense>
  );
};

export default App;
