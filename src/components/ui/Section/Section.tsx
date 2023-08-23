import './Section.module.scss';
import {ReactNode} from "react";
import Title from "../Title/Title.tsx";

interface SideSectionProps {
  title: string,
  parentClasses: string,
  children: ReactNode
}

export default function Section({title, parentClasses, children}: SideSectionProps) {
  return (
    <section className={parentClasses}>
      {/*<div className={styles['section__body']}>*/}
      <Title title={title}/>
      {children}
      {/*</div>*/}
    </section>
  );
}