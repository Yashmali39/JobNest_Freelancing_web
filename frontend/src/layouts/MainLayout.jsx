import { Outlet } from "react-router-dom";

import Navbar from "../components/common/Navbar";

function MainLayout() {
  return (
    <>
      <Navbar />

      <main className="p-6">
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;