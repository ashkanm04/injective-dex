import {
  BigNumber,
  BigNumberInBase,
  BigNumberInWei
} from '@injectivelabs/utils'
import { BalanceWithToken } from '@injectivelabs/sdk-ui-ts'
import { Coin } from '@injectivelabs/sdk-ts'
import { type Token } from '@injectivelabs/token-metadata'

BigNumber.config({
  FORMAT: {
    decimalSeparator: '.',
    groupSeparator: ',',
    groupSize: 3,
    secondaryGroupSize: 0,
    fractionGroupSeparator: ' ',
    fractionGroupSize: 0
  }
})

export const formatWalletAddress = (address: string): string => {
  if (address.length <= 10) {
    return address
  }

  return `${address.slice(0, 6)}...${address.slice(
    address.length - 6,
    address.length
  )}`
}

export function formatAmount(
  amount: BigNumberInBase,
  displayDecimals: number
): string {
  return amount.toFormat(displayDecimals || 1, BigNumber.ROUND_DOWN)
}

export function formatPrice(
  amount: BigNumberInBase,
  displayDecimals: number
): string {
  return amount.toFormat(displayDecimals || 1, BigNumber.ROUND_HALF_UP)
}

export function formatPriceUp(
  amount: BigNumberInBase,
  displayDecimals: number
): string {
  return amount.toFormat(displayDecimals || 1, BigNumber.ROUND_UP)
}

export function formatPriceDown(
  amount: BigNumberInBase,
  displayDecimals: number
): string {
  return amount.toFormat(displayDecimals || 1, BigNumber.ROUND_DOWN)
}

export function formatPrecision(amount: BigNumber, precision: number): string {
  return amount.toFormat(precision, BigNumber.ROUND_DOWN)
}

export function formatPercent({
  number,
  precision = 0,
  appendPlusSign = false
}: {
  number: any
  precision: number
  appendPlusSign: boolean
}): string {
  const numberInBigNumber =
    number instanceof BigNumber ? number : new BigNumber(number)
  const prefix = appendPlusSign && numberInBigNumber.isGreaterThan(0) ? '+' : ''
  const suffix = '%'

  return `${prefix}${String(numberInBigNumber.toFixed(precision))}${suffix}`
}

export const toBalanceInToken = ({
  value,
  decimalPlaces,
  fixedDecimals,
  roundingMode
}: {
  value: string | number
  decimalPlaces: number
  fixedDecimals?: number
  roundingMode?: BigNumber.RoundingMode
}): string => {
  const balanceInToken = new BigNumberInWei(value).toBase(decimalPlaces)

  if (fixedDecimals) {
    return balanceInToken.toFixed(fixedDecimals, roundingMode)
  }

  return balanceInToken.toFixed()
}

export const convertCoinToBalancesWithToken = (
  coin: Coin
): BalanceWithToken | undefined => {
  const tokenStore = useTokenStore()

  const meta = tokenStore.tokens.find(
    (token: Token) => token.denom === coin.denom
  )

  if (!meta) {
    return
  }

  return {
    token: meta,
    denom: coin.denom,
    balance: coin.amount
  }
}
