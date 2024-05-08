import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import MainLayout from "../components/layout/MainLayout";
import AddProduct from "../pages/dashboard/addProduct/AddProduct";
import AllProduct from "../pages/dashboard/allProduct/AllProduct";
import DuplicateProduct from "../pages/dashboard/duplicateProduct/duplicateProduct";
import EditProduct from "../pages/dashboard/editProduct/EditProduct";
import DashboardHome from "../pages/dashboard/home/DashboardHome";
import SalesHistory from "../pages/dashboard/salesHistory/SalesHistory";
import SellProduct from "../pages/dashboard/sellProduct/SellProduct";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import NotFoundPage from "./NotFoundPage";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "home",
        element: (
          <PrivateRoute>
            <DashboardHome />
          </PrivateRoute>
        ),
      },
      {
        path: "all-product",
        element: (
          <PrivateRoute>
            <AllProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "products/edit-product/:id",
        element: <EditProduct />,
        loader: async ({ params }) => params.id,
      },
      {
        path: "products/duplicate-product/:id",
        element: <DuplicateProduct />,
        loader: async ({ params }) => params.id,
      },
      {
        path: "add-product",
        element: (
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "sell-product",
        element: (
          <PrivateRoute>
            <SellProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "sales-history",
        element: (
          <PrivateRoute>
            <SalesHistory />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
