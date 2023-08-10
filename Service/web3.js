import { current } from '@reduxjs/toolkit'
import Web3 from 'web3'

//0xA22BCe5a3CB160399bD30E74D5e8B16D3C0c2d6B
// 0x1142184C427c843172c14025DF52501536caFE26

const avalancheProvider = 'https://api.avax.network/ext/bc/C/rpc'
const web3 = new Web3(avalancheProvider)

export async function getBalance(inputValue) {
  const address = inputValue
  const balanceInWei = await web3.eth.getBalance(address)
  const balanceInAVAX = (Number(balanceInWei) / 1e18).toFixed(4)
  const currentBlock = await web3.eth.getBlockNumber()
  const blockInfo = await web3.eth.getBlock(currentBlock)

  let timeStamp = blockInfo.timestamp
  if (typeof timeStamp === 'bigint') {
    timeStamp = Number(timeStamp.toString())
  }

  const currentTimeStamp = new Date().getTime()
  console.log(new Date(timeStamp * 1000))
  console.log(new Date(currentTimeStamp - 86400000))
  return balanceInAVAX
}
