import styles from './Title.module.scss';

interface Title {
  title: string
}

export default function Title({ title }: Title) {
  return (
    <div className={styles.title}>
      {title}
    </div>
  );
}