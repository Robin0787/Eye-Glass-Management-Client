import { IoHomeSharp } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { Link } from "react-router-dom";
import { logOut } from "../../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import UserRoutes from "../../../routes/UserRoutes";
const Sidebar = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  function handleLogOut() {
    dispatch(logOut());
  }

  let name: string = "";
  if (user.firstName) {
    name = user.firstName.split(" ")[0];
  }

  return (
    <aside className="w-full h-full relative bg-secondary p-2 rounded-xl">
      {/* Header Info Section */}
      <div className="size-[150px] bg-primaryBg text-white rounded-full  mx-auto my-5 flex justify-center items-center">
        <div className="bg-secondary text-white rounded-full size-[110px] flex justify-center items-center">
          <h1 className="text-xl font-black selection:text-white">{name}</h1>
        </div>
      </div>
      {/* Main Items Section */}
      <section
        id="menuScrollBar"
        className="h-full min-h-[200px] max-h-[500px] overflow-y-scroll py-2"
      >
        <ul className="flex flex-col justify-start items-start gap-2 list-none">
          <UserRoutes />
        </ul>
      </section>
      {/* Footer Section */}
      <section className="w-full absolute bottom-0 left-0 pt-4 px-2 bg-gray-700 rounded-b-xl">
        <Link to={"/"} className="footerBtn">
          <p className="w-full flex justify-start items-center gap-4">
            <IoHomeSharp size={18} />
            <span>Home</span>
          </p>
        </Link>
        <button className="footerBtn" onClick={handleLogOut}>
          <p className="w-full flex justify-start items-center gap-4">
            <TbLogout size={20} />
            <span>Log Out</span>
          </p>
        </button>
      </section>
    </aside>
  );
};

export default Sidebar;
