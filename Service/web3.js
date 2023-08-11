import { current } from '@reduxjs/toolkit'
import Web3 from 'web3'

const avalancheProvider = 'https://api.avax.network/ext/bc/C/rpc'
const web3 = new Web3(avalancheProvider)

function getTimestampForTodayAt12And13() {
  const currentDay = new Date()
  currentDay.setHours(12, 0, 0, 0)
  const timestampTodayAt12 = currentDay.getTime()
  const timestampTodayAt13 = timestampTodayAt12 + 3600000
  return [timestampTodayAt12, timestampTodayAt13]
}

function getTimestampForAllDayInRange(range, timestampAt12, timestampAt13) {
  let timestampForAllDayInRange = []
  for (let i = 1; i < range; i++) {
    timestampForAllDayInRange.push([timestampAt12 - i * 86400000, timestampAt13 - i * 86400000])
  }

  return timestampForAllDayInRange.reverse()
}

function getDateForAllDayInRange(timestampForAllDayInRange) {
  const dateForAllDayInRange = timestampForAllDayInRange.map((element) => {
    const date = new Date(element[0])
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  })
  return dateForAllDayInRange
}

async function findBlockBetweenTimestamps(targetTimestamps) {
  const [timestamp1, timestamp2] = targetTimestamps
  let startBlockNumber = 0
  let endBlockNumber = Number(await web3.eth.getBlockNumber())
  let blockNumber = -1

  while (startBlockNumber <= endBlockNumber) {
    const midBlockNumber = Math.floor((startBlockNumber + endBlockNumber) / 2)
    const block = await web3.eth.getBlock(midBlockNumber)
    const blockTimestamp = Number(block.timestamp) * 1000

    if (blockTimestamp < timestamp1) {
      startBlockNumber = midBlockNumber + 1
    } else if (blockTimestamp > timestamp2) {
      endBlockNumber = midBlockNumber - 1
    } else {
      blockNumber = midBlockNumber
      break
    }
  }
  return blockNumber
}

async function getBlockNumberForEachTimestampRange(timestampForAllDayInRange) {
  const blockNumberForEachTimestampRange = timestampForAllDayInRange.map((range) => {
    return findBlockBetweenTimestamps(range)
  })
  return blockNumberForEachTimestampRange
}

async function getBalanceForSpecificBlockNumber(address, blockNumber) {
  const balanceInWei = await web3.eth.getBalance(address, blockNumber)
  const balanceInAVAX = parseFloat((Number(balanceInWei) / 1e18).toFixed(4))
  return balanceInAVAX
}

async function getBalanceForEachBlockInRange(blockRange, address) {
  const balanceForEachBlockInRange = blockRange.map((block) => {
    return getBalanceForSpecificBlockNumber(address, block)
  })
  return balanceForEachBlockInRange
}

export function getFormatedDataToDrawChart(dateRange, balanceRange) {
  let data = []
  if (dateRange.length !== balanceRange.length) {
    alert("dateRange lenght doesn't match balanceRange length")
  } else {
    for (let i = 0; i < dateRange.length; i++) {
      data.push({ time: dateRange[i], value: balanceRange[i] })
    }
  }
  return data
}

export async function getData(address, range) {
  const timestampForTodayAt12And13 = getTimestampForTodayAt12And13()
  const timestampForAllDayInRange = getTimestampForAllDayInRange(range, timestampForTodayAt12And13[0], timestampForTodayAt12And13[1])
  const dateForAllDayInRange = getDateForAllDayInRange(timestampForAllDayInRange)
  const blockNumberForEachTimestampRangePromises = await getBlockNumberForEachTimestampRange(timestampForAllDayInRange)
  const blockNumberForEachTimestampRange = await Promise.all(blockNumberForEachTimestampRangePromises)
  const balanceForEachBlockInRangePromises = await getBalanceForEachBlockInRange(blockNumberForEachTimestampRange, address)
  const balanceForEachBlockInRange = await Promise.all(balanceForEachBlockInRangePromises)
  console.log(balanceForEachBlockInRange)
  console.log(dateForAllDayInRange)
  const formatedData = getFormatedDataToDrawChart(dateForAllDayInRange, balanceForEachBlockInRange)
  return formatedData
}
