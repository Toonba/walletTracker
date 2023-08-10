import styles from '../../styles/DataSummary.module.css'
import SummaryCard from '../SummaryCard/SummaryCard'

export default function DataSummary({ input, currentBalance }) {
  return (
    <section className={styles.summaryContainer}>
      <SummaryCard input={input} balance={currentBalance} title="Current Balance" showRange={false} />
      <SummaryCard input={input} balance={currentBalance} title={'Max last'} showRange={true} />
      <SummaryCard input={input} balance={currentBalance} title={'Min last'} showRange={true} />
    </section>
  )
}
