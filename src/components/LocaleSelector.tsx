import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useLocale, AVAILABLE_COUNTRIES, type CountryCode } from "@/stores/localeStore";
import { useQueryClient } from "@tanstack/react-query";

export function LocaleSelector() {
  const { country, language, countryData, setCountry } = useLocale();
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  // Sync i18n language with store
  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);

  const handleCountryChange = (newCountry: CountryCode) => {
    setCountry(newCountry);
    // Invalidate product queries to refetch with new locale context
    queryClient.invalidateQueries({ queryKey: ['products'] });
    queryClient.invalidateQueries({ queryKey: ['product'] });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 font-normal">
          <span className="text-base">{countryData.flag}</span>
          <span className="hidden sm:inline text-xs">
            {country} / {countryData.currency.code}
          </span>
          <Globe className="h-4 w-4 sm:hidden" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {AVAILABLE_COUNTRIES.map((c, index) => (
          <div key={c.code}>
            <DropdownMenuItem
              onClick={() => handleCountryChange(c.code)}
              className={`cursor-pointer ${country === c.code ? 'bg-accent/10' : ''}`}
            >
              <span className="mr-2 text-base">{c.flag}</span>
              <span className="flex-1">{c.name}</span>
              <span className="text-muted-foreground text-xs">
                {c.currency.code}
              </span>
            </DropdownMenuItem>
            {index < AVAILABLE_COUNTRIES.length - 1 && c.code === 'ES' && (
              <DropdownMenuSeparator />
            )}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
