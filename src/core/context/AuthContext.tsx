import { AuthAsyncStorage } from '@services/AuthAsyncStorage';
import { createContext, ReactNode, useEffect, useState } from 'react'

import { User } from '@domain/entities/User';

export interface AuthContextType {
  loading: boolean;
  authenticated: boolean;
  user: User | undefined;
  language: User | undefined;
  logoff: () => void;
  get: () => Promise<User | undefined>;
  set: (user: User) => void;
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User>();

  const set = async (user: User) => {
    const authAsyncStorage = new AuthAsyncStorage();

    await authAsyncStorage.set(user.toObject());
    setUser(user);
    setLoading(false);
  }

  const logoff = async () => {
    const authAsyncStorage = new AuthAsyncStorage();
    setLoading(true);

    await authAsyncStorage.clear();
    setUser(undefined);
    setAuthenticated(false);
    setLoading(false);
  }

  const get = async () => {
    const authAsyncStorage = new AuthAsyncStorage();
    const storageData = await authAsyncStorage.get();

    if (!!storageData)
      return new User(JSON.parse(String(storageData)));

    return undefined;
  }

  useEffect(() => {
    async function getAuthFromStorage() {
      const user = await get();

      if (!!user) {
        setUser(user);
      }
      setLoading(false);
    }

    getAuthFromStorage()
  }, [])

  useEffect(() => {
    if (!!user) {
      setAuthenticated(true);
      setLoading(false);
    }
  }, [user])

  return (
    <AuthContext.Provider
      value={{
        loading,
        authenticated,
        user,
        set,
        get,
        logoff
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
