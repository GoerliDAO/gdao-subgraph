import { TokenCategoryStable, TokenCategoryVolatile, TokenDefinition } from "../../../shared/src/contracts/TokenDefinition";
import { AAVE_ALLOCATOR, AAVE_ALLOCATOR_V2, BALANCER_ALLOCATOR, BONDS_DEPOSIT, BONDS_INVERSE_DEPOSIT, CONVEX_ALLOCATOR1, CONVEX_ALLOCATOR2, CONVEX_ALLOCATOR3, CONVEX_CVX_ALLOCATOR, CONVEX_CVX_VL_ALLOCATOR, CROSS_CHAIN_ARBITRUM, CROSS_CHAIN_FANTOM, CROSS_CHAIN_POLYGON, DAO_WALLET, LUSD_ALLOCATOR, RARI_ALLOCATOR, TREASURY_ADDRESS_V1, TREASURY_ADDRESS_V2, TREASURY_ADDRESS_V3, VEFXS_ALLOCATOR } from "../../../shared/src/Wallets";

export const ERC20_DAI = "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063".toLowerCase();
export const ERC20_FRAX = "0x45c32fA6DF82ead1e2EF74d17b76547EDdFaFF89".toLowerCase();
export const ERC20_GOHM = "0xd8cA34fd379d9ca3C6Ee3b3905678320F5b45195".toLowerCase(); // Not added to ERC20_TOKENS_ARBITRUM
export const ERC20_KLIMA = "0x4e78011ce80ee02d2c3e649fb657e45898257815".toLowerCase();
export const ERC20_KLIMA_STAKED = "0xb0C22d8D350C67420f06F48936654f567C73E8C8".toLowerCase();
export const ERC20_SYN = "0x50B728D8D964fd00C2d0AAD81718b71311feF68a".toLowerCase();
export const ERC20_USDC = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174".toLowerCase();
export const ERC20_WETH = "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619".toLowerCase();

export const LP_UNISWAP_V2_KLIMA_USDC = "0x5786b267d35f9d011c4750e0b0ba584e1fdbead1".toLowerCase();
export const LP_UNISWAP_V2_MATIC_USDC = "0xb965c131f1c48d89b1760860b782d2acdf87273b".toLowerCase();
export const LP_UNISWAP_V2_SYN_WETH = "0x4a86c01d67965f8cb3d0aaa2c655705e64097c31".toLowerCase();
export const LP_UNISWAP_V2_USDC_WETH = "0x853ee4b2a13f8a742d64c8f088be7ba2131f670d".toLowerCase();
export const LP_UNISWAP_V2_WETH_GOHM = "0x1549e0e8127d380080aab448b82d280433ce4030".toLowerCase();

export const BALANCER_VAULT = "0xBA12222222228d8Ba445958a75a0704d566BF2C8".toLowerCase();

export const ERC20_TOKENS_POLYGON = new Map<string, TokenDefinition>();
ERC20_TOKENS_POLYGON.set(ERC20_DAI, new TokenDefinition(ERC20_DAI, TokenCategoryStable, true, false));
ERC20_TOKENS_POLYGON.set(ERC20_FRAX, new TokenDefinition(ERC20_FRAX, TokenCategoryStable, true, false));
ERC20_TOKENS_POLYGON.set(ERC20_KLIMA_STAKED, new TokenDefinition(ERC20_KLIMA_STAKED, TokenCategoryVolatile, true, false));
ERC20_TOKENS_POLYGON.set(ERC20_KLIMA, new TokenDefinition(ERC20_KLIMA, TokenCategoryVolatile, true, false));
ERC20_TOKENS_POLYGON.set(ERC20_SYN, new TokenDefinition(ERC20_SYN, TokenCategoryVolatile, true, false));
ERC20_TOKENS_POLYGON.set(ERC20_USDC, new TokenDefinition(ERC20_USDC, TokenCategoryStable, true, false));
ERC20_TOKENS_POLYGON.set(ERC20_WETH, new TokenDefinition(ERC20_WETH, TokenCategoryVolatile, true, true));

export const OHM_TOKENS = [ERC20_GOHM];

