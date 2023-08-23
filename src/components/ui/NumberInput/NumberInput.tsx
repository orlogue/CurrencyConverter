import './NumberInput.module.scss'
import {useState} from "react";

export default function NumberInput() {
  const [value, setValue] = useState("");

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const rule = new RegExp('^[0-9]*(?:\.[0-9]{0,2})?$');
    const newValue = e.target.value;
    console.log(newValue)
    if (rule.test(newValue)) {
      setValue(e.target.value);
    }
  }

  return (
    <input
      type="number"
      value={value}
      onChange={handleInput}
      placeholder="0,0"
    />
  );
}