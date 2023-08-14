import { useSelector } from 'react-redux'
import styles from '../../styles/DataSummary.module.css'
import Loader from '../Loader/Loader'

export default function SummaryCard({ input, balance, title, showRange, isLoading, currency }) {
  const range = useSelector((state) => state.selectRangeValue)
  return (
    <article className={styles.card}>
      {showRange === true ? <h2>{`${title} ${range} days`}</h2> : <h2>{title}</h2>}
      <div className={styles.balance}>{input === '' ? null : isLoading === true ? <Loader /> : `${balance} ${currency === 'crypto' ? 'AVAX' : '$'}`}</div>
    </article>
  )
}
