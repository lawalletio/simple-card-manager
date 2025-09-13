"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface AppContextType {
  massProductionMode: boolean
  setMassProductionMode: (value: boolean) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [massProductionMode, setMassProductionMode] = useState(false)

  return (
    <AppContext.Provider
      value={{
        massProductionMode,
        setMassProductionMode,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
