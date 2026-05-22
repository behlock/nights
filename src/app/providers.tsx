'use client'

import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import ThemeProvider from '@/components/theme-provider'
import { persistor, store } from '@/store'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </PersistGate>
    </ReduxProvider>
  )
}
