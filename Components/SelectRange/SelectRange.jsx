import { useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from '../../styles/SelectRange.module.css'
import { setSelectRangeValue } from '../../Store/store'

export default function SelectRange() {
  const dispatch = useDispatch()
  const [active, setActive] = useState(0)

  const handleSelectChange = (value, active) => {
    dispatch(setSelectRangeValue(value))
    setActive(active)
  }

  return (
    <section className={styles.selectRangeSection}>
      <div className={styles.rangeContainer}>
        <p>Last</p>
        <button className={`${styles.rangeChoice} ${active === 0 ? styles.active : ''} `} onClick={() => handleSelectChange(7, 0)}>
          7 Days
        </button>
        <button className={`${styles.rangeChoice} ${active === 1 ? styles.active : ''} `} onClick={() => handleSelectChange(30, 1)}>
          30 Days
        </button>
        <button className={`${styles.rangeChoice} ${active === 2 ? styles.active : ''} `} onClick={() => handleSelectChange(180, 2)}>
          180 Days
        </button>
        <button className={`${styles.rangeChoice} ${active === 3 ? styles.active : ''} `} onClick={() => handleSelectChange(365, 3)}>
          365 Days
        </button>
      </div>
    </section>
  )
}
