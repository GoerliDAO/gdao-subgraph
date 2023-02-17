import { Address, BigDecimal, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { createMockedFunction } from "matchstick-as";

import { toBigInt, toDecimal } from "../../shared/src/utils/Decimals";
import {
  CONVEX_ALLOCATORS,
  ERC20_BTRFLY_V1,
  ERC20_BTRFLY_V2,
  ERC20_CRV_FRAX_USDC,
  ERC20_CRV_OHMETH,
  ERC20_CRV_OHMFRAXBP,
  ERC20_DAI,
  ERC20_FRAX,
  ERC20_FRAX_BP,
  ERC20_FXS,
  ERC20_LUSD,
  ERC20_OHM_V1,
  ERC20_OHM_V2,
  ERC20_TRIBE,
  ERC20_USDC,
  ERC20_WETH,
  getWalletAddressesForContract,
  PAIR_CURVE_FRAX_USDC,
  PAIR_CURVE_OHM_ETH,
  PAIR_CURVE_OHM_FRAXBP,
  PAIR_UNISWAP_V2_OHM_BTRFLY_V1,
  PAIR_UNISWAP_V2_OHM_DAI,
  PAIR_UNISWAP_V2_OHM_DAI_V2,
  PAIR_UNISWAP_V2_OHM_ETH,
  PAIR_UNISWAP_V2_OHM_ETH_V2,
  PAIR_UNISWAP_V2_OHM_LUSD,
  PAIR_UNISWAP_V2_OHM_LUSD_V2,
  PAIR_UNISWAP_V2_TRIBE_ETH,
  PAIR_UNISWAP_V2_USDC_ETH,
  PAIR_UNISWAP_V3_FXS_ETH,
  PAIR_UNISWAP_V3_WETH_BTRFLY_V1,
  PAIR_UNISWAP_V3_WETH_BTRFLY_V2,
} from "../src/utils/Constants";
import { mockZeroWalletBalances } from "./walletHelper";

export const ETH_TRIBE_RESERVE_TRIBE = BigInt.fromString("40963255589554358793575");
export const ETH_TRIBE_RESERVE_ETH = BigInt.fromString("4956325030062526848");
export const ETH_TRIBE_RESERVE_BLOCK = BigInt.fromString("1654504965");

export const ETH_USD_RESERVE_USD = BigInt.fromString("51366826766840");
export const ETH_USD_RESERVE_ETH = BigInt.fromString("27063460795012214253805");
export const ETH_USD_RESERVE_BLOCK = BigInt.fromString("1654504965");

export const OHM_USD_RESERVE_USD = BigInt.fromString("18867842715859452534935831");
export const OHM_USD_RESERVE_OHM = BigInt.fromString("994866147276819");
export const OHM_USD_RESERVE_BLOCK = BigInt.fromString("1654504965");
export const OHM_USD_DECIMALS = 18;
export const OHM_USD_TOTAL_SUPPLY = BigInt.fromString("132978245612511289049");

export const FXS_ETH_SLOT0_VALUE0 = BigInt.fromString("4408826845265778408963222405");
export const FXS_ETH_BALANCE_FXS = BigInt.fromString("58490501064965941270938");
export const FXS_ETH_BALANCE_ETH = BigInt.fromString("50384750611936405873");

export const OHM_V2_DECIMALS = 9;
export const USDC_DECIMALS = 6;
export const ERC20_STANDARD_DECIMALS = 18;

const DEFAULT_TOTAL_SUPPLY = "1000";

export const getERC20UsdRate = (
  token0Reserve: BigInt,
  token1Reserve: BigInt,
  token0Rate: BigDecimal,
): BigDecimal => {
  return toDecimal(token0Reserve, 18).times(token0Rate).div(toDecimal(token1Reserve, 18));
};

export const mockERC20TotalSupply = (
  token: string,
  tokenDecimals: i32,
  totalSupply: BigInt,
): void => {
  const tokenAddress = Address.fromString(token);

  // Total supply
  createMockedFunction(tokenAddress, "totalSupply", "totalSupply():(uint256)").returns([
    ethereum.Value.fromUnsignedBigInt(totalSupply),
  ]);

  // Token decimals
  createMockedFunction(tokenAddress, "decimals", "decimals():(uint8)").returns([
    ethereum.Value.fromI32(tokenDecimals),
  ]);
};

/**
 * 1898.01397375
 *
 * @returns
 */
export const getEthUsdRate = (): BigDecimal => {
  return toDecimal(ETH_USD_RESERVE_USD, 6).div(toDecimal(ETH_USD_RESERVE_ETH, 18));
};

export const mockEthUsdRate = (): void => {
  const contractAddress = Address.fromString(PAIR_UNISWAP_V2_USDC_ETH);
  createMockedFunction(
    contractAddress,
    "getReserves",
    "getReserves():(uint112,uint112,uint32)",
  ).returns([
    ethereum.Value.fromUnsignedBigInt(ETH_USD_RESERVE_USD),
    ethereum.Value.fromUnsignedBigInt(ETH_USD_RESERVE_ETH),
    ethereum.Value.fromUnsignedBigInt(ETH_USD_RESERVE_BLOCK),
  ]);

  // Token addresses
  createMockedFunction(contractAddress, "token0", "token0():(address)").returns([
    ethereum.Value.fromAddress(Address.fromString(ERC20_USDC)),
  ]);
  createMockedFunction(contractAddress, "token1", "token1():(address)").returns([
    ethereum.Value.fromAddress(Address.fromString(ERC20_WETH)),
  ]);

  // Token decimals
  createMockedFunction(Address.fromString(ERC20_USDC), "decimals", "decimals():(uint8)").returns([
    ethereum.Value.fromI32(USDC_DECIMALS),
  ]);
  createMockedFunction(Address.fromString(ERC20_WETH), "decimals", "decimals():(uint8)").returns([
    ethereum.Value.fromI32(ERC20_STANDARD_DECIMALS),
  ]);
};

/**
 * # ETH * price ETH / # TRIBE = price TRIBE (in USD)
 *
 * 4.956325030062526848 * 1898.01397375 / 40963.255589554358793575 = 0.22964909
 *
 * @returns
 */
export const getTribeUsdRate = (): BigDecimal => {
  return toDecimal(ETH_TRIBE_RESERVE_ETH, 18)
    .times(getEthUsdRate())
    .div(toDecimal(ETH_TRIBE_RESERVE_TRIBE, 18));
};

export const mockTribeEthRate = (): void => {
  // TODO can be shifted to abstracted mock function?
  mockERC20TotalSupply(ERC20_TRIBE, ERC20_STANDARD_DECIMALS, toBigInt(BigDecimal.fromString(DEFAULT_TOTAL_SUPPLY), ERC20_STANDARD_DECIMALS));
  mockERC20TotalSupply(ERC20_WETH, ERC20_STANDARD_DECIMALS, toBigInt(BigDecimal.fromString(DEFAULT_TOTAL_SUPPLY), ERC20_STANDARD_DECIMALS));

  const contractAddress = Address.fromString(PAIR_UNISWAP_V2_TRIBE_ETH);
  createMockedFunction(
    contractAddress,
    "getReserves",
    "getReserves():(uint112,uint112,uint32)",
  ).returns([
    ethereum.Value.fromUnsignedBigInt(ETH_TRIBE_RESERVE_ETH),
    ethereum.Value.fromUnsignedBigInt(ETH_TRIBE_RESERVE_TRIBE),
    ethereum.Value.fromUnsignedBigInt(ETH_TRIBE_RESERVE_BLOCK),
  ]);

  // Token addresses
  createMockedFunction(contractAddress, "token0", "token0():(address)").returns([
    ethereum.Value.fromAddress(Address.fromString(ERC20_WETH)),
  ]);
  createMockedFunction(contractAddress, "token1", "token1():(address)").returns([
    ethereum.Value.fromAddress(Address.fromString(ERC20_TRIBE)),
  ]);

  // Token decimals
  createMockedFunction(Address.fromString(ERC20_TRIBE), "decimals", "decimals():(uint8)").returns([
    ethereum.Value.fromI32(ERC20_STANDARD_DECIMALS),
  ]);
  createMockedFunction(Address.fromString(ERC20_WETH), "decimals", "decimals():(uint8)").returns([
    ethereum.Value.fromI32(ERC20_STANDARD_DECIMALS),
  ]);
};

export const getUsdRateUniswapV3 = (slot0Value: BigInt, usdRate: BigDecimal): BigDecimal => {
  return slot0Value
    .times(slot0Value)
    .toBigDecimal()
    .times(usdRate)
    .div(BigInt.fromString("2").pow(192).toBigDecimal());
};

/**
 * FXS in ETH * price ETH / 2^192 = price FXS (in USD)
 *
 * @returns
 */
export const getFxsUsdRate = (): BigDecimal => {
  return getUsdRateUniswapV3(FXS_ETH_SLOT0_VALUE0, getEthUsdRate());
};

export const mockRateUniswapV3 = (
  pairAddress: string,
  slot0Value: BigInt,
  token0Address: string,
  token1Address: string,
  token0Decimals: i32,
  token1Decimals: i32,
  token0Balance: BigInt,
  token1Balance: BigInt,
): void => {
  mockERC20TotalSupply(token0Address, token0Decimals, toBigInt(BigDecimal.fromString(DEFAULT_TOTAL_SUPPLY), token0Decimals));
  mockERC20TotalSupply(token1Address, token1Decimals, toBigInt(BigDecimal.fromString(DEFAULT_TOTAL_SUPPLY), token1Decimals));

  const contractAddress = Address.fromString(pairAddress);
  // slot0
  createMockedFunction(
    contractAddress,
    "slot0",
    "slot0():(uint160,int24,uint16,uint16,uint16,uint8,bool)",
  ).returns([
    ethereum.Value.fromUnsignedBigInt(slot0Value),
    ethereum.Value.fromI32(-57778),
    ethereum.Value.fromI32(1),
    ethereum.Value.fromI32(2),
    ethereum.Value.fromI32(2),
    ethereum.Value.fromI32(0),
    ethereum.Value.fromBoolean(true),
  ]);

  // Tokens
  createMockedFunction(contractAddress, "token0", "token0():(address)").returns([
    ethereum.Value.fromAddress(Address.fromString(token0Address)),
  ]);
  createMockedFunction(contractAddress, "token1", "token1():(address)").returns([
    ethereum.Value.fromAddress(Address.fromString(token1Address)),
  ]);

  // Token decimals
  createMockedFunction(Address.fromString(token0Address), "decimals", "decimals():(uint8)").returns(
    [ethereum.Value.fromI32(token0Decimals)],
  );
  createMockedFunction(Address.fromString(token1Address), "decimals", "decimals():(uint8)").returns(
    [ethereum.Value.fromI32(token1Decimals)],
  );

  // Balance
  createMockedFunction(
    Address.fromString(token0Address),
    "balanceOf",
    "balanceOf(address):(uint256)",
  )
    .withArgs([ethereum.Value.fromAddress(contractAddress)])
    .returns([ethereum.Value.fromUnsignedBigInt(token0Balance)]);
  createMockedFunction(
    Address.fromString(token1Address),
    "balanceOf",
    "balanceOf(address):(uint256)",
  )
    .withArgs([ethereum.Value.fromAddress(contractAddress)])
    .returns([ethereum.Value.fromUnsignedBigInt(token1Balance)]);
};

export const mockFxsEthRate = (): void => {
  mockRateUniswapV3(
    PAIR_UNISWAP_V3_FXS_ETH,
    FXS_ETH_SLOT0_VALUE0,
    ERC20_FXS,
    ERC20_WETH,
    ERC20_STANDARD_DECIMALS,
    ERC20_STANDARD_DECIMALS,
    FXS_ETH_BALANCE_FXS,
    FXS_ETH_BALANCE_ETH,
  );
};

export const OHM_BTRFLY_V1_SLOT0 = "18438610691616111025325107";

export const mockWEthBtrflyV1Rate = (): void => {
  // price = 35.0430729991629573703709430194278
  mockRateUniswapV3(
    PAIR_UNISWAP_V3_WETH_BTRFLY_V1,
    BigInt.fromString(OHM_BTRFLY_V1_SLOT0),
    ERC20_WETH,
    ERC20_BTRFLY_V1,
    ERC20_STANDARD_DECIMALS,
    9, // BTRFLY V1 is 9
    BigInt.zero(),
    BigInt.zero(),
  );
};

export const getBtrflyV1UsdRate = (): BigDecimal => {
  return BigDecimal.fromString("35.0430729991629573703709430194278");
};

export const OHM_BTRFLY_V2_SLOT0 = "201047635549140265156647342605";

export const mockWEthBtrflyV2Rate = (): void => {
  // price = 294.7546283139931202627807530029295
  mockRateUniswapV3(
    PAIR_UNISWAP_V3_WETH_BTRFLY_V2,
    BigInt.fromString(OHM_BTRFLY_V2_SLOT0),
    ERC20_WETH,
    ERC20_BTRFLY_V2,
    ERC20_STANDARD_DECIMALS,
    ERC20_STANDARD_DECIMALS,
    BigInt.zero(),
    BigInt.zero(),
  );
};

export const getBtrflyV2UsdRate = (): BigDecimal => {
  return BigDecimal.fromString("294.7546283139931202627807530029295");
};

/**
 * 18.9652073
 *
 * @returns
 */
export const getOhmUsdRate = (): BigDecimal => {
  return toDecimal(OHM_USD_RESERVE_USD, 18).div(toDecimal(OHM_USD_RESERVE_OHM, 9));
};

export const mockUsdOhmV2Rate = (
  ohmReserves: BigInt = OHM_USD_RESERVE_OHM,
  usdReserves: BigInt = OHM_USD_RESERVE_USD,
): void => {
  const contractAddress = Address.fromString(PAIR_UNISWAP_V2_OHM_DAI_V2);
  createMockedFunction(
    contractAddress,
    "getReserves",
    "getReserves():(uint112,uint112,uint32)",
  ).returns([
    ethereum.Value.fromUnsignedBigInt(ohmReserves),
    ethereum.Value.fromUnsignedBigInt(usdReserves),
    ethereum.Value.fromUnsignedBigInt(OHM_USD_RESERVE_BLOCK),
  ]);
  // Decimals
  createMockedFunction(contractAddress, "decimals", "decimals():(uint8)").returns([
    ethereum.Value.fromI32(OHM_USD_DECIMALS),
  ]);
  // Total supply
  createMockedFunction(contractAddress, "totalSupply", "totalSupply():(uint256)").returns([
    ethereum.Value.fromUnsignedBigInt(OHM_USD_TOTAL_SUPPLY),
  ]);

  // Token addresses
  createMockedFunction(contractAddress, "token0", "token0():(address)").returns([
    ethereum.Value.fromAddress(Address.fromString(ERC20_OHM_V2)),
  ]);
  createMockedFunction(contractAddress, "token1", "token1():(address)").returns([
    ethereum.Value.fromAddress(Address.fromString(ERC20_DAI)),
  ]);

  // Token decimals
  createMockedFunction(Address.fromString(ERC20_OHM_V2), "decimals", "decimals():(uint8)").returns([
    ethereum.Value.fromI32(OHM_V2_DECIMALS),
  ]);
  createMockedFunction(Address.fromString(ERC20_WETH), "decimals", "decimals():(uint8)").returns([
    ethereum.Value.fromI32(ERC20_STANDARD_DECIMALS),
  ]);
};

export const mockUniswapV2Pair = (
  token0Address: string,
  token1Address: string,
  token0Decimals: i32,
  token1Decimals: i32,
  token0Reserves: BigInt,
  token1Reserves: BigInt,
  totalSupply: BigInt,
  pairAddress: string,
  pairDecimals: i32,
  block: BigInt = OHM_USD_RESERVE_BLOCK,
): void => {
  mockERC20TotalSupply(token0Address, token0Decimals, toBigInt(BigDecimal.fromString(DEFAULT_TOTAL_SUPPLY), token0Decimals));
  mockERC20TotalSupply(token1Address, token1Decimals, toBigInt(BigDecimal.fromString(DEFAULT_TOTAL_SUPPLY), token1Decimals));

  const pair = Address.fromString(pairAddress);
  createMockedFunction(pair, "getReserves", "getReserves():(uint112,uint112,uint32)").returns([
    ethereum.Value.fromUnsignedBigInt(token0Reserves),
    ethereum.Value.fromUnsignedBigInt(token1Reserves),
    ethereum.Value.fromUnsignedBigInt(block),
  ]);
  // Decimals
  createMockedFunction(pair, "decimals", "decimals():(uint8)").returns([
    ethereum.Value.fromI32(pairDecimals),
  ]);
  // Total supply
  createMockedFunction(pair, "totalSupply", "totalSupply():(uint256)").returns([
    ethereum.Value.fromUnsignedBigInt(totalSupply),
  ]);

  // Token addresses
  createMockedFunction(pair, "token0", "token0():(address)").returns([
    ethereum.Value.fromAddress(Address.fromString(token0Address)),
  ]);
  createMockedFunction(pair, "token1", "token1():(address)").returns([
    ethereum.Value.fromAddress(Address.fromString(token1Address)),
  ]);

  // Token decimals
  createMockedFunction(Address.fromString(token0Address), "decimals", "decimals():(uint8)").returns(
    [ethereum.Value.fromI32(token0Decimals)],
  );
  createMockedFunction(Address.fromString(token1Address), "decimals", "decimals():(uint8)").returns(
    [ethereum.Value.fromI32(token1Decimals)],
  );
};

export const mockUniswapV2PairsZero = (): void => {
  // For all entries in LIQUIDITY_OWNED
  mockUniswapV2Pair(
    ERC20_OHM_V2,
    ERC20_DAI,
    OHM_V2_DECIMALS,
    ERC20_STANDARD_DECIMALS,
    BigInt.fromString("1"),
    BigInt.fromString("1"),
    BigInt.fromString("1"),
    PAIR_UNISWAP_V2_OHM_DAI_V2,
    ERC20_STANDARD_DECIMALS,
  );
  mockZeroWalletBalances(
    PAIR_UNISWAP_V2_OHM_DAI_V2,
    getWalletAddressesForContract(PAIR_UNISWAP_V2_OHM_DAI_V2),
  );

  mockUniswapV2Pair(
    ERC20_OHM_V1,
    ERC20_DAI,
    OHM_V2_DECIMALS,
    ERC20_STANDARD_DECIMALS,
    BigInt.fromString("1"),
    BigInt.fromString("1"),
    BigInt.fromString("1"),
    PAIR_UNISWAP_V2_OHM_DAI,
    ERC20_STANDARD_DECIMALS,
  );
  mockZeroWalletBalances(
    PAIR_UNISWAP_V2_OHM_DAI,
    getWalletAddressesForContract(PAIR_UNISWAP_V2_OHM_DAI),
  );

  mockUniswapV2Pair(
    ERC20_OHM_V2,
    ERC20_WETH,
    OHM_V2_DECIMALS,
    ERC20_STANDARD_DECIMALS,
    BigInt.fromString("1"),
    BigInt.fromString("1"),
    BigInt.fromString("1"),
    PAIR_UNISWAP_V2_OHM_ETH_V2,
    ERC20_STANDARD_DECIMALS,
  );
  mockZeroWalletBalances(
    PAIR_UNISWAP_V2_OHM_ETH_V2,
    getWalletAddressesForContract(PAIR_UNISWAP_V2_OHM_ETH_V2),
  );

  mockUniswapV2Pair(
    ERC20_OHM_V1,
    ERC20_WETH,
    OHM_V2_DECIMALS,
    ERC20_STANDARD_DECIMALS,
    BigInt.fromString("1"),
    BigInt.fromString("1"),
    BigInt.fromString("1"),
    PAIR_UNISWAP_V2_OHM_ETH,
    ERC20_STANDARD_DECIMALS,
  );
  mockZeroWalletBalances(
    PAIR_UNISWAP_V2_OHM_ETH,
    getWalletAddressesForContract(PAIR_UNISWAP_V2_OHM_ETH),
  );

  mockUniswapV2Pair(
    ERC20_OHM_V2,
    ERC20_LUSD,
    OHM_V2_DECIMALS,
    ERC20_STANDARD_DECIMALS,
    BigInt.fromString("1"),
    BigInt.fromString("1"),
    BigInt.fromString("1"),
    PAIR_UNISWAP_V2_OHM_LUSD_V2,
    ERC20_STANDARD_DECIMALS,
  );
  mockZeroWalletBalances(
    PAIR_UNISWAP_V2_OHM_LUSD_V2,
    getWalletAddressesForContract(PAIR_UNISWAP_V2_OHM_LUSD_V2),
  );

  mockUniswapV2Pair(
    ERC20_OHM_V1,
    ERC20_LUSD,
    OHM_V2_DECIMALS,
    ERC20_STANDARD_DECIMALS,
    BigInt.fromString("1"),
    BigInt.fromString("1"),
    BigInt.fromString("1"),
    PAIR_UNISWAP_V2_OHM_LUSD,
    ERC20_STANDARD_DECIMALS,
  );
  mockZeroWalletBalances(
    PAIR_UNISWAP_V2_OHM_LUSD,
    getWalletAddressesForContract(PAIR_UNISWAP_V2_OHM_LUSD),
  );

  mockUniswapV2Pair(
    ERC20_OHM_V2,
    ERC20_BTRFLY_V1,
    OHM_V2_DECIMALS,
    ERC20_STANDARD_DECIMALS,
    BigInt.fromString("1"),
    BigInt.fromString("1"),
    BigInt.fromString("1"),
    PAIR_UNISWAP_V2_OHM_BTRFLY_V1,
    ERC20_STANDARD_DECIMALS,
  );
  mockZeroWalletBalances(
    PAIR_UNISWAP_V2_OHM_BTRFLY_V1,
    getWalletAddressesForContract(PAIR_UNISWAP_V2_OHM_BTRFLY_V1),
  );
};

export const OHM_ETH_RESERVES_OHM = BigInt.fromString("375628431674251");
export const OHM_ETH_RESERVES_ETH = BigInt.fromString("3697970940599119381327");
export const OHM_ETH_TOTAL_SUPPLY = BigInt.fromString("1088609680068180654");
export const OHM_ETH_DECIMALS = 18;

export const mockOhmEthPair = (): void => {
  // Pair
  const pairAddress = Address.fromString(PAIR_UNISWAP_V2_OHM_ETH_V2);
  createMockedFunction(pairAddress, "token0", "token0():(address)").returns([
    ethereum.Value.fromAddress(Address.fromString(ERC20_OHM_V2)),
  ]);
  createMockedFunction(pairAddress, "token1", "token1():(address)").returns([
    ethereum.Value.fromAddress(Address.fromString(ERC20_WETH)),
  ]);
  // Token Decimals
  createMockedFunction(Address.fromString(ERC20_OHM_V2), "decimals", "decimals():(uint8)").returns([
    ethereum.Value.fromI32(OHM_V2_DECIMALS),
  ]);
  createMockedFunction(Address.fromString(ERC20_WETH), "decimals", "decimals():(uint8)").returns([
    ethereum.Value.fromI32(ERC20_STANDARD_DECIMALS),
  ]);
  // Reserves
  createMockedFunction(
    pairAddress,
    "getReserves",
    "getReserves():(uint112,uint112,uint32)",
  ).returns([
    ethereum.Value.fromUnsignedBigInt(OHM_ETH_RESERVES_OHM),
    ethereum.Value.fromUnsignedBigInt(OHM_ETH_RESERVES_ETH),
    ethereum.Value.fromUnsignedBigInt(ETH_USD_RESERVE_BLOCK),
  ]);
  // Decimals
  createMockedFunction(pairAddress, "decimals", "decimals():(uint8)").returns([
    ethereum.Value.fromI32(OHM_ETH_DECIMALS),
  ]);
  // Total supply
  createMockedFunction(pairAddress, "totalSupply", "totalSupply():(uint256)").returns([
    ethereum.Value.fromUnsignedBigInt(OHM_ETH_TOTAL_SUPPLY),
  ]);
};

export const getPairValue = (
  token0Reserves: BigDecimal,
  token1Reserves: BigDecimal,
  token0Rate: BigDecimal,
  token1Rate: BigDecimal,
): BigDecimal => {
  return token0Reserves.times(token0Rate).plus(token1Reserves.times(token1Rate));
};

// (token0 * price0 + token1 * price1) * (balance / total supply)
export const getOhmEthPairValue = (): BigDecimal => {
  return toDecimal(OHM_ETH_RESERVES_OHM, OHM_V2_DECIMALS)
    .times(getOhmUsdRate())
    .plus(toDecimal(OHM_ETH_RESERVES_ETH, ERC20_STANDARD_DECIMALS).times(getEthUsdRate()));
};

export const mockCurvePairTotalValue = (
  pairAddress: string,
  pairToken: string,
  pairTokenDecimals: i32,
  pairTokenTotalSupply: BigDecimal,
  token0: string,
  token1: string,
  token0Balance: BigInt,
  token1Balance: BigInt,
  token0Decimals: i32,
  token1Decimals: i32,
): void => {
  mockERC20TotalSupply(token0, token0Decimals, toBigInt(BigDecimal.fromString(DEFAULT_TOTAL_SUPPLY), token0Decimals));
  mockERC20TotalSupply(token1, token1Decimals, toBigInt(BigDecimal.fromString(DEFAULT_TOTAL_SUPPLY), token1Decimals));

  const pair = Address.fromString(pairAddress);
  // Token lookup
  createMockedFunction(pair, "coins", "coins(uint256):(address)")
    .withArgs([ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(0))])
    .returns([ethereum.Value.fromAddress(Address.fromString(token0))]);
  createMockedFunction(pair, "coins", "coins(uint256):(address)")
    .withArgs([ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(1))])
    .returns([ethereum.Value.fromAddress(Address.fromString(token1))]);
  // Token balance
  createMockedFunction(pair, "balances", "balances(uint256):(uint256)")
    .withArgs([ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(0))])
    .returns([ethereum.Value.fromUnsignedBigInt(token0Balance)]);
  createMockedFunction(pair, "balances", "balances(uint256):(uint256)")
    .withArgs([ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(1))])
    .returns([ethereum.Value.fromUnsignedBigInt(token1Balance)]);
  // Token decimals
  createMockedFunction(Address.fromString(token0), "decimals", "decimals():(uint8)").returns([
    ethereum.Value.fromI32(token0Decimals),
  ]);
  createMockedFunction(Address.fromString(token1), "decimals", "decimals():(uint8)").returns([
    ethereum.Value.fromI32(token1Decimals),
  ]);
  // Pair token
  createMockedFunction(pair, "token", "token():(address)").returns([
    ethereum.Value.fromAddress(Address.fromString(pairToken)),
  ]);
  // Pair token (for some contracts)
  createMockedFunction(pair, "lp_token", "lp_token():(address)").reverts();
  createMockedFunction(Address.fromString(pairToken), "decimals", "decimals():(uint8)").returns([
    ethereum.Value.fromI32(pairTokenDecimals),
  ]);
  createMockedFunction(
    Address.fromString(pairToken),
    "totalSupply",
    "totalSupply():(uint256)",
  ).returns([ethereum.Value.fromUnsignedBigInt(toBigInt(pairTokenTotalSupply, pairTokenDecimals))]);
};

