export type CurrencyRate = Record<string, number>
export type CurrencyRates = Record<string, CurrencyRate>

export type Currencies = Record<string, Currency>

export type HistoricalRate = Record<string, CurrencyRate>
export type HistoricalRates = Record<string, HistoricalRate>

export interface Currency {
  symbol: string,
  name: string,
  symbol_native: string,
  decimal_digits: number,
  rounding: number,
  code: string,
  name_plural: string,
}

export interface CurrencyState {
  baseCurrency: Currency | undefined,
  targetCurrency: Currency | undefined,
  currencies: Currencies,
  currencyRates: CurrencyRates,
  historicalRates: HistoricalRates | undefined,
  isLoading: boolean,
}

export type CurrencyActions =
  | { type: "setBaseCurrency", payload: Currency }
  | { type: "setTargetCurrency", payload: Currency }
  | { type: "setCurrencies", payload: Currencies }
  | { type: "setCurrencyRates", code: string, rates: CurrencyRate }
  | { type: "setHistoricalRates", code: string, rates: HistoricalRate }

export interface ICurrencyContext extends CurrencyState {
  setBaseCurrency: (code: string) => void,
  setTargetCurrency: (code: string) => void,
}
