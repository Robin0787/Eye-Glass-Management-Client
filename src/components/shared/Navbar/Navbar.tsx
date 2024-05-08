import { Link } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import style from "./Navbar.module.css";

const Navbar = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  return (
    <nav className="sticky top-0 gap-5 w-full py-5 z-50 bg-primaryBg">
      <div className="w-3/4 mx-auto flex justify-between items-center font-semibold text-xl tracking-wide">
        <div>
          <Link to={"/"}>Home</Link>
        </div>
        <div className="flex justify-between items-center gap-10">
          {isLoggedIn ? (
            <Link to={"/dashboard/home"} className={style.menuBg}>
              Dashboard
            </Link>
          ) : (
            <>
              <Link to={"/login"} className={style.menu}>
                Login
              </Link>
              <Link to={"/register"} className={style.menu}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
