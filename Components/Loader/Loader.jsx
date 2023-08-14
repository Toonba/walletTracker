import styles from '../../styles/Loader.module.css'

export default function Loader() {
  return (
    <div className={styles.loaderRing}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
