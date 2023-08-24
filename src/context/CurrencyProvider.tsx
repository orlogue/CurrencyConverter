import React, {useState, useEffect, createContext} from "react";
import axios from "axios";

type LatestCurrencyRates = Record<string, number>

interface Currency {
  symbol: string,
  name: string,
  symbol_native: string,
  decimal_digits: number,
  rounding: number,
  code: string,
  name_plural: string,
}

type Currencies = Record<string, Currency>

interface CurrencyContext {
  baseCurrency: Currency | null,
  targetCurrency: Currency | null,
  currencies: Currencies,
  currencyRates: LatestCurrencyRates,
}

const CurrencyContext = createContext<CurrencyContext>({
  baseCurrency: null,
  targetCurrency: null,
  currencies: {},
  currencyRates: {},
});


function useCurrencySource(): CurrencyContext {
  const [baseCurrency, setBaseCurrency]
    = useState<Currency>({} as Currency);
  const [targetCurrency, setTargetCurrency]
    = useState<Currency>({} as Currency);
  const [currencies, setCurrencies]
    = useState<Currencies>({} as Currencies);
  const [currencyRates]
    = useState<LatestCurrencyRates>({} as LatestCurrencyRates);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/currencies?apikey=${import.meta.env.VITE_API_KEY}`)
      .then(res => setCurrencies(res.data.data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    setBaseCurrency(currencies['RUB']);
    setTargetCurrency(currencies['USD']);
  }, [currencies]);

  return {baseCurrency, targetCurrency, currencies, currencyRates};
}

function CurrencyProvider({children}: { children: React.ReactNode }) {
  return (
    <CurrencyContext.Provider value={useCurrencySource()}>
      {children}
    </CurrencyContext.Provider>
  );
}

export default CurrencyProvider;
