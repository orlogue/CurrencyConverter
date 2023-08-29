import './CurrencySelect.module.scss';
import { useCurrency } from "../../context/CurrencyContext.tsx";

export default function CurrencySelect({ currencyCode, setCurrency }: {
  currencyCode: string,
  setCurrency: (code: string) => void
}) {
  const { currencies } = useCurrency()
  const currenciesList = [];
  for (const code in currencies) {
    currenciesList.push(
      <option
        key={code}
        value={code}
      >
        {code}
      </option>
    );
  }

  return (
    <select
      value={currencyCode}
      onChange={e => setCurrency(e.target.value)}
    >
      {currenciesList}
    </select>
  );
}