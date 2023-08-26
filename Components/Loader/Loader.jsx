import styles from '../../styles/Loader.module.css'

export default function Loader() {
  const letters = '0123456789.,'

  const hackerStyle = (e) => {
    let iterations = 0
    const interval = setInterval(() => {
      e.target.innerText = e.target.innerText
        .split('')
        .map((letter, index) => {
          if (index < iterations) {
            return e.target.dataset.value[index]
          }
          return letters[Math.floor(Math.random() * 12)]
        })
        .join('')
      if (iterations >= e.target.dataset.value.length) {
        clearInterval(interval)
      }
      iterations += 1 / 3
    }, 30)
  }
  return (
    <div className={styles.loaderRing}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
