import { createContext, ReactNode, useEffect, useState } from 'react';

import { Word } from '@core/domain/entities/Word';
import { useAuth } from '@core/hooks/Auth';
import { FireStoreWord } from '@core/services/FireStoreWord';

export interface GameContextType {
  finish: boolean;
  loading: boolean;
  progress: number;
  game: Word | null;
  next: ({ rightAnswer }: { rightAnswer: boolean }) => void;
}

interface GameProviderProps {
  children: ReactNode;
  gamesQuantity: number;
}

export const GameContext = createContext({} as GameContextType)

export function GameProvider({ children, gamesQuantity }: GameProviderProps) {
  const { user } = useAuth()
  const [loading, setLoading] = useState<boolean>(true);
  const [finish, setFinish] = useState<boolean>(false);

  const [progress, setProgress] = useState<number>(0);
  const [played, setPlayed] = useState<Word[]>([]);
  const [games, setGames] = useState<Word[]>([]);
  const [game, setGame] = useState<Word | null>(null);

  const calcProgress = () => {
    const totalPlayed = played.length;
    const progress = (totalPlayed / (games.length + totalPlayed)) * 100;

    setProgress(progress);
  }

  const getNextGame = () => {
    const index = Math.floor(Math.random() * games.length);

    return games[index];
  }

  const next = ({ rightAnswer }: { rightAnswer: boolean }) => {
    const nextGame = getNextGame();

    if (rightAnswer) {
      if (games.length === 1) {
        setFinish(true);
      }

      setPlayed([...played, game]);
      setGames(games.filter(cgame => cgame.getDocRef() !== game?.getDocRef()));
      calcProgress();
    }

    setGame(nextGame);
  }

  const getGames = async ({ gamesQuantity }: { gamesQuantity: number }) => {
    if (user) {
      const fireStoreWord = new FireStoreWord(user);

      const words = await fireStoreWord.findAll(); // it needs to receive the param gamesQuantity
      setGames(words);

      const index = Math.floor(Math.random() * words.length);
      setGame(words[index]);
      calcProgress();
      setLoading(false);
    }
  }

  useEffect(() => {
    if (gamesQuantity) {
      getGames({ gamesQuantity })
    } else {
      throw new Error('GameContext: Inform gamesQuantity');
    }

  }, [gamesQuantity])

  return (
    <GameContext.Provider
      value={{
        finish,
        loading,
        progress,
        game,
        next,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
