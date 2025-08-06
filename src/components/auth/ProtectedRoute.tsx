import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface IProp {
  isAllowed: boolean;
  redirectPath: string;
  children: ReactNode;
  data?: unknown;
}
const ProtectedRoute = ({ isAllowed, redirectPath, children, data }: IProp) => {
  if (!isAllowed) return <Navigate to={redirectPath} state={data} />;
  return children;
};

export default ProtectedRoute;
