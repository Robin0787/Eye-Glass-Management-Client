import { FaHistory } from "react-icons/fa";
import { FaListUl } from "react-icons/fa6";
import { IoMdAddCircle } from "react-icons/io";
import { MdDashboard, MdSell } from "react-icons/md";
import MenuItem from "../components/ui/MenuItem";

const UserRoutes = () => {
  return (
    <>
      <MenuItem
        label="Dashboard"
        to="/dashboard/home"
        icon={<MdDashboard size={18} />}
      />
      <MenuItem
        label="Add Product"
        to="/dashboard/add-product"
        icon={<IoMdAddCircle size={18} />}
      />
      <MenuItem
        label="All Product"
        to="/dashboard/all-product"
        icon={<FaListUl size={18} />}
      />
      <MenuItem
        label="Sell Product"
        to="/dashboard/sell-product"
        icon={<MdSell size={18} />}
      />
      <MenuItem
        label="Sales History"
        to="/dashboard/sales-history"
        icon={<FaHistory size={18} />}
      />
    </>
  );
};

export default UserRoutes;
