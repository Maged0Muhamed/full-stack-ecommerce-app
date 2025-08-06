import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Home from "../pages/index";
import About from "../pages/About";
import RootLayout from "../pages/layout";

// import Contact from "../pages/Contact";
// import QuickStart from "../pages/Learn";
// import LearnLayout from "../pages/Learn/layout";
import Product from "@/pages/Product";
import Login from "@/pages/Login";
import CookieServies from "@/services/Cookie";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Products from "@/pages/Products";
import AdminDashboard from "@/pages/Dashboard";
import DashBoardLayout from "@/pages/Dashboard/layout";
import DashboardProductsTable from "@/components/DashboardProductsTable";

const token = CookieServies.get("jwt");
const rooter = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* Root Layout  */}
      <Route
        path="/"
        element={
          <ProtectedRoute isAllowed={token} redirectPath="/login">
            <RootLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<Product />} />
      </Route>

      <Route
        path="login"
        element={
          <ProtectedRoute isAllowed={!token} redirectPath="/">
            <Login />
          </ProtectedRoute>
        }
      />

      {/* Learn Layout  */}
      <Route path="/dashboard" element={<DashBoardLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route
          path="/dashboard/products"
          element={<DashboardProductsTable />}
        />
        <Route path="/dashboard/categories" element={<AdminDashboard />} />
      </Route>
    </Route>
  )
);

export default rooter;
