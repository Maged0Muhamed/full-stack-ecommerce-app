import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";
import { Toaster } from "@/components/ui/toaster";
import CartDrawer from "./components/CartDrawer";

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
      <CartDrawer />
    </>
  );
};

export default App;
