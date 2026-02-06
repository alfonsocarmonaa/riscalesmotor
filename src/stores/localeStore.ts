import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type CountryCode = 'ES' | 'US' | 'GB' | 'DE' | 'FR' | 'IT' | 'PT';
export type LanguageCode = 'ES' | 'EN';

export interface Country {
  code: CountryCode;
  name: string;
  flag: string;
  currency: {
    code: string;
    symbol: string;
  };
  languages: LanguageCode[];
}

export const AVAILABLE_COUNTRIES: Country[] = [
  { code: 'ES', name: 'España', flag: '🇪🇸', currency: { code: 'EUR', symbol: '€' }, languages: ['ES', 'EN'] },
  { code: 'US', name: 'United States', flag: '🇺🇸', currency: { code: 'USD', symbol: '$' }, languages: ['EN'] },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', currency: { code: 'GBP', symbol: '£' }, languages: ['EN'] },
  { code: 'DE', name: 'Deutschland', flag: '🇩🇪', currency: { code: 'EUR', symbol: '€' }, languages: ['EN'] },
  { code: 'FR', name: 'France', flag: '🇫🇷', currency: { code: 'EUR', symbol: '€' }, languages: ['EN'] },
  { code: 'IT', name: 'Italia', flag: '🇮🇹', currency: { code: 'EUR', symbol: '€' }, languages: ['EN'] },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹', currency: { code: 'EUR', symbol: '€' }, languages: ['ES', 'EN'] },
];

interface LocaleState {
  country: CountryCode;
  language: LanguageCode;
  
  // Derived getters
  getCountry: () => Country;
  getCurrency: () => { code: string; symbol: string };
  
  // Actions
  setCountry: (country: CountryCode) => void;
  setLanguage: (language: LanguageCode) => void;
  setLocale: (country: CountryCode, language: LanguageCode) => void;
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set, get) => ({
      country: 'ES',
      language: 'ES',
      
      getCountry: () => {
        const { country } = get();
        return AVAILABLE_COUNTRIES.find(c => c.code === country) || AVAILABLE_COUNTRIES[0];
      },
      
      getCurrency: () => {
        const countryData = get().getCountry();
        return countryData.currency;
      },
      
      setCountry: (country) => {
        const countryData = AVAILABLE_COUNTRIES.find(c => c.code === country);
        if (countryData) {
          // If current language is not available in the new country, switch to first available
          const currentLanguage = get().language;
          const newLanguage = countryData.languages.includes(currentLanguage) 
            ? currentLanguage 
            : countryData.languages[0];
          set({ country, language: newLanguage });
        }
      },
      
      setLanguage: (language) => set({ language }),
      
      setLocale: (country, language) => set({ country, language }),
    }),
    {
      name: 'riscales-locale',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ country: state.country, language: state.language }),
    }
  )
);

// Helper hook for easy access
export function useLocale() {
  const country = useLocaleStore(state => state.country);
  const language = useLocaleStore(state => state.language);
  const getCountry = useLocaleStore(state => state.getCountry);
  const getCurrency = useLocaleStore(state => state.getCurrency);
  const setCountry = useLocaleStore(state => state.setCountry);
  const setLanguage = useLocaleStore(state => state.setLanguage);
  const setLocale = useLocaleStore(state => state.setLocale);
  
  return {
    country,
    language,
    countryData: getCountry(),
    currency: getCurrency(),
    setCountry,
    setLanguage,
    setLocale,
  };
}
