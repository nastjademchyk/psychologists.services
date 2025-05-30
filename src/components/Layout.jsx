import "./App.css";
import AppBar from "./AppBar/AppBar";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <AppBar />
      <div className="container">
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default Layout;
