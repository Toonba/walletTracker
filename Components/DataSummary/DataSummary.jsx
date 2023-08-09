import styles from '../../styles/DataSummary.module.css'
import SummaryCard from '../SummaryCard/SummaryCard'

export default function DataSummary({ input, currentBalance }) {
  return (
    <section className={styles.summaryContainer}>
      <SummaryCard input={input} balance={currentBalance} title='Current Balance' />
      <SummaryCard input={input} balance={currentBalance} title={'Balance Max last'} />
      <SummaryCard input={input} balance={currentBalance} title={'Balance Min last'} />
    </section>
  )
}
