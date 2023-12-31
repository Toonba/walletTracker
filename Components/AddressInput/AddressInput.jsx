import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import styles from '../../styles/AddressInput.module.css'
import { setInputValue, setCurrentBalance } from '../../Store/store'

export default function AddressInput() {
  const dispatch = useDispatch()
  const [address, setAddress] = useState('')
  const inputValue = useSelector((state) => state.inputValue)

  const handleInputChange = (event) => {
    setAddress(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(setInputValue(address))
  }
  
  return (
    <section className={styles.inputSection}>
      <form className={styles.form} action="" onSubmit={handleSubmit}>
        {/* <label className={styles.label} htmlFor="addy">
          What's your address
        </label> */}
        <input className={styles.input} type="text" id="addy" name="addy" onChange={handleInputChange} value={address} placeholder="Avalanche C-Chain Address" />
        <button className={styles.button}>Show me</button>
      </form>
    </section>
  )
}
