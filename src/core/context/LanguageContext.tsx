import { createContext, ReactNode, useEffect, useState } from 'react'

import { Language } from '@core/domain/entities/Language';
import { LanguageAsyncStorage } from '@core/services/LanguageAsyncStorage';

export interface LanguageContextType {
  loading: boolean;
  language: Language | undefined;
  get: () => Promise<Language | undefined>;
  set: (language: Language) => void;
}

interface LanguageProviderProps {
  children: ReactNode
}

export const LanguageContext = createContext({} as LanguageContextType)

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [language, setLanguage] = useState<Language>();

  const set = async (language: Language) => {
    const languageAsyncStorage = new LanguageAsyncStorage();

    await languageAsyncStorage.set(language.toObject());
    setLanguage(language);
    setLoading(false);
  }

  const get = async () => {
    const languageAsyncStorage = new LanguageAsyncStorage();
    const storageData = await languageAsyncStorage.get();

    if (!!storageData)
      return new Language(JSON.parse(String(storageData)));

    return undefined;
  }

  useEffect(() => {
    async function getLanguageFromStorage() {
      const language = await get();

      if (!!language) {
        setLanguage(language);
      }
      setLoading(false);
    }

    getLanguageFromStorage()
  }, [])

  useEffect(() => {
    if (!!language) {
      setLoading(false);
    }
  }, [language])

  return (
    <LanguageContext.Provider
      value={{
        loading,
        language,
        set,
        get,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}
