import Web3 from 'web3'

//0xA22BCe5a3CB160399bD30E74D5e8B16D3C0c2d6B

const avalancheProvider = 'https://api.avax.network/ext/bc/C/rpc'
const web3 = new Web3(avalancheProvider)

export async function getBalance() {
  const address = '0xA22BCe5a3CB160399bD30E74D5e8B16D3C0c2d6B'
  const balanceInWei = await web3.eth.getBalance(address)
  const balanceInAVAX = (Number(balanceInWei) / 1e18).toFixed(4)
  const balance = Number(balanceInAVAX).toFixed(4)
  console.log(balanceInAVAX)
  return balanceInAVAX
}
