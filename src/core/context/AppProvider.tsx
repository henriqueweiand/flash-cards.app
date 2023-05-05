import { ReactNode } from 'react'
import { NativeBaseProvider } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider } from './AuthContext'
import { THEME } from '@components/Theme';
import { LanguageProvider } from './LanguageContext';

type AppProviderProps = {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider theme={THEME}>
        <AuthProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </AuthProvider>
      </NativeBaseProvider>
    </SafeAreaProvider>
  )
}
