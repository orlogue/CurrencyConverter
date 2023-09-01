import { useEffect, useState } from 'react';

import styles from './History.module.scss';
import Section from '../../components/Section/Section.tsx';
import { useCurrency } from '../../context/CurrencyContext.tsx';
interface Rate {
  date: string;
  rate: number;
}

function MinMax(rates: Rate[]): [min: number, max: number] {
  if (rates.length === 0) {
    return [0, 0];
  }
  const min = Math.min(...rates.map((item) => item.rate));
  const max = Math.max(...rates.map((item) => item.rate));
  return [min, max];
}

export default function History() {
  const { baseCurrency, targetCurrency, historicalRates, currencyRates } = useCurrency();
  const [rates, setRates] = useState<Rate[]>([]);
  const [min, max] = MinMax(rates);

  function GenerateYValues() {
    const average = (max + min) / 2;
    const precision = max >= 1 ? 2 : 5;
    return min && max ? (
      <>
        <div>{max.toFixed(precision)}</div>
        <div>{((max + average) / 2).toFixed(precision)}</div>
        <div>{average.toFixed(precision)}</div>
        <div>{((min + average) / 2).toFixed(precision)}</div>
        <div>{min.toFixed(precision)}</div>
      </>
    ) : (
      <>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </>
    );
  }

  useEffect(() => {
    if (
      historicalRates &&
      baseCurrency &&
      targetCurrency &&
      baseCurrency.code in historicalRates &&
      baseCurrency.code in currencyRates
    ) {
      const temp: Rate[] = [];
      for (const [date, rates] of Object.entries(historicalRates[baseCurrency.code])) {
        temp.push({
          date: date,
          rate: rates[targetCurrency.code],
        });
      }
      setRates(temp);
    }
  }, [historicalRates, baseCurrency, targetCurrency]);

  return (
    <Section
      parentClasses={styles.history}
      title='History'
      canBeHidden={true}
      rotateBar={true}
    >
      <div className={styles.description}>
        <div>Rates for the last 10 days</div>
        <div>
          {baseCurrency?.code} to {targetCurrency?.code}
        </div>
      </div>
      <div className={styles.plot}>
        <div className={styles.plot__body}>
          <div className={styles['y-axis']}>{GenerateYValues()}</div>
          <div className={styles.plot__column}>
            <div
              className={styles.rates}
              id='rates'
            >
              {rates.map((rate, i) => {
                const maxHeight = 200 - 12 + 1.5;
                const minHeight = 10 + 12.5 + 1.5;
                const subHeight = maxHeight - minHeight;
                const newMax = max - min;
                const coefficient = rate.rate - min;
                return (
                  <div
                    className={styles.col}
                    key={i}
                    title={String(rate.rate)}
                    style={{
                      height: `${minHeight + (subHeight / newMax) * coefficient}px`,
                    }}
                  ></div>
                );
              })}
            </div>
            <div className={styles['x-axis']}>
              {rates.map((rate) => {
                return <div key={rate.date}>{rate.date.slice(-2)}</div>;
              })}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
