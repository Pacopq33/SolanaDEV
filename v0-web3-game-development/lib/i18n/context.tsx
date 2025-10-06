"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { translations, type Language } from "./translations"

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: typeof translations.en
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  useEffect(() => {
    // Load saved language from localStorage
    const savedLang = localStorage.getItem("language") as Language
    if (savedLang && translations[savedLang]) {
      setLanguageState(savedLang)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  const t = translations[language]

  return <I18nContext.Provider value={{ language, setLanguage, t }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider")
  }
  return context
}
