import { useEffect, type ReactNode } from "react";
import { toaster } from "@/components/ui/toaster";
import { networkModeAction } from "@/redux/internetConnectionSlice";
import { appDispatch } from "@/redux";

interface IProp {
  children: ReactNode;
}
const InternetConnectionProvider = ({ children }: IProp) => {
  const dispatch = appDispatch();

  const closeToast = () => toaster.dismiss();
  const addToast = () =>
    toaster.create({
      title: "You're offline",
      description: "please make sure you have an internet connection",
      type: "info",
      duration: 5000,
      closable: true,
    });
  const setOnline = () => {
    dispatch(networkModeAction(true));
    addToast();
  };
  const setOffline = () => {
    dispatch(networkModeAction(false));
    closeToast();
  };
  useEffect(() => {
    window.addEventListener("offline", setOnline);
    window.addEventListener("online", setOffline);

    return () => {
      //** Clean up
      window.removeEventListener("offline", setOffline);
      window.removeEventListener("online", setOnline);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};

export default InternetConnectionProvider;
