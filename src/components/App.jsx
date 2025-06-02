import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import HomePage from "../pages/HomePage/HomePage";
import Psychologists from "../pages/Psychologists/Psychologists";
import Favorites from "../pages/Favorites/Favorites";

function App() {
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
