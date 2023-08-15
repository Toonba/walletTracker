import { useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from '../../styles/SelectOptions.module.css'
import { setSelectRangeValue, setBalanceCurrency } from '../../Store/store'

export default function SelectRange() {
  const dispatch = useDispatch()
  const [rangeActive, setRangeActive] = useState(0)
  const [currencyActive, setCurrencyActive] = useState(0)

  const handleSelectRangeChange = (value, active) => {
    dispatch(setSelectRangeValue(value))
    setRangeActive(active)
  }

  const handleSelectCurrencyChange = (value, active) => {
    dispatch(setBalanceCurrency(value))
    setCurrencyActive(active)
  }

  return (
    <section className={styles.selectOptionsSection}>
      <div className={styles.rangeContainer}>
        <button className={`${styles.rangeChoice} ${rangeActive === 0 ? styles.active : ''} `} onClick={() => handleSelectRangeChange(7, 0)}>
          7 Days
        </button>
        <button className={`${styles.rangeChoice} ${rangeActive === 1 ? styles.active : ''} `} onClick={() => handleSelectRangeChange(30, 1)}>
          30 Days
        </button>
        <button className={`${styles.rangeChoice} ${rangeActive === 2 ? styles.active : ''} `} onClick={() => handleSelectRangeChange(180, 2)}>
          180 Days
        </button>
        <button className={`${styles.rangeChoice} ${rangeActive === 3 ? styles.active : ''} `} onClick={() => handleSelectRangeChange(365, 3)}>
          365 Days
        </button>
      </div>
      <div className={styles.currencyContainer}>
        <button className={`${styles.currencyChoice} ${currencyActive === 0 ? styles.active : ''} `} onClick={() => handleSelectCurrencyChange('crypto', 0)}>
          AVAX
        </button>
        <button className={`${styles.currencyChoice} ${currencyActive === 1 ? styles.active : ''} `} onClick={() => handleSelectCurrencyChange('usd', 1)}>
          USD
        </button>
      </div>
    </section>
  )
}
