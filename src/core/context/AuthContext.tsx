import { AuthAsyncStorage } from '@services/AuthAsyncStorage';
import { User } from '@domain/entities/User';
import { createContext, ReactNode, useEffect, useState } from 'react'

export interface AuthContextType {
  loading: boolean;
  authenticated: boolean;
  user: User | undefined;
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

    await authAsyncStorage.set(user.toJSON());
    setUser(user);
    setLoading(false);
  }

  const get = async () => {
    const authAsyncStorage = new AuthAsyncStorage();
    const storageData = await authAsyncStorage.get();

    if (!!storageData)
      return JSON.parse(String(storageData)) as User;

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
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
