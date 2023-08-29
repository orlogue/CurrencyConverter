import styles from "./Section.module.scss";
import React, { useState } from "react";
import Title from "../Title/Title.tsx";
import arrow from '../../assets/arrow-down.svg'

interface SideSectionProps {
  title: string,
  parentClasses: string,
  canBeHidden?: boolean,
  hidden?: boolean,
  rotateBar?: boolean,
  handleButtonClick?: () => void,
  children: React.ReactNode
}

export default function Section({ title, parentClasses, canBeHidden = false, rotateBar = false, children }: SideSectionProps) {
  const [hidden, setHidden] = useState(false);
  const [rotate, setRotate] = useState(rotateBar);

  function handleButtonClick() {
    setHidden(!hidden);
    setRotate(!rotate)
  }

  return (
    <section className={parentClasses + (hidden ? ' ' + styles.hidden : '')}>
      <div className={styles['section-bar'] + ' ' + (hidden ? styles.hidden : '') + ' ' + (rotateBar ? styles.rotate : '')}>
        {canBeHidden &&
          <img className={hidden ? styles['hide-svg_closed'] : styles['hide-svg']}
               onClick={handleButtonClick}
               src={arrow}
               alt='hide button'/>
        }
        <Title title={title}/>
      </div>
      {!hidden && children}
    </section>
  );
}
