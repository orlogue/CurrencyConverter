import styles from './Converter.module.scss';
import Section from "../../components/ui/Section/Section.tsx";
import NumberInput from "../../components/ui/NumberInput/NumberInput.tsx";
import CurrencySelect from "../../components/ui/CurrencySelect/CurrencySelect.tsx";
import Button from "../../components/ui/Button/Button.tsx";

export default function Converter() {
  return (
    <Section
      parentClasses={styles.converter}
      title="Convert"
    >
      <div className={styles['currency-input']}>
        <div className={styles['currency-input__row']}>
          <NumberInput/>
          <CurrencySelect currency="RUB"/>
        </div>
        <Button text="Swap"/>
        <div className={styles['currency-input__row']}>
          <NumberInput/>
          <CurrencySelect currency="USD"/>
        </div>
      </div>
    </Section>
  );
}
