import { BigNumber } from '@ethersproject/bignumber'
import { Fraction, JSBI, Price, Pair, Token, Currency, WETH } from 'libs/sdk/src'
import { ZERO, ONE, ChainId } from 'libs/sdk/src/constants'
import { UserLiquidityPosition } from 'state/pools/hooks'
import { formattedNum } from 'utils'

import {
  Currency as CurrencySUSHI,
  TokenAmount as TokenAmountSUSHI,
  Token as TokenSUSHI,
  ChainId as ChainIdSUSHI
} from '@sushiswap/sdk'

import {
  Currency as CurrencyUNI,
  TokenAmount as TokenAmountUNI,
  Token as TokenUNI,
  ChainId as ChainIdUNI
} from '@uniswap/sdk'

import {
  Currency as CurrencyDMM,
  Token as TokenDMM,
  TokenAmount as TokenAmountDMM,
  ChainId as ChainIdDMM
} from 'libs/sdk/src'
import { BLOCKS_PER_YEAR } from '../constants'
import { useActiveWeb3React } from 'hooks'

export function priceRangeCalc(price?: Price | Fraction, amp?: Fraction): [Fraction | undefined, Fraction | undefined] {
  //Ex amp = 1.23456
  if (amp && (amp.equalTo(ONE) || amp?.equalTo(ZERO))) return [undefined, undefined]
  const temp = amp?.divide(amp?.subtract(JSBI.BigInt(1)))
  if (!amp || !temp || !price) return [undefined, undefined]
  return [
    (price as Price)?.adjusted.multiply(temp).multiply(temp),
    (price as Price)?.adjusted.divide(temp.multiply(temp))
  ]
}

/**
 * Get health factor (F) of a pool
 */
export function getHealthFactor(pool: Pair): Fraction {
  return pool.reserve0.multiply(pool.reserve1)
}

function getToken0MinPrice(pool: Pair): Fraction {
  const temp = pool.virtualReserve1.subtract(pool.reserve1)
  return temp
    .multiply(temp)
    .divide(pool.virtualReserve0)
    .divide(pool.virtualReserve1)
}

function getToken0MaxPrice(pool: Pair): Fraction {
  const temp = pool.virtualReserve0.subtract(pool.reserve0)
  return pool.virtualReserve0
    .multiply(pool.virtualReserve1)
    .divide(temp)
    .divide(temp)
}

function getToken1MinPrice(pool: Pair): Fraction {
  const temp = pool.virtualReserve0.subtract(pool.reserve0)
  return temp
    .multiply(temp)
    .divide(pool.virtualReserve0)
    .divide(pool.virtualReserve1)
}

function getToken1MaxPrice(pool: Pair): Fraction {
  const temp = pool.virtualReserve1.subtract(pool.reserve1)
  return pool.virtualReserve0
    .multiply(pool.virtualReserve1)
    .divide(temp)
    .divide(temp)
}

export const priceRangeCalcByPair = (pair?: Pair): [Fraction | undefined, Fraction | undefined][] => {
  //Ex amp = 1.23456
  if (!pair || new Fraction(pair.amp).equalTo(JSBI.BigInt(10000)))
    return [
      [undefined, undefined],
      [undefined, undefined]
    ]
  return [
    [getToken0MinPrice(pair), getToken0MaxPrice(pair)],
    [getToken1MinPrice(pair), getToken1MaxPrice(pair)]
  ]
}

export const feeRangeCalc = (amp: number): string => {
  let baseFee = 0
  if (amp > 20) baseFee = 4
  if (amp <= 20 && amp > 5) baseFee = 10
  if (amp <= 5 && amp > 2) baseFee = 20
  if (amp <= 2) baseFee = 30

  return `${(baseFee / 2 / 100).toPrecision()}% - ${((baseFee * 2) / 100).toPrecision()}%`
}

const DEFAULT_MY_LIQUIDITY = '-'

export const getMyLiquidity = (liquidityPosition?: UserLiquidityPosition): string | 0 => {
  if (!liquidityPosition || parseFloat(liquidityPosition.pool.totalSupply) === 0) {
    return DEFAULT_MY_LIQUIDITY
  }

  const myLiquidity =
    (parseFloat(liquidityPosition.liquidityTokenBalance) * parseFloat(liquidityPosition.pool.reserveUSD)) /
    parseFloat(liquidityPosition.pool.totalSupply)

  if (myLiquidity === 0) {
    return DEFAULT_MY_LIQUIDITY
  }

  return formattedNum(myLiquidity.toString(), true)
}

export function convertChainIdFromDmmToSushi(chainId: ChainIdDMM) {
  switch (chainId) {
    case ChainIdDMM.MAINNET:
      return ChainIdSUSHI.MAINNET
    case ChainIdDMM.ROPSTEN:
      return ChainIdSUSHI.ROPSTEN
    case ChainIdDMM.RINKEBY:
      return ChainIdSUSHI.RINKEBY
    case ChainIdDMM.GÖRLI:
      return ChainIdSUSHI.GÖRLI
    case ChainIdDMM.KOVAN:
      return ChainIdSUSHI.KOVAN
    case ChainIdDMM.MATIC:
      return ChainIdSUSHI.MATIC
    case ChainIdDMM.MUMBAI:
      return ChainIdSUSHI.MATIC_TESTNET
  }
}

