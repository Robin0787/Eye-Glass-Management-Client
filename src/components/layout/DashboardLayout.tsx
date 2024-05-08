import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import BorderContainer from "../shared/BorderContainer";
import Sidebar from "../shared/Sidebar/Sidebar";

const DashboardLayout = () => {
  return (
    <section
      className={`w-full h-screen  max-h-[1000px] max-w-[2200px] mx-auto dashboardBg`}
    >
      <section className="w-full h-full flex justify-start items-start md:gap-5 p-2 bg-primaryBg">
        <article className="w-0 hidden lg:block lg:w-[20%] max-w-[310px] h-full">
          <Sidebar />
        </article>
        <article className="w-full lg:w-[80%] h-full rounded-xl bg-transparent flex-grow">
          <BorderContainer padding="p-3">
            <Outlet />
          </BorderContainer>
        </article>
      </section>

      <Toaster position="bottom-right" />
    </section>
  );
};

export default DashboardLayout;
