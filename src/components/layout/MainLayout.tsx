import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar/Navbar";

const MainLayout = () => {
  return (
    <section className="w-full max-w-[2200px] mx-auto">
      <Navbar />
      <Outlet />
      <Toaster position="bottom-right" />
    </section>
  );
};

export default MainLayout;
