import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import { ChainId } from 'libs/sdk/src'

export const defaultExchangeClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri:
    process.env.REACT_APP_MAINNET_ENV === 'staging'
      ? 'https://api.thegraph.com/subgraphs/name/piavgh/dmm-exchange-staging'
      : 'https://api.thegraph.com/subgraphs/name/dynamic-amm/dynamic-amm',
  cache: new InMemoryCache()
})

export const ropstenExchangeClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/piavgh/dmm-exchange-ropsten',
  cache: new InMemoryCache()
})

export const mainnetExchangeClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri:
    process.env.REACT_APP_MAINNET_ENV === 'staging'
      ? 'https://api.thegraph.com/subgraphs/name/piavgh/dmm-exchange-staging'
      : 'https://api.thegraph.com/subgraphs/name/dynamic-amm/dynamic-amm',
  cache: new InMemoryCache()
})

export const maticExchangeClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri:
    process.env.REACT_APP_MAINNET_ENV === 'staging'
      ? 'https://api.thegraph.com/subgraphs/name/piavgh/dmm-exchange-matic-staging'
      : 'https://polygon-subgraph.knstats.com/subgraphs/name/dynamic-amm/dmm-exchange-matic',
  cache: new InMemoryCache()
})

export const mumbaiExchangeClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/piavgh/dmm-exchange-mumbai',
  cache: new InMemoryCache()
})
export const bscTestnetExchangeClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/ducquangkstn/dynamic-amm-ropsten',
  cache: new InMemoryCache()
})
export const bscMainnetExchangeClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri:
    process.env.REACT_APP_MAINNET_ENV === 'staging'
      ? 'https://api.thegraph.com/subgraphs/name/ducquangkstn/dynamic-amm-bsc-staging'
      : 'https://bsc-subgraph.dmm.exchange/subgraphs/name/dynamic-amm/dmm-exchange-bsc',
  cache: new InMemoryCache()
})

export const avaxTestnetExchangeClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/ducquangkstn/dmm-exchange-fuij',
  cache: new InMemoryCache()
})
export const avaxMainnetExchangeClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri:
    process.env.REACT_APP_MAINNET_ENV === 'staging'
      ? ''
      : 'https://avax-subgraph.dmm.exchange/subgraphs/name/dynamic-amm/dmm-exchange-avax',
  cache: new InMemoryCache()
})

export const exchangeCient: { [chainId in ChainId]: ApolloClient<NormalizedCacheObject> } = {
  [ChainId.MAINNET]: mainnetExchangeClient,
  [ChainId.ROPSTEN]: ropstenExchangeClient,
  [ChainId.RINKEBY]: ropstenExchangeClient,
  [ChainId.GÖRLI]: ropstenExchangeClient,
  [ChainId.KOVAN]: ropstenExchangeClient,
  [ChainId.MATIC]: maticExchangeClient,
  [ChainId.MUMBAI]: mumbaiExchangeClient,
  [ChainId.BSCTESTNET]: bscTestnetExchangeClient,
  [ChainId.BSCMAINNET]: bscMainnetExchangeClient,
  [ChainId.AVAXTESTNET]: avaxTestnetExchangeClient,
  [ChainId.AVAXMAINNET]: avaxMainnetExchangeClient
}

export const ropstenBlockClient = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/edwardevans094/ropsten-blocks',
  cache: new InMemoryCache()
})

export const mainnetBlockClient = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/blocklytics/ethereum-blocks',
  cache: new InMemoryCache()
})

export const maticBlockClient = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/ord786/matic-blocks',
  cache: new InMemoryCache()
})

export const mumbaiBlockClient = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/piavgh/mumbai-blocks',
  cache: new InMemoryCache()
})
export const bscTestnetBlockClient = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/ducquangkstn/ethereum-blocks-bsctestnet',
  cache: new InMemoryCache()
})
export const bscMainnetBlockClient = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/ducquangkstn/ethereum-blocks-bsc',
  cache: new InMemoryCache()
})

export const avaxTestnetBlockClient = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/ducquangkstn/ethereum-block-fuji',
  cache: new InMemoryCache()
})

export const avaxMainnetBlockClient = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/ducquangkstn/avalache-blocks',
  cache: new InMemoryCache()
})

export const blockClient: { [chainId in ChainId]: ApolloClient<NormalizedCacheObject> } = {
  [ChainId.MAINNET]: mainnetBlockClient,
  [ChainId.ROPSTEN]: ropstenBlockClient,
  [ChainId.RINKEBY]: ropstenBlockClient,
  [ChainId.GÖRLI]: ropstenBlockClient,
  [ChainId.KOVAN]: ropstenBlockClient,
  [ChainId.MATIC]: maticBlockClient,
  [ChainId.MUMBAI]: mumbaiBlockClient,
  [ChainId.BSCTESTNET]: bscTestnetBlockClient,
  [ChainId.BSCMAINNET]: bscMainnetBlockClient,
  [ChainId.AVAXTESTNET]: avaxTestnetBlockClient,
  [ChainId.AVAXMAINNET]: avaxMainnetBlockClient
}

// TODO-swapv2: change router uri
export const routerUri: { [chainId in ChainId]?: string } = {
  [ChainId.BSCMAINNET]: 'https://router-bsc.firebird.finance',
  [ChainId.MATIC]: 'https://router-polygon.firebird.finance'
}
