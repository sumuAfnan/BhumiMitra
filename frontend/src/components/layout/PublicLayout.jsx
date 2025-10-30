import { Outlet } from "react-router-dom";
import Header from "../Header"; // ✅ Fixed path

const PublicLayout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

export default PublicLayout;
