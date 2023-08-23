import './CurrencySelect.module.scss';

export default function CurrencySelect({ currency }: {currency: string}) {
  return (
    <select defaultValue={currency}>
      <option value="RUB">RUB</option>
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
    </select>
  );
}