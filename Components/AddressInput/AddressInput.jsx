import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getBalance } from '../../Service/web3'
import styles from '../../styles/AddressInput.module.css'
import { setInputValue, setCurrentBalance } from '../../Store/store'

/**
 *
 * @returns {React.Component} form once submited give the current balance of address given as input
 */

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

  // useEffect(() => {
  //     if (inputValue !== '') {
  //       dispatch
  //     }
  //   }, [inputValue])

  return (
    <section className={styles.inputSection}>
      <form className={styles.form} action="" onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="addy">
          What's your address
        </label>
        <input className={styles.input} type="text" id="addy" name="addy" onChange={handleInputChange} value={address} placeholder="0xA22BCe5a3CB160399bD30E74D5e8B16D3C0c2d6B" />
        <button className={styles.button}>Show me</button>
      </form>
    </section>
  )
}
