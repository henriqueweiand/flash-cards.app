import { useContext } from "react";
import { LanguageContext, LanguageContextType } from "@context/LanguageContext";

export const useLanguage = (): LanguageContextType => {
  return useContext(LanguageContext);
};
