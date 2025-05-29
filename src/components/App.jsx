import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import PageNotFound from "../pages/PageNotFound/PageNotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