export const CONTRACT_NAME_MAP = new Map<string, string>();
CONTRACT_NAME_MAP.set(AAVE_ALLOCATOR_V2, "Aave Allocator V2");
CONTRACT_NAME_MAP.set(AAVE_ALLOCATOR, "Aave Allocator V1");
CONTRACT_NAME_MAP.set(BALANCER_ALLOCATOR, "Balancer Allocator");
CONTRACT_NAME_MAP.set(BALANCER_VAULT, "Balancer Vault");
CONTRACT_NAME_MAP.set(BONDS_DEPOSIT, "Bond Depository");
CONTRACT_NAME_MAP.set(BONDS_INVERSE_DEPOSIT, "Bond (Inverse) Depository");
CONTRACT_NAME_MAP.set(CONVEX_ALLOCATOR1, "Convex Allocator 1");
CONTRACT_NAME_MAP.set(CONVEX_ALLOCATOR2, "Convex Allocator 2");
CONTRACT_NAME_MAP.set(CONVEX_ALLOCATOR3, "Convex Allocator 3");
CONTRACT_NAME_MAP.set(CONVEX_CVX_ALLOCATOR, "Convex Allocator");
CONTRACT_NAME_MAP.set(CONVEX_CVX_VL_ALLOCATOR, "Convex vlCVX Allocator");
CONTRACT_NAME_MAP.set(CROSS_CHAIN_ARBITRUM, "Cross-Chain Arbitrum");
CONTRACT_NAME_MAP.set(CROSS_CHAIN_FANTOM, "Cross-Chain Fantom");
CONTRACT_NAME_MAP.set(CROSS_CHAIN_POLYGON, "Cross-Chain Polygon");
CONTRACT_NAME_MAP.set(DAO_WALLET, "DAO Wallet");
CONTRACT_NAME_MAP.set(ERC20_DAI, "DAI");
CONTRACT_NAME_MAP.set(ERC20_FRAX, "FRAX");
CONTRACT_NAME_MAP.set(ERC20_GOHM, "Governance OHM");
CONTRACT_NAME_MAP.set(ERC20_KLIMA_STAKED, "KlimaDAO - Staked");
CONTRACT_NAME_MAP.set(ERC20_KLIMA, "KlimaDAO");
CONTRACT_NAME_MAP.set(ERC20_SYN, "Synthetix");
CONTRACT_NAME_MAP.set(ERC20_USDC, "USDC");
CONTRACT_NAME_MAP.set(ERC20_WETH, "Wrapped ETH");
CONTRACT_NAME_MAP.set(LP_UNISWAP_V2_KLIMA_USDC, "UniswapV2 KLIMA-USDC Liquidity Pool");
CONTRACT_NAME_MAP.set(LP_UNISWAP_V2_MATIC_USDC, "UniswapV2 MATIC-USDC Liquidity Pool");
CONTRACT_NAME_MAP.set(LP_UNISWAP_V2_SYN_WETH, "UniswapV2 SYN-wETH Liquidity Pool");
CONTRACT_NAME_MAP.set(LP_UNISWAP_V2_USDC_WETH, "UniswapV2 USDC-wETH Liquidity Pool");
CONTRACT_NAME_MAP.set(LP_UNISWAP_V2_WETH_GOHM, "UniswapV2 wETH-gOHM Liquidity Pool");
CONTRACT_NAME_MAP.set(LUSD_ALLOCATOR, "LUSD Allocator");
CONTRACT_NAME_MAP.set(RARI_ALLOCATOR, "Rari Allocator");
CONTRACT_NAME_MAP.set(TREASURY_ADDRESS_V1, "Treasury Wallet V1");
CONTRACT_NAME_MAP.set(TREASURY_ADDRESS_V2, "Treasury Wallet V2");
CONTRACT_NAME_MAP.set(TREASURY_ADDRESS_V3, "Treasury Wallet V3");
CONTRACT_NAME_MAP.set(VEFXS_ALLOCATOR, "VeFXS Allocator");

export const CONTRACT_ABBREVIATION_MAP = new Map<string, string>();
CONTRACT_ABBREVIATION_MAP.set(ERC20_GOHM, "gOHM");
CONTRACT_ABBREVIATION_MAP.set(ERC20_KLIMA_STAKED, "sKLIMA");
CONTRACT_ABBREVIATION_MAP.set(ERC20_KLIMA, "KLIMA");
CONTRACT_ABBREVIATION_MAP.set(ERC20_SYN, "SYN");
CONTRACT_ABBREVIATION_MAP.set(ERC20_WETH, "wETH");
