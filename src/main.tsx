import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider as RouterProvider } from "@/components/ui/provider";
import { Provider } from "react-redux";
import { store } from "./redux/index.ts";
import InternetConnectionProvider from "./providers/internetConnectionProvider.tsx";
createRoot(document.getElementById("root")!).render(
  <>
    <Provider store={store}>
      <InternetConnectionProvider>
        <RouterProvider>
          <App />
        </RouterProvider>
      </InternetConnectionProvider>
    </Provider>
  </>
);
