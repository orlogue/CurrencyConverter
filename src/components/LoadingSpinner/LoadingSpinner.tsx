import styles from './LoadingSpinner.module.scss'

export default function LoadingSpinner() {
  return (
    <div className={styles['spinner-container']}>
      <div className={styles['loading-spinner']}></div>
    </div>
  )
}
