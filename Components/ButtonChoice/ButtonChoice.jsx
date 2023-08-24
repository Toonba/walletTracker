import styles from '../../styles/SelectOptions.module.css'

export default function ButtonChoice({onClick, content, isActive, index }) {
  return (
    <button className={`${styles.buttonChoice} ${isActive === index? styles.active : ''}`} onClick={onClick}>
      {content}
    </button>
  )
}
