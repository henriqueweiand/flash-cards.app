import { useContext } from "react";
import { AuthContext, AuthContextType } from "@context/AuthContext";

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};
