import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import HomePage from "../pages/HomePage/HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