export const mockCurvePairZero = (): void => {
  mockCurvePairTotalValue(
    PAIR_CURVE_OHM_ETH,
    ERC20_CRV_OHMETH,
    ERC20_STANDARD_DECIMALS,
    BigDecimal.fromString("0"),
    ERC20_OHM_V2,
    ERC20_WETH,
    BigInt.fromString("0"),
    BigInt.fromString("0"),
    OHM_V2_DECIMALS,
    ERC20_STANDARD_DECIMALS,
  );

  mockCurvePairTotalValue(
    PAIR_CURVE_OHM_FRAXBP,
    ERC20_CRV_OHMFRAXBP,
    ERC20_STANDARD_DECIMALS,
    BigDecimal.fromString("0"),
    ERC20_OHM_V2,
    ERC20_FRAX_BP,
    BigInt.fromString("0"),
    BigInt.fromString("0"),
    OHM_V2_DECIMALS,
    ERC20_STANDARD_DECIMALS,
  );

  mockCurvePairTotalValue(
    PAIR_CURVE_FRAX_USDC,
    ERC20_CRV_FRAX_USDC,
    ERC20_STANDARD_DECIMALS,
    BigDecimal.fromString("0"),
    ERC20_FRAX,
    ERC20_USDC,
    BigInt.fromString("0"),
    BigInt.fromString("0"),
    ERC20_STANDARD_DECIMALS,
    USDC_DECIMALS,
  );

  mockZeroWalletBalances(ERC20_CRV_OHMETH, getWalletAddressesForContract(PAIR_CURVE_OHM_ETH));
  mockZeroWalletBalances(ERC20_CRV_OHMETH, CONVEX_ALLOCATORS);
  mockZeroWalletBalances(ERC20_CRV_OHMFRAXBP, getWalletAddressesForContract(PAIR_CURVE_OHM_FRAXBP));
  mockZeroWalletBalances(ERC20_CRV_FRAX_USDC, getWalletAddressesForContract(PAIR_CURVE_FRAX_USDC));
};
