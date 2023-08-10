import { useSelector } from 'react-redux'
import styles from '../../styles/DataSummary.module.css'

export default function SummaryCard({ input, balance, title, showRange }) {
  const range = useSelector((state) => state.selectRangeValue)
  return (
    <article className={styles.card}>
      {showRange === true ? <h2>{`${title} ${range} days`}</h2> : <h2>{title}</h2>}
      <p className={styles.balance}>{input === '' ? null : `${balance}`}</p>
    </article>
  )
}
