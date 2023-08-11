import styles from '../../styles/DataSummary.module.css'
import SummaryCard from '../SummaryCard/SummaryCard'

export default function DataSummary({ input, currentBalance, maxBalance, minBalance, isLoading }) {
  return (
    <section className={styles.summaryContainer}>
      <SummaryCard input={input} balance={currentBalance} title="Current Balance" showRange={false} isLoading={isLoading} />
      <SummaryCard input={input} balance={maxBalance} title={'Max last'} showRange={true} isLoading={isLoading} />
      <SummaryCard input={input} balance={minBalance} title={'Min last'} showRange={true} isLoading={isLoading} />
    </section>
  )
}
