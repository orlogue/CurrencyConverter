import { useEffect, useState } from 'react'

import styles from './Converter.module.scss'

import Button from '../../components/Button/Button.tsx'
import CurrencySelect from '../../components/CurrencySelect/CurrencySelect.tsx'
import NumberInput from '../../components/NumberInput/NumberInput.tsx'
import Section from '../../components/Section/Section.tsx'
import { useCurrency } from '../../context/CurrencyContext.tsx'

export default function Converter() {
  const { baseCurrency, targetCurrency, currencyRates, setBaseCurrency, setTargetCurrency } = useCurrency()
  const [baseValue, setBaseValue] = useState('')
  const [targetValue, setTargetValue] = useState('')
  const [basePerUnit, setBasePerUnit] = useState({ code: '', toTarget: '' })
  const [targetPerUnit, setTargetPerUnit] = useState({ code: '', toBase: '' })

  const currenciesLoaded =
    baseCurrency && targetCurrency && baseCurrency.code in currencyRates && targetCurrency.code in currencyRates

  function CalculateValue(num: string, from: string, to: string) {
    return (Number(num) * Number(currencyRates[from][to])).toFixed(2)
  }

  useEffect(() => {
    if (currenciesLoaded) {
      setBasePerUnit({
        toTarget: currencyRates[baseCurrency.code][targetCurrency.code].toFixed(2),
        code: baseCurrency.code,
      })
      setTargetPerUnit({
        toBase: currencyRates[targetCurrency.code][baseCurrency.code].toFixed(2),
        code: targetCurrency.code,
      })
      setTargetValue(() => {
        if (baseValue === '') {
          return ''
        }
        return CalculateValue(baseValue, baseCurrency.code, targetCurrency.code)
      })
    }
  }, [baseCurrency, targetCurrency, currencyRates])

  function handleBaseInput(input: string) {
    setBaseValue(input)
    if (input === '') {
      setTargetValue('')
      return
    }
    if (currenciesLoaded) {
      setTargetValue(CalculateValue(input, baseCurrency.code, targetCurrency.code))
    }
  }

  function handleTargetInput(input: string) {
    setTargetValue(input)
    if (input === '') {
      setBaseValue('')
      return
    }
    if (currenciesLoaded) {
      setBaseValue(CalculateValue(input, targetCurrency.code, baseCurrency.code))
    }
  }

  function handleSwap() {
    setBaseCurrency(targetCurrency?.code ?? '')
    setTargetCurrency(baseCurrency?.code ?? '')
    setBaseValue(targetValue)
    setTargetValue(baseValue)
  }

  return (
    <Section parentClasses={styles.converter} title='Convert'>
      <div className={styles['currency-input']}>
        <div className={styles.input__body}>
          <div className={styles['currency-input__row']}>
            <NumberInput value={baseValue} setValue={setBaseValue} onChange={handleBaseInput} />
            <CurrencySelect currencyCode={baseCurrency ? baseCurrency.code : ''} setCurrency={setBaseCurrency} />
          </div>
          <div className={styles['per-unit']}>
            {basePerUnit.toTarget && `1 ${basePerUnit.code} = ${basePerUnit.toTarget} ${targetPerUnit.code}`}
          </div>
        </div>
        <Button text='Swap' onClickHandle={handleSwap} />
        <div className={styles.input__body}>
          <div className={styles['currency-input__row']}>
            <NumberInput value={targetValue} onChange={handleTargetInput} />
            <CurrencySelect currencyCode={targetCurrency ? targetCurrency.code : ''} setCurrency={setTargetCurrency} />
          </div>
          <div className={styles['per-unit']}>
            {targetPerUnit.toBase && `1 ${targetPerUnit.code} = ${targetPerUnit.toBase} ${basePerUnit.code}`}
          </div>
        </div>
      </div>
    </Section>
  )
}
