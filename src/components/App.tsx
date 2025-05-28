import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router";
import Layout from "./Layout";

const LibraryPage = lazy(() => import("../pages/Library"));
const ReadingPage = lazy(() => import("../pages/Reading"));
const RecommendedPage = lazy(() => import("../pages/Recommended"));
const SignUpPage = lazy(() => import("../pages/SignUpPage"));
const SigninPage = lazy(() => import("../pages/SigninPage"));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<SigninPage />} />
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
