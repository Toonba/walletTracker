import { useState, useEffect } from 'react'
import { getData } from '../Service/web3'
import ChartComponent from '../Components/Chart/Chart'
import AddressInput from '../Components/AddressInput/AddressInput'
import DataSummary from '../Components/DataSummary/DataSummary'
import SelectRange from '../Components/SelectRange/SelectRange'
import { Provider } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentBalance } from '../Store/store'
import store from '../Store/store'

export default function WalletTracker() {
  const dispatch = useDispatch()
  const [myData, setMyData] = useState([])
  const [maxBalance, setMaxBalance] = useState(null)
  const [minBalance, setMinBalance] = useState(null)
  const [isLoading, setIsLoading] =useState(null)
  const currentBalance = useSelector((state) => state.currentBalance)
  const inputValue = useSelector((state) => state.inputValue)
  const range = useSelector((state) => state.selectRangeValue)
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      if (inputValue !== '') {
        try {
          const result = await getData(inputValue, range);
          setMyData(result);
          dispatch(setCurrentBalance(result[result.length - 1].value));
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchData();
  }, [inputValue, range]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (inputValue !== '') {
  //       const result = await getData(inputValue, range)
  //       setMyData(result)
  //       dispatch(setCurrentBalance(result[result.length - 1].value))
  //     }
  //   }

  //   fetchData()
  // }, [inputValue, range])

  useEffect(() => {
    const maxValue = myData.reduce((max, current) => {
      if (current.value > max) {
        return current.value
      } else {
        return max
      }
    }, 0)
    const minValue = myData.reduce((min, current) => {
      if (current.value < min) {
        return current.value
      } else {
        return min
      }
    }, Infinity)
    setMaxBalance(maxValue)
    setMinBalance(minValue)
  }, [myData])

  return (
    <Provider store={store}>
      <h1>Track Your Performance</h1>
      <DataSummary input={inputValue} currentBalance={currentBalance} maxBalance={maxBalance} minBalance={minBalance} isLoading={isLoading} />
      <AddressInput />
      <SelectRange />
      {inputValue === '' ? null : <ChartComponent data={myData} colors={{ backgroundColor: '#121212', textColor: 'white', areaTopColor: '#BB86FC', areaBottomColor: 'rgba(41, 98, 255, 0.28)' }} isLoading={isLoading}></ChartComponent>}
    </Provider>
  )
}