export function convertChainIdFromUniToDMM(chainId: ChainIdUNI) {
  switch (chainId) {
    case ChainIdUNI.MAINNET:
      return ChainIdDMM.MAINNET
    case ChainIdUNI.ROPSTEN:
      return ChainIdDMM.ROPSTEN
    case ChainIdUNI.RINKEBY:
      return ChainIdDMM.RINKEBY
    case ChainIdUNI.GÖRLI:
      return ChainIdDMM.GÖRLI
    case ChainIdUNI.KOVAN:
      return ChainIdDMM.KOVAN
  }
}

export function convertChainIdFromDmmToUni(chainId: ChainIdDMM) {
  switch (chainId) {
    case ChainIdDMM.MAINNET:
      return ChainIdUNI.MAINNET
    case ChainIdDMM.ROPSTEN:
      return ChainIdUNI.ROPSTEN
    case ChainIdDMM.RINKEBY:
      return ChainIdUNI.RINKEBY
    case ChainIdDMM.GÖRLI:
      return ChainIdUNI.GÖRLI
    case ChainIdDMM.KOVAN:
      return ChainIdUNI.KOVAN
    default:
      return undefined
  }
}

export function convertChainIdFromSushiToDMM(chainId: ChainIdSUSHI) {
  switch (chainId) {
    case ChainIdSUSHI.MAINNET:
      return ChainIdDMM.MAINNET
    case ChainIdSUSHI.ROPSTEN:
      return ChainIdDMM.ROPSTEN
    case ChainIdSUSHI.RINKEBY:
      return ChainIdDMM.RINKEBY
    case ChainIdSUSHI.GÖRLI:
      return ChainIdDMM.GÖRLI
    case ChainIdSUSHI.KOVAN:
      return ChainIdDMM.KOVAN
    case ChainIdSUSHI.MATIC:
      return ChainIdDMM.MATIC
    case ChainIdSUSHI.MATIC_TESTNET:
      return ChainIdDMM.MUMBAI
    default:
      return undefined
  }
}

export function tokenSushiToDmm(tokenSushi: TokenSUSHI): TokenDMM | undefined {
  const chainIdDMM = convertChainIdFromSushiToDMM(tokenSushi.chainId)
  return !!chainIdDMM
    ? new TokenDMM(chainIdDMM, tokenSushi.address, tokenSushi.decimals, tokenSushi.symbol, tokenSushi.name)
    : undefined
}
export function tokenDmmToSushi(tokenDmm: TokenDMM): TokenSUSHI {
  return new TokenSUSHI(
    convertChainIdFromDmmToSushi(tokenDmm.chainId),
    tokenDmm.address,
    tokenDmm.decimals,
    tokenDmm.symbol,
    tokenDmm.name
  )
}

export function tokenUniToDmm(tokenUni: TokenUNI): TokenDMM | undefined {
  return new TokenDMM(tokenUni.chainId as ChainId, tokenUni.address, tokenUni.decimals, tokenUni.symbol, tokenUni.name)
}

export function tokenDmmToUni(tokenDmm: TokenDMM): TokenUNI | undefined {
  const chainIdUNI = convertChainIdFromDmmToUni(tokenDmm.chainId)
  return !!chainIdUNI
    ? new TokenUNI(chainIdUNI, tokenDmm.address, tokenDmm.decimals, tokenDmm.symbol, tokenDmm.name)
    : undefined
}

export function tokenAmountDmmToSushi(amount: TokenAmountDMM): TokenAmountSUSHI {
  return new TokenAmountSUSHI(
    new TokenSUSHI(
      convertChainIdFromDmmToSushi(amount.token.chainId),
      amount.token.address,
      amount.token.decimals,
      amount.token.symbol,
      amount.token.name
    ),
    amount.raw
  )
}

export function tokenAmountDmmToUni(amount: TokenAmountDMM): TokenAmountUNI | undefined {
  const chainIdUNI = convertChainIdFromDmmToUni(amount.token.chainId)
  return !!chainIdUNI
    ? new TokenAmountUNI(
        new TokenUNI(chainIdUNI, amount.token.address, amount.token.decimals, amount.token.symbol, amount.token.name),
        amount.raw
      )
    : undefined
}

/**
 * Get farm APR value in %
 * @param kncPriceUsd KNC price in USD
 * @param poolLiquidityUsd Total pool liquidity in USD
 * @returns
 */
export function getFarmApr(
  rewardToken: Token,
  rewardPerBlock: BigNumber,
  kncPriceUsd: string,
  poolLiquidityUsd: string
): number {
  if (parseFloat(poolLiquidityUsd) === 0) {
    return 0
  }

  const rewardPerBlockAmount = new TokenAmountDMM(rewardToken, rewardPerBlock.toString())

  const yearlyKNCRewardAllocation = parseFloat(rewardPerBlockAmount.toSignificant(6)) * BLOCKS_PER_YEAR
  const apr = ((yearlyKNCRewardAllocation * parseFloat(kncPriceUsd)) / parseFloat(poolLiquidityUsd)) * 100

  return apr
}

export function convertToNativeTokenFromETH(currency: Currency, chainId: ChainIdDMM): Currency {
  if (chainId && [137, 80001].includes(chainId) && currency === Currency.ETHER) {
    return new TokenDMM(chainId, WETH[chainId].address, 18, 'MATIC', 'MATIC')
  } else if (chainId && [137, 80001].includes(chainId) && currency.symbol === `WETH`) {
    return new TokenDMM(chainId, WETH[chainId].address, 18, 'WMATIC', 'WMATIC')
  }
  return currency
}

export function useCurrencyConvertedToNative(currency?: Currency): Currency | undefined {
  const { chainId } = useActiveWeb3React()
  if (!!currency && !!chainId) {
    return convertToNativeTokenFromETH(currency, chainId)
  }
  return undefined
}
