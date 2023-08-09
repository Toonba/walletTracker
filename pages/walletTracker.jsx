import { useState, useEffect } from 'react'
import { getBalance } from '../Service/web3'
import ChartComponent from '../Components/Chart/Chart'
import styles from '../styles/WalletTracker.module.css'

const initialData = [
  { time: '2018-12-22', value: 32.51 },
  { time: '2018-12-23', value: 31.11 },
  { time: '2018-12-24', value: 27.02 },
  { time: '2018-12-25', value: 27.32 },
  { time: '2018-12-26', value: 25.17 },
  { time: '2018-12-27', value: 28.89 },
  { time: '2018-12-28', value: 25.46 },
  { time: '2018-12-29', value: 23.92 },
  { time: '2018-12-30', value: 22.68 },
  { time: '2018-12-31', value: 22.67 },
  { time: '2019-01-01', value: 32.51 },
  { time: '2019-01-02', value: 31.11 },
  { time: '2019-01-03', value: 27.02 },
  { time: '2019-01-04', value: 27.32 },
  { time: '2019-01-05', value: 25.17 },
  { time: '2019-01-06', value: 28.89 },
  { time: '2019-01-07', value: 25.46 },
  { time: '2019-01-08', value: 23.92 },
  { time: '2019-01-09', value: 22.68 },
  { time: '2019-01-10', value: 32.51 },
  { time: '2019-01-11', value: 31.11 },
  { time: '2019-01-12', value: 27.02 },
  { time: '2019-01-13', value: 27.32 },
  { time: '2019-01-14', value: 25.17 },
  { time: '2019-01-15', value: 28.89 },
  { time: '2019-01-16', value: 25.46 },
  { time: '2019-01-17', value: 23.92 },
  { time: '2019-01-18', value: 22.68 }
]

export default function WalletTracker() {
  const [myData, setMyData] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const result = await getBalance()
      setMyData(result)
    }

    fetchData()
  }, [])

  return (
    <div className={styles.container}>
      <h1>Track Your Performance</h1>
      <h2>le Solde est de {`${myData}`}</h2>
      <ChartComponent data={initialData} colors={{ backgroundColor: '#121212', textColor: 'white', areaTopColor: '#BB86FC', areaBottomColor: 'rgba(41, 98, 255, 0.28)' }}></ChartComponent>
    </div>
  )
}
