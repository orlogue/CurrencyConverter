import styles from './Costs.module.scss';
import Section from "../../components/Section/Section.tsx";
import { useCurrency } from "../../context/CurrencyContext.tsx";
import { useEffect, useState } from "react";

const range = [1, 5, 10, 25, 50, 100, 500, 1000, 5000];

export default function Costs() {
  const { baseCurrency, targetCurrency, currencyRates } = useCurrency()

  const [pair, setPair] = useState({
    base: baseCurrency?.code ?? '',
    target: targetCurrency?.code ?? ''
  });

  useEffect(() => {
    if (pair.base === targetCurrency?.code && pair.target === baseCurrency?.code) {
      setPair({ base: targetCurrency.code, target: baseCurrency.code })
    } else {
      setPair({ base: baseCurrency?.code ?? '', target: targetCurrency?.code ?? '' })
    }
  }, [baseCurrency, targetCurrency]);

  const [baseToTargetValues, setBaseToTargetValues] = useState<string[]>([])
  const [targetToBaseValues, setTargetToBaseValues] = useState<string[]>([])

  useEffect(() => {
    if (baseCurrency === undefined) return;
    if (targetCurrency === undefined) return;
    if (pair.base === targetCurrency.code && pair.target === baseCurrency.code) return;
    if (Object.keys(currencyRates).length < 2) return;

    if (baseCurrency.code in currencyRates && targetCurrency.code in currencyRates) {
      setBaseToTargetValues(() =>
        range.map(leftValue => {
          return (leftValue * currencyRates[baseCurrency.code][targetCurrency.code]).toFixed(2);
        })
      );
      setTargetToBaseValues(() =>
        range.map(leftValue => {
          return (leftValue * currencyRates[targetCurrency.code][baseCurrency.code]).toFixed(2);
        })
      );
    }
  }, [currencyRates, baseCurrency, targetCurrency]);

  return (
    <Section
      parentClasses={styles.costs}
      title="Costs"
      canBeHidden={true}
    >
      <div className={styles['costs-row']}>
        <table>
          <thead>
          <tr>
            <th>{pair.base}</th>
            <th>{pair.target}</th>
          </tr>
          </thead>
          <tbody>
          {range.map((item, i) =>
            <tr key={i}>
              <td>{item}</td>
              <td>{baseToTargetValues[i]}</td>
            </tr>
          )}
          </tbody>
        </table>
        <table>
          <thead>
          <tr>
            <th>{pair.target}</th>
            <th>{pair.base}</th>
          </tr>
          </thead>
          <tbody>
          {range.map((item, i) =>
            <tr key={i}>
              <td>{item}</td>
              <td>{targetToBaseValues[i]}</td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
