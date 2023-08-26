import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import styles from '../../styles/DataSummary.module.css'
import Loader from '../Loader/Loader'

export default function SummaryCard({ input, balance, title, showRange, isLoading, currency }) {
  const range = useSelector((state) => state.selectRangeValue)
  const maRef = useRef(null)
  const letters = '0123456789'

  const hackerStyle = (ref) => {
    let iterations = 0
    const interval = setInterval(() => {
      ref.current.innerText = (Math.random() * 1000).toFixed(2)
      iterations += 1 / 3
    }, 80)
    return () => clearInterval(interval)
  }

  useEffect(() => {
    if (isLoading) {
      const cleanupHackerStyle = hackerStyle(maRef)
      return cleanupHackerStyle // Nettoyer l'effet lorsque isLoading devient false
    } else {
      maRef.current.innerText = balance // Rétablir le contenu normal lorsque isLoading devient false
    }
  }, [isLoading, balance])

  return (
    <article className={styles.card}>
      {showRange === true ? <h2>{`${title} ${range} days`}</h2> : <h2>{title}</h2>}
      <div ref={maRef} className={styles.balance}>
        {input === '' ? null : `${balance} ${currency === 'crypto' ? 'AVAX' : '$'}`}
      </div>
    </article>
  )
}
