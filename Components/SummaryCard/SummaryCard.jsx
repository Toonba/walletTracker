import styles from '../../styles/DataSummary.module.css'

export default function SummaryCard({ input, balance, title }) {
  console.log(title)
  return (
    <article className={styles.card}>
      <h2>{title}</h2>
      <p className={styles.balance}>{input === '' ? null : `${balance}`}</p>
    </article>
  )
}
