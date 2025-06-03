import { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import Layout from "./Layout";
import PrivateRoute from "../routes/PrivateRoute";
import RestrictedRoute from "../routes/RestrictedRoute";
import type { AppDispatch } from "../redux/store";
import { selectIsLoading, selectIsRefreshing } from "../redux/auth/selectors";
import { getCurrentUser } from "../redux/auth/operations";
import Loader from "./Loader";
import CustomToaster from "./Toaster";
const LibraryPage = lazy(() => import("../pages/Library"));
const ReadingPage = lazy(() => import("../pages/Reading"));
const RecommendedPage = lazy(() => import("../pages/Recommended"));
const SignUpPage = lazy(() => import("../pages/SignUpPage"));
const SignInPage = lazy(() => import("../pages/SignInPage"));

const App = () => {
  const dispath = useDispatch<AppDispatch>();
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispath(getCurrentUser());
  }, [dispath]);

  const loader = isLoading || isRefreshing ? <Loader /> : null;

  return (
    <>
      <CustomToaster />
      <Suspense fallback={loader}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate replace to="/login" />} />
            <Route
              path="/register"
              element={
                <RestrictedRoute
                  component={<SignUpPage />}
                  redirectTo="/recommended"
                />
              }
            />
            <Route
              path="/login"
              element={
                <RestrictedRoute
                  component={<SignInPage />}
                  redirectTo="/recommended"
                />
              }
            />
            <Route
              path="/recommended"
              element={
                <PrivateRoute
                  component={<RecommendedPage />}
                  redirectTo="/login"
                />
              }
            />
            <Route
              path="/library"
              element={
                <PrivateRoute component={<LibraryPage />} redirectTo="/login" />
              }
            />
            <Route
              path="/reading/:bookId"
              element={
                <PrivateRoute component={<ReadingPage />} redirectTo="/login" />
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
