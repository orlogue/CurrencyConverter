import './Button.module.scss';

export default function Button({ text, onClickHandle }: { text: string; onClickHandle: () => void }) {
  return <button onClick={onClickHandle}>{text}</button>;
}
