export const MAINET_RPC_URL = 'https://mainnet.infura.io/'
export const ROPSTEN_RPC_URL = 'https://ropsten.infura.io/'
export const KOVAN_RPC_URL = 'https://kovan.infura.io/'
export const RINKEBY_RPC_URL = 'https://rinkeby.infura.io/'
export const TRUFFLE_URL = '127.0.0.1:8545/'

export const networks = [
    {
      id: 1,
      name: "Mainnet",
      url: MAINET_RPC_URL
    },
    {
      id: 3,
      name: "Ropsten",
      url: ROPSTEN_RPC_URL
    },
    { 
      id: 42,
      name: "Kovan",
      url: KOVAN_RPC_URL
    },
    {
      id: 5,
      name: "Truffle",
      url: TRUFFLE_URL
    }
];