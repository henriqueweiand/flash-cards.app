import { useContext } from "react";
import { GameContext, GameContextType } from "@context/GameContext";

export const useGame = (): GameContextType => {
  return useContext(GameContext);
};
