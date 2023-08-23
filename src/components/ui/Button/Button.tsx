import './Button.module.scss';

export default function Button({ text }: {text: string}) {
  return (
    <button>{text}</button>
  );
}