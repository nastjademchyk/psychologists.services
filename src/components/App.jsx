import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "../redux/auth/operations";
import { Suspense, lazy, useEffect } from "react";
import Loader from "./Loader/Loader";
import { selectIsRefreshing } from "../redux/auth/selectors";

function App() {
  const HomePage = lazy(() => import("../pages/HomePage/HomePage.jsx"));
  const Psychologists = lazy(() =>
    import("../pages/Psychologists/Psychologists.jsx")
  );
  const Favorites = lazy(() => import("../pages/Favorites/Favorites.jsx"));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  const isRefreshing = useSelector(selectIsRefreshing);

  if (isRefreshing) {
    return (
      <div className="loader">
        <Loader />
      </div>
    );
  }
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/psychologists" element={<Psychologists />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
