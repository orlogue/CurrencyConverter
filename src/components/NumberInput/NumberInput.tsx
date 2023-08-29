import './NumberInput.module.scss'
import React from "react";

export default function NumberInput({ value, setValue, disabled = false }: {
  value: string,
  setValue?: React.Dispatch<React.SetStateAction<string>>,
  disabled?: boolean,
}) {
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const rule = new RegExp(/^(|0|[1-9][0-9]*)(?:(,|\.)[0-9]{0,2})?$/);
    let newValue = e.target.value.replace(',', '.');

    if (newValue === '.') {
      newValue = '0.'
    }

    if (setValue && (rule.test(newValue))) {
      setValue(newValue);
    }
  }

  return (
    <input
      lang="en-US"
      value={value}
      inputMode="decimal"
      onChange={handleInput}
      placeholder="0.00"
      disabled={disabled}
    />
  );
}