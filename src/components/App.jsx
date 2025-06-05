import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import HomePage from "../pages/HomePage/HomePage";
import Psychologists from "../pages/Psychologists/Psychologists";
import Favorites from "../pages/Favorites/Favorites";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "../redux/auth/operations";
import { useEffect } from "react";
import Loader from "./Loader/Loader";
import { selectIsRefreshing } from "../redux/auth/selectors";

function App() {
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
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/psychologists" element={<Psychologists />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
