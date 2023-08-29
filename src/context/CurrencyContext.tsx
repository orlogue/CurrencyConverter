import axios from 'axios'
import { useEffect, createContext, useContext, useReducer, useCallback } from 'react'

import {
  Currencies,
  CurrencyActions,
  ICurrencyContext,
  CurrencyRate,
  CurrencyRates,
  CurrencyState,
  HistoricalRate,
} from './CurrencyTypes.tsx'

export const CurrencyContext = createContext<ICurrencyContext>({} as ICurrencyContext)

export function useCurrencySource(): ICurrencyContext {
  const [{ baseCurrency, targetCurrency, currencies, currencyRates, historicalRates, isLoading }, dispatch] =
    useReducer(
      (state: CurrencyState, action: CurrencyActions): CurrencyState => {
        switch (action.type) {
          case 'setBaseCurrency': {
            return { ...state, baseCurrency: action.payload }
          }
          case 'setTargetCurrency': {
            return { ...state, targetCurrency: action.payload }
          }
          case 'setCurrencies': {
            return { ...state, currencies: action.payload }
          }
          case 'setCurrencyRates': {
            return {
              ...state,
              currencyRates: {
                ...state.currencyRates,
                [action.code]: action.rates,
              },
            }
          }
          case 'setHistoricalRates': {
            return {
              ...state,
              isLoading: false,
              historicalRates: {
                ...state.historicalRates,
                [action.code]: action.rates,
              },
            }
          }
          default: {
            return {} as ICurrencyContext
          }
        }
      },
      {
        baseCurrency: undefined,
        targetCurrency: undefined,
        currencies: {} as Currencies,
        currencyRates: {} as CurrencyRates,
        historicalRates: undefined,
        isLoading: true,
      },
    )

  useEffect(() => {
    axios
      .get<{
        data: Currencies
      }>(`${import.meta.env.VITE_API_BASE_URL}/currencies?apikey=${import.meta.env.VITE_API_KEY}`)
      .then((response) => {
        dispatch({
          type: 'setCurrencies',
          payload: response.data.data,
        })
        dispatch({
          type: 'setBaseCurrency',
          payload: response.data.data.RUB,
        })
        dispatch({
          type: 'setTargetCurrency',
          payload: response.data.data.USD,
        })
        getHistoricalRates('RUB')
        getHistoricalRates('USD')
      })
      .catch((err) => console.log(err))
  }, [])

  const getCurrencyRates = (code: string) => {
    if (code in currencyRates) return

    axios
      .get<{
        data: CurrencyRate
      }>(`${import.meta.env.VITE_API_BASE_URL}/latest?apikey=${import.meta.env.VITE_API_KEY}&base_currency=${code}`)
      .then((res) =>
        dispatch({
          type: 'setCurrencyRates',
          code: code,
          rates: res.data.data,
        }),
      )
      .catch((err) => console.log(err))
  }

  const getHistoricalRates = (code: string) => {
    if (historicalRates && code in historicalRates) return

    const date = new Date()
    date.setDate(date.getDate() - 1)
    const yesterday = date.toISOString().split('T')[0]
    date.setDate(date.getDate() - 8)
    const tenDaysAgo = date.toISOString().split('T')[0]

    axios
      .get<{
        data: HistoricalRate
      }>(
        `${import.meta.env.VITE_API_BASE_URL}/historical?apikey=${
          import.meta.env.VITE_API_KEY
        }&base_currency=${code}&date_from=${tenDaysAgo}&date_to=${yesterday}`,
      )
      .then((res) =>
        dispatch({
          type: 'setHistoricalRates',
          code: code,
          rates: res.data.data,
        }),
      )
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    if (baseCurrency) {
      getCurrencyRates(baseCurrency.code)
    }
    if (targetCurrency) {
      getCurrencyRates(targetCurrency.code)
    }
  }, [baseCurrency, targetCurrency])

  useEffect(() => {
    if (baseCurrency) {
      getHistoricalRates(baseCurrency.code)
    }
    if (targetCurrency) {
      getHistoricalRates(targetCurrency.code)
    }
  }, [baseCurrency, targetCurrency])

  const setBaseCurrency = useCallback(
    (code: string) => {
      dispatch({
        type: 'setBaseCurrency',
        payload: currencies[code],
      })
    },
    [currencies],
  )

  const setTargetCurrency = useCallback(
    (code: string) => {
      dispatch({
        type: 'setTargetCurrency',
        payload: currencies[code],
      })
    },
    [currencies],
  )

  return {
    baseCurrency,
    targetCurrency,
    currencies,
    currencyRates,
    historicalRates,
    setBaseCurrency,
    setTargetCurrency,
    isLoading,
  }
}

export function useCurrency() {
  return useContext(CurrencyContext)
}
