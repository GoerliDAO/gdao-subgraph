import { Address, BigDecimal, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { assert, createMockedFunction, describe, test } from "matchstick-as/assembly/index";

import { toBigInt, toDecimal } from "../../shared/src/utils/Decimals";
import { TREASURY_ADDRESS_V3 } from "../../shared/src/Wallets";
import { getLiquidityBalances } from "../src/liquidity/LiquidityCalculations";
import {
  getFraxSwapPairRecords,
  getFraxSwapPairTokenQuantity,
  getFraxSwapPairTokenQuantityRecords,
  getFraxSwapPairTotalValue,
} from "../src/liquidity/LiquidityFraxSwap";
import {
  ERC20_FRAX,
  ERC20_OHM_V1,
  ERC20_OHM_V2,
  ERC20_USDC,
  getWalletAddressesForContract,
  PAIR_FRAXSWAP_V1_OHM_FRAX,
  PAIR_FRAXSWAP_V2_OHM_FRAX,
} from "../src/utils/Constants";
import { mockBalancerVaultZero } from "./liquidityBalancer.test";
import {
  ERC20_STANDARD_DECIMALS,
  getOhmUsdRate,
  mockCurvePairZero,
  mockUniswapV2PairsZero,
  mockUsdOhmV2Rate,
  mockWEthBtrflyV1Rate,
  OHM_USD_RESERVE_BLOCK,
  OHM_V2_DECIMALS,
} from "./pairHelper";
import { mockWalletBalance, mockZeroWalletBalances } from "./walletHelper";

export const FRAXSWAP_OHM_FRAX_DECIMALS = 18;
export const FRAXSWAP_OHM_FRAX_TOTAL_SUPPLY = toDecimal(
  BigInt.fromString("1303397099889362190"),
  FRAXSWAP_OHM_FRAX_DECIMALS,
);
export const FRAXSWAP_OHM_FRAX_TOKEN0 = ERC20_OHM_V2;
export const FRAXSWAP_OHM_FRAX_TOKEN0_DECIMALS = OHM_V2_DECIMALS;
export const FRAXSWAP_OHM_FRAX_TOKEN1 = ERC20_FRAX;
export const FRAXSWAP_OHM_FRAX_TOKEN1_DECIMALS = ERC20_STANDARD_DECIMALS;
export const FRAXSWAP_OHM_FRAX_TOKEN0_RESERVES = toDecimal(
  BigInt.fromString("10495919068290"),
  FRAXSWAP_OHM_FRAX_TOKEN0_DECIMALS,
);
export const FRAXSWAP_OHM_FRAX_TOKEN1_RESERVES = toDecimal(
  BigInt.fromString("161899942493712174360986"),
  FRAXSWAP_OHM_FRAX_TOKEN1_DECIMALS,
);
const FRAXSWAP_OHM_FRAX_TOTAL_VALUE = FRAXSWAP_OHM_FRAX_TOKEN0_RESERVES.times(getOhmUsdRate()).plus(
  FRAXSWAP_OHM_FRAX_TOKEN1_RESERVES.times(BigDecimal.fromString("1")),
);
const FRAXSWAP_OHM_FRAX_UNIT_RATE = FRAXSWAP_OHM_FRAX_TOTAL_VALUE.div(
  FRAXSWAP_OHM_FRAX_TOTAL_SUPPLY,
);

const TIMESTAMP = BigInt.fromString("1");

export function mockFraxSwapPair(
  pairAddress: string,
  pairTotalSupply: BigDecimal,
  pairDecimals: i32,
  token0Address: string,
  token1Address: string,
  token0Decimals: i32,
  token1Decimals: i32,
  token0Reserves: BigDecimal,
  token1Reserves: BigDecimal,
): void {
  // mock OHM price
  mockUsdOhmV2Rate();

  // totalSupply
  createMockedFunction(
    Address.fromString(pairAddress),
    "totalSupply",
    "totalSupply():(uint256)",
  ).returns([ethereum.Value.fromUnsignedBigInt(toBigInt(pairTotalSupply, pairDecimals))]);

  // decimals
  createMockedFunction(Address.fromString(pairAddress), "decimals", "decimals():(uint8)").returns([
    ethereum.Value.fromI32(pairDecimals),
  ]);

  // token0
  createMockedFunction(Address.fromString(pairAddress), "token0", "token0():(address)").returns([
    ethereum.Value.fromAddress(Address.fromString(token0Address)),
  ]);

  // token1
  createMockedFunction(Address.fromString(pairAddress), "token1", "token1():(address)").returns([
    ethereum.Value.fromAddress(Address.fromString(token1Address)),
  ]);

  // token0 decimals
  createMockedFunction(Address.fromString(token0Address), "decimals", "decimals():(uint8)").returns(
    [ethereum.Value.fromI32(token0Decimals)],
  );

  // token1 decimals
  createMockedFunction(Address.fromString(token1Address), "decimals", "decimals():(uint8)").returns(
    [ethereum.Value.fromI32(token1Decimals)],
  );

  // getReserves
  createMockedFunction(
    Address.fromString(pairAddress),
    "getReserves",
    "getReserves():(uint112,uint112,uint32)",
  ).returns([
    ethereum.Value.fromUnsignedBigInt(toBigInt(token0Reserves, token0Decimals)),
    ethereum.Value.fromUnsignedBigInt(toBigInt(token1Reserves, token1Decimals)),
    ethereum.Value.fromI32(0),
  ]);
}

export function mockFraxSwapPairZero(): void {
  mockFraxSwapPair(
    PAIR_FRAXSWAP_V1_OHM_FRAX,
    BigDecimal.fromString("0"),
    FRAXSWAP_OHM_FRAX_DECIMALS,
    FRAXSWAP_OHM_FRAX_TOKEN0,
    FRAXSWAP_OHM_FRAX_TOKEN1,
    FRAXSWAP_OHM_FRAX_TOKEN0_DECIMALS,
    FRAXSWAP_OHM_FRAX_TOKEN1_DECIMALS,
    BigDecimal.fromString("0"),
    BigDecimal.fromString("0"),
  );

  mockFraxSwapPair(
    PAIR_FRAXSWAP_V2_OHM_FRAX,
    BigDecimal.fromString("0"),
    FRAXSWAP_OHM_FRAX_DECIMALS,
    FRAXSWAP_OHM_FRAX_TOKEN0,
    FRAXSWAP_OHM_FRAX_TOKEN1,
    FRAXSWAP_OHM_FRAX_TOKEN0_DECIMALS,
    FRAXSWAP_OHM_FRAX_TOKEN1_DECIMALS,
    BigDecimal.fromString("0"),
    BigDecimal.fromString("0"),
  );
}

export function mockFraxSwapPairOhmFrax(
  totalSupply: BigDecimal = FRAXSWAP_OHM_FRAX_TOTAL_SUPPLY,
): void {
  mockFraxSwapPair(
    PAIR_FRAXSWAP_V1_OHM_FRAX,
    totalSupply,
    FRAXSWAP_OHM_FRAX_DECIMALS,
    FRAXSWAP_OHM_FRAX_TOKEN0,
    FRAXSWAP_OHM_FRAX_TOKEN1,
    FRAXSWAP_OHM_FRAX_TOKEN0_DECIMALS,
    FRAXSWAP_OHM_FRAX_TOKEN1_DECIMALS,
    FRAXSWAP_OHM_FRAX_TOKEN0_RESERVES,
    FRAXSWAP_OHM_FRAX_TOKEN1_RESERVES,
  );
}

describe("pool total value", () => {
  test("OHM-FRAX pool total value, all tokens", () => {
    mockFraxSwapPairOhmFrax();

    const totalValue = getFraxSwapPairTotalValue(
      PAIR_FRAXSWAP_V1_OHM_FRAX,
      false,
      OHM_USD_RESERVE_BLOCK,
    );

    assert.stringEquals(FRAXSWAP_OHM_FRAX_TOTAL_VALUE.toString(), totalValue.toString());
  });

  test("OHM-FRAX pool total value, excluding OHM", () => {
    mockBalancerVaultZero();
    mockFraxSwapPairOhmFrax();
    mockUsdOhmV2Rate();

    const totalValue = getFraxSwapPairTotalValue(
      PAIR_FRAXSWAP_V1_OHM_FRAX,
      true,
      OHM_USD_RESERVE_BLOCK,
    );

    // # FRAX * rate
    const expectedValue = FRAXSWAP_OHM_FRAX_TOKEN1_RESERVES;
    assert.stringEquals(expectedValue.toString(), totalValue.toString());
  });
});

describe("token quantity", () => {
  test("total quantity of OHM token in pool", () => {
    mockFraxSwapPairOhmFrax();

    const ohm = getFraxSwapPairTokenQuantity(
      PAIR_FRAXSWAP_V1_OHM_FRAX,
      ERC20_OHM_V2,
      OHM_USD_RESERVE_BLOCK,
    );

    assert.stringEquals(ohm.toString(), FRAXSWAP_OHM_FRAX_TOKEN0_RESERVES.toString());
  });

  test("balance of OHM V2 token in OHM V2 pool", () => {
    mockFraxSwapPairOhmFrax();

    // Mock wallet balance
    const expectedWalletBalance = BigDecimal.fromString("2");
    mockZeroWalletBalances(
      PAIR_FRAXSWAP_V1_OHM_FRAX,
      getWalletAddressesForContract(PAIR_FRAXSWAP_V1_OHM_FRAX),
    );
    mockWalletBalance(
      PAIR_FRAXSWAP_V1_OHM_FRAX,
      TREASURY_ADDRESS_V3,
      toBigInt(expectedWalletBalance, ERC20_STANDARD_DECIMALS),
    );

    // total token quantity * balance / total supply
    const expectedTokenBalance = FRAXSWAP_OHM_FRAX_TOKEN0_RESERVES.times(expectedWalletBalance).div(
      FRAXSWAP_OHM_FRAX_TOTAL_SUPPLY,
    );

    const records = getFraxSwapPairTokenQuantityRecords(
      TIMESTAMP,
      PAIR_FRAXSWAP_V1_OHM_FRAX,
      ERC20_OHM_V2,
      OHM_USD_RESERVE_BLOCK,
    );

    assert.stringEquals(records[0].balance.toString(), expectedTokenBalance.toString());
    assert.stringEquals(
      records[0].supplyBalance.toString(),
      expectedTokenBalance.times(BigDecimal.fromString("-1")).toString(),
    ); // Being taken out of circulation
    assert.i32Equals(1, records.length);
  });

  test("balance of OHM V1 token in OHM V2 pool", () => {
    mockFraxSwapPairOhmFrax();

    // Mock wallet balance
    const expectedWalletBalance = BigDecimal.fromString("2");
    mockZeroWalletBalances(
      PAIR_FRAXSWAP_V1_OHM_FRAX,
      getWalletAddressesForContract(PAIR_FRAXSWAP_V1_OHM_FRAX),
    );
    mockWalletBalance(
      PAIR_FRAXSWAP_V1_OHM_FRAX,
      TREASURY_ADDRESS_V3,
      toBigInt(expectedWalletBalance, ERC20_STANDARD_DECIMALS),
    );

    const records = getFraxSwapPairTokenQuantityRecords(
      TIMESTAMP,
      PAIR_FRAXSWAP_V1_OHM_FRAX,
      ERC20_OHM_V1,
      OHM_USD_RESERVE_BLOCK,
    );

    // Should be empty records due to 0 balance of OHM V1
    assert.i32Equals(0, records.length);
  });

  test("balance of OHM V2 token in OHM V2 pool before starting block", () => {
    // 0 total supply
    mockFraxSwapPairOhmFrax(BigDecimal.fromString("0"));

    // Mock wallet balance
    const expectedWalletBalance = BigDecimal.fromString("2");
    mockZeroWalletBalances(
      PAIR_FRAXSWAP_V1_OHM_FRAX,
      getWalletAddressesForContract(PAIR_FRAXSWAP_V1_OHM_FRAX),
    );
    mockWalletBalance(
      PAIR_FRAXSWAP_V1_OHM_FRAX,
      TREASURY_ADDRESS_V3,
      toBigInt(expectedWalletBalance, ERC20_STANDARD_DECIMALS),
    );

    const records = getFraxSwapPairTokenQuantityRecords(
      TIMESTAMP,
      PAIR_FRAXSWAP_V1_OHM_FRAX,
      ERC20_OHM_V2,
      OHM_USD_RESERVE_BLOCK,
    );

    // Should be empty records due to starting block
    assert.i32Equals(0, records.length);
  });
});

describe("get token records", () => {
  test("OHM-FRAX pool balance, all tokens", () => {
    mockBalancerVaultZero();
    mockUsdOhmV2Rate();
    mockFraxSwapPairOhmFrax();

    // Mock wallet balance
    const expectedWalletBalance = BigDecimal.fromString("2");
    mockZeroWalletBalances(
      PAIR_FRAXSWAP_V1_OHM_FRAX,
      getWalletAddressesForContract(PAIR_FRAXSWAP_V1_OHM_FRAX),
    );
    mockWalletBalance(
      PAIR_FRAXSWAP_V1_OHM_FRAX,
      TREASURY_ADDRESS_V3,
      toBigInt(expectedWalletBalance, ERC20_STANDARD_DECIMALS),
    );

    const records = getFraxSwapPairRecords(
      TIMESTAMP,
      PAIR_FRAXSWAP_V1_OHM_FRAX,
      OHM_USD_RESERVE_BLOCK,
      null,
    );

    const expectedNonOhmTotalValue = FRAXSWAP_OHM_FRAX_TOKEN1_RESERVES.times(
      BigDecimal.fromString("1"),
    );
    const expectedMultiplier = expectedNonOhmTotalValue.div(FRAXSWAP_OHM_FRAX_TOTAL_VALUE);
    const expectedValue = expectedWalletBalance.times(FRAXSWAP_OHM_FRAX_UNIT_RATE);
    const expectedValueNonOhm = expectedValue.times(expectedMultiplier);

    assert.stringEquals(expectedValue.toString(), records[0].value.toString());
    assert.stringEquals(expectedValueNonOhm.toString(), records[0].valueExcludingOhm.toString());
    assert.stringEquals(expectedMultiplier.toString(), records[0].multiplier.toString());
    assert.i32Equals(1, records.length);
  });

  test("getLiquidityBalances", () => {
    mockCurvePairZero();
    mockBalancerVaultZero();
    mockUniswapV2PairsZero();
    mockFraxSwapPairZero();

    // Needed for BTRFLY
    mockWEthBtrflyV1Rate();

    mockFraxSwapPairOhmFrax();

    // Mock wallet balance
    const expectedWalletBalance = BigDecimal.fromString("2");
    mockZeroWalletBalances(
      PAIR_FRAXSWAP_V1_OHM_FRAX,
      getWalletAddressesForContract(PAIR_FRAXSWAP_V1_OHM_FRAX),
    );
    mockWalletBalance(
      PAIR_FRAXSWAP_V1_OHM_FRAX,
      TREASURY_ADDRESS_V3,
      toBigInt(expectedWalletBalance, ERC20_STANDARD_DECIMALS),
    );

    const records = getLiquidityBalances(TIMESTAMP, null, OHM_USD_RESERVE_BLOCK);

    const expectedValue = expectedWalletBalance.times(FRAXSWAP_OHM_FRAX_UNIT_RATE);
    assert.stringEquals(expectedValue.toString(), records[0].value.toString());
    assert.i32Equals(1, records.length);
  });

  test("OHM-FRAX pool balance before starting block", () => {
    // total supply 0 before starting block
    mockFraxSwapPairOhmFrax(BigDecimal.fromString("0"));

    // Mock wallet balance
    const expectedWalletBalance = BigDecimal.fromString("2");
    mockZeroWalletBalances(
      PAIR_FRAXSWAP_V1_OHM_FRAX,
      getWalletAddressesForContract(PAIR_FRAXSWAP_V1_OHM_FRAX),
    );
    mockWalletBalance(
      PAIR_FRAXSWAP_V1_OHM_FRAX,
      TREASURY_ADDRESS_V3,
      toBigInt(expectedWalletBalance, ERC20_STANDARD_DECIMALS),
    );

    const records = getFraxSwapPairRecords(
      TIMESTAMP,
      PAIR_FRAXSWAP_V1_OHM_FRAX,
      OHM_USD_RESERVE_BLOCK,
      null,
    );

    assert.i32Equals(0, records.length);
  });

  test("OHM-FRAX pool with matching tokenAddress", () => {
    mockFraxSwapPairOhmFrax();

    // Mock wallet balance
    const expectedWalletBalance = BigDecimal.fromString("2");
    mockZeroWalletBalances(
      PAIR_FRAXSWAP_V1_OHM_FRAX,
      getWalletAddressesForContract(PAIR_FRAXSWAP_V1_OHM_FRAX),
    );
    mockWalletBalance(
      PAIR_FRAXSWAP_V1_OHM_FRAX,
      TREASURY_ADDRESS_V3,
      toBigInt(expectedWalletBalance, ERC20_STANDARD_DECIMALS),
    );

    const records = getFraxSwapPairRecords(
      TIMESTAMP,
      PAIR_FRAXSWAP_V1_OHM_FRAX,
      OHM_USD_RESERVE_BLOCK,
      ERC20_FRAX,
    );

    const expectedValue = expectedWalletBalance.times(FRAXSWAP_OHM_FRAX_UNIT_RATE);
    assert.stringEquals(expectedValue.toString(), records[0].value.toString());
    assert.i32Equals(1, records.length);
  });

  test("OHM-FRAX pool with different tokenAddress", () => {
    mockFraxSwapPairOhmFrax();

    // Mock wallet balance
    const expectedWalletBalance = BigDecimal.fromString("2");
    mockZeroWalletBalances(
      PAIR_FRAXSWAP_V1_OHM_FRAX,
      getWalletAddressesForContract(PAIR_FRAXSWAP_V1_OHM_FRAX),
    );
    mockWalletBalance(
      PAIR_FRAXSWAP_V1_OHM_FRAX,
      TREASURY_ADDRESS_V3,
      toBigInt(expectedWalletBalance, ERC20_STANDARD_DECIMALS),
    );

    const records = getFraxSwapPairRecords(
      TIMESTAMP,
      PAIR_FRAXSWAP_V1_OHM_FRAX,
      OHM_USD_RESERVE_BLOCK,
      ERC20_USDC,
    );

    assert.i32Equals(0, records.length);
  });
});