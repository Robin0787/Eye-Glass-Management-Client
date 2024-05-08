import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface TMenuItemProps {
  label: string;
  to: string;
  icon?: ReactNode;
}

const MenuItem = ({ label, to, icon }: TMenuItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "sideBarItemActive" : "sideBarItem"
      }
    >
      <p className="w-full flex justify-start items-center gap-4">
        {icon}
        <span>{label}</span>
      </p>
    </NavLink>
  );
};

export default MenuItem;
