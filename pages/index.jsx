import { useState, useEffect } from 'react'
import { getData } from '../Service/web3'
import { getUsdPrice, getUsdBalance } from '../Service/getUsdData'
import ChartComponent from '../Components/Chart/Chart'
import AddressInput from '../Components/AddressInput/AddressInput'
import DataSummary from '../Components/DataSummary/DataSummary'
import SelectOptions from '../Components/SelectOptions/SelectOptions'
import { Provider } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentBalance } from '../Store/store'
import store from '../Store/store'
import { current } from '@reduxjs/toolkit'

export default function WalletTracker() {
  const dispatch = useDispatch()
  const avalancheChainId = 'avalanche-2'
  const [cryptoBalance, setCryptoBalance] = useState([])
  // const [usdPriceData, setUsdPriceData] = useState([])
  const [usdBalance, setUsdBalance] = useState([])
  const [maxBalance, setMaxBalance] = useState(null)
  const [minBalance, setMinBalance] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const currentBalance = useSelector((state) => state.currentBalance)
  const inputValue = useSelector((state) => state.inputValue)
  const range = useSelector((state) => state.selectRangeValue)
  const currency = useSelector((state) => state.balanceCurrency)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      if (inputValue !== '') {
        try {
          const cryptoResult = await getData(inputValue, range)
          const usdResult = await getUsdPrice(avalancheChainId, range)
          // setUsdPriceData(usdResult)
          setCryptoBalance(cryptoResult)
          setUsdBalance(getUsdBalance(cryptoResult, usdResult))
        } catch (error) {
          console.error('Error fetching data:', error)
        } finally {
          setIsLoading(false)
        }
      }
    }
    fetchData()
  }, [inputValue, range])

  useEffect(() => {
    const getMax = (data) => {
      const maxValue = data.reduce((max, current) => {
        if (current.value > max) {
          return current.value
        } else {
          return max
        }
      }, 0)
      return maxValue
    }
    const getMin = (data) => {
      const minValue = data.reduce((min, current) => {
        if (current.value < min) {
          return current.value
        } else {
          return min
        }
      }, Infinity)
      return minValue
    }
    if (currency === 'crypto' && inputValue !== '') {
      setMaxBalance(getMax(cryptoBalance))
      setMinBalance(getMin(cryptoBalance))
      dispatch(setCurrentBalance(cryptoBalance[cryptoBalance.length - 1].value))
    } else if (currency === 'usd' && inputValue !== '') {
      setMaxBalance(getMax(usdBalance))
      setMinBalance(getMin(usdBalance))
      dispatch(setCurrentBalance(usdBalance[usdBalance.length - 1].value))
    }
  }, [currency, cryptoBalance, usdBalance])

  return (
    <Provider store={store}>
      <h1>Track Your Performance</h1>
      <DataSummary input={inputValue} currentBalance={currentBalance} maxBalance={maxBalance} minBalance={minBalance} isLoading={isLoading} currency={currency} />
      <AddressInput />
      <SelectOptions />
      {inputValue === '' ? null : currency === 'crypto' ? <ChartComponent data={cryptoBalance} colors={{ backgroundColor: '#121212', textColor: 'white', areaTopColor: '#BB86FC', areaBottomColor: 'rgba(41, 98, 255, 0.28)' }} isLoading={isLoading}></ChartComponent> : <ChartComponent data={usdBalance} colors={{ backgroundColor: '#121212', textColor: 'white', areaTopColor: '#BB86FC', areaBottomColor: 'rgba(41, 98, 255, 0.28)' }} isLoading={isLoading}></ChartComponent>}
    </Provider>
  )
}
