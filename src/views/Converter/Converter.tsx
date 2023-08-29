import styles from './Converter.module.scss';
import Section from "../../components/Section/Section.tsx";
import NumberInput from "../../components/NumberInput/NumberInput.tsx";
import CurrencySelect from "../../components/CurrencySelect/CurrencySelect.tsx";
import Button from "../../components/Button/Button.tsx";
import { useCurrency } from "../../context/CurrencyContext.tsx";
import { useEffect, useState } from "react";

export default function Converter() {
  const { baseCurrency, targetCurrency, currencyRates, setBaseCurrency, setTargetCurrency } = useCurrency();
  const [baseValue, setBaseValue] = useState("");
  const [targetValue, setTargetValue] = useState("");

  const currenciesLoaded =
    baseCurrency && targetCurrency && baseCurrency.code in currencyRates && targetCurrency.code in currencyRates;

  useEffect(() => {
    setTargetValue(() => {
      if (baseValue === "" || baseValue === '.') {
        return "";
      }
      if (currenciesLoaded) {
        return (
          (Number(baseValue) * Number(currencyRates[baseCurrency.code][targetCurrency.code]))
            .toFixed(2)
        );
      }
      return "";
    });
  }, [baseValue, baseCurrency, targetCurrency, currencyRates]);

  function handleSwap() {
    setBaseCurrency(targetCurrency?.code ?? "")
    setTargetCurrency(baseCurrency?.code ?? "")
    setBaseValue(targetValue);
    setTargetValue(baseValue);
  }

  return (
    <Section
      parentClasses={styles.converter}
      title="Convert"
    >
      <div className={styles['currency-input']}>
        <div className={styles.input__body}>
          <div className={styles['currency-input__row']}>
            <NumberInput
              value={baseValue}
              setValue={setBaseValue}
            />
            <CurrencySelect
              currencyCode={baseCurrency ? baseCurrency.code : ''}
              setCurrency={setBaseCurrency}
            />
          </div>
          <div className={styles['per-unit']}>
            {currenciesLoaded ?
              `1 ${baseCurrency.code} = 
              ${currencyRates[baseCurrency.code][targetCurrency.code].toFixed(2)} 
              ${targetCurrency.code}` :
              `1 ${baseCurrency?.code ?? ''} = ...${targetCurrency?.code ?? ''}`
            }
          </div>
        </div>
        <Button text="Swap" onClickHandle={handleSwap}/>
        <div className={styles.input__body}>
          <div className={styles['currency-input__row']}>
            <NumberInput
              value={targetValue}
              disabled={true}
            />
            <CurrencySelect
              currencyCode={targetCurrency ? targetCurrency.code : ''}
              setCurrency={setTargetCurrency}
            />
          </div>
          <div className={styles['per-unit']}>
            {currenciesLoaded ?
              `1 ${targetCurrency.code} = 
              ${currencyRates[targetCurrency.code][baseCurrency.code].toFixed(2)} 
              ${baseCurrency.code}` :
              `1 ${targetCurrency?.code ?? ''} = ...${baseCurrency?.code ?? ''}`
            }
          </div>
        </div>
      </div>
    </Section>
  );
}
