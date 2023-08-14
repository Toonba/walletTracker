const avalancheChainId = 'avalanche-2'
const basUrl = 'https://api.coingecko.com/api/v3/coins/'

export async function getUsdPrice(chainId, range) {
  try {
    const response = await fetch(`${basUrl}/${chainId}/market_chart?vs_currency=usd&days=${range}&interval=daily&precision=2`, {
      method: 'GET'
    })

    if (response.ok) {
      const data = await response.json()
      const unformatedUsdPricesPerDate = data.prices
      const formatedUsdPricesPerDate = unformatedUsdPricesPerDate.map((usdPricesPerDate) => {
        const date = new Date(usdPricesPerDate[0])
        const year = date.getFullYear()
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const day = date.getDate().toString().padStart(2, '0')
        return { date: `${year}-${month}-${day}`, price: parseFloat(usdPricesPerDate[1]) }
      })
      //We only want One price for the currend day, the current one
      const indexToRemove = formatedUsdPricesPerDate.length - 2
      if (indexToRemove >= 0 && indexToRemove < formatedUsdPricesPerDate.length) {
        formatedUsdPricesPerDate.splice(indexToRemove, 1)
      }
      return formatedUsdPricesPerDate
    } else {
      console.log('Error:', response.statusText)
      return null
    }
  } catch (error) {
    console.error('Fetch error:', error)
    return null
  }
}

export function getUsdBalance(cryptoBalanceData, usdPriceData) {
  const usdBalanceData = cryptoBalanceData.map((balanceItem) => {
    const usdMatchingPrice = usdPriceData.find((usdItem) => new Date(usdItem.date).getTime() === new Date(balanceItem.time).getTime())
    if (usdMatchingPrice) {
      return {
        time: balanceItem.time,
        value: balanceItem.value * usdMatchingPrice.price
      }
    } else {
      console.log(`No usdPrice for ${balanceItem.time}`)
    }
    return balanceItem
  })
  return usdBalanceData
}
