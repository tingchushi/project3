import { Outlet } from "react-router-dom";
import Navbar1 from "./Navbar";

function Layout() {
  return (
    <>
      <Navbar1 />
      <Outlet />
    </>
  );
}

export default Layout;
