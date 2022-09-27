import { Address, BigDecimal, BigInt, log } from "@graphprotocol/graph-ts";

import { TokenRecord } from "../../../shared/generated/schema";
import { TokenCategoryPOL } from "../../../shared/src/contracts/TokenDefinition";
import { toDecimal } from "../../../shared/src/utils/Decimals";
import { createOrUpdateTokenRecord } from "../../../shared/src/utils/TokenRecordHelper";
import { UniswapV2Pair } from "../../generated/ProtocolMetrics/UniswapV2Pair";
import { TokenSupply } from "../../generated/schema";
import {
  BLOCKCHAIN,
  ERC20_OHM_V2,
  ERC20_TOKENS,
  getContractName,
  getWalletAddressesForContract,
  liquidityPairHasToken,
} from "../utils/Constants";
import { getERC20, getUniswapV2Pair } from "../utils/ContractHelper";
import { getBaseOhmUsdRate, getUSDRate } from "../utils/Price";
import { createOrUpdateTokenSupply, TYPE_LIQUIDITY } from "../utils/TokenSupplyHelper";

/**
 * To calculate the risk-free value of an OHM-DAI LP, we assume
 * that DAI = $1 and OHM = $1.
 *
 * The multiple of the quantity of tokens on both sides of the LP
 * remains constant in a Uniswap V2 pool: x * y = k
 *
 * Given this: x1 * y1 = x2 * y2
 *
 * However, if x2 = y2, then: x1 * y1 = x2^2
 *
 * x2 = sqrt(x1 * y1)
 *
 * This tells us the number of DAI (or OHM) tokens required at the
 * position on the constant product curve.
 *
 * If we assume that 1 DAI = 1 OHM, then the value of the entire
 * liquidity pool at RFC is: (1 + 1) * sqrt(# DAI * # OHM)
 *
 * The total value, given the balance, is therefore:
 *
 * (# LP tokens / LP total supply) * (2) * sqrt(# DAI * # OHM)
 *
 * This blog also helps illustrate it: https://olympusdao.medium.com/a-primer-on-oly-bonds-9763f125c124
 */
export function getOhmUSDPairRiskFreeValue(
  lpBalance: BigInt,
  pairAddress: string,
  blockNumber: BigInt,
): BigDecimal {
  // TODO assumes that the pair is Uniswap V2. What about V3 or balancer?
  // TODO assumes part of the pair is a stablecoin
  // TODO abstract out for ANY pair
  const pair = getUniswapV2Pair(pairAddress, blockNumber);
  if (!pair) {
    log.warning(
      "getOhmUSDPairRiskFreeValue: Cannot determine discounted value as the contract {} does not exist yet",
      [getContractName(pairAddress)],
    );
    return BigDecimal.zero();
  }

  const total_lp = pair.totalSupply();
  const lp_token_1 = toDecimal(pair.getReserves().value0, 9);
  const lp_token_2 = toDecimal(pair.getReserves().value1, 18);
  const kLast = lp_token_1.times(lp_token_2).truncate(0).digits;

  const part1 = toDecimal(lpBalance, 18).div(toDecimal(total_lp, 18));
  const two = BigInt.fromI32(2);

  const sqrt = kLast.sqrt();
  const part2 = toDecimal(two.times(sqrt), 0);
  const result = part1.times(part2);
  log.debug("getOhmUSDPairRiskFreeValue: OHM-DAI risk-free value is {}", [result.toString()]);
  return result;
}

export function getUniswapV2PairTotalValue(
  pairAddress: string,
  excludeOhmValue: boolean,
  blockNumber: BigInt,
): BigDecimal {
  log.info("getUniswapV2PairTotalValue: Calculating total value of pair {}", [pairAddress]);
  const pair = getUniswapV2Pair(pairAddress, blockNumber);
  if (!pair) {
    log.warning(
      "getUniswapV2PairTotalValue: Cannot determine discounted value as the contract {} does not exist yet",
      [getContractName(pairAddress)],
    );
    return BigDecimal.zero();
  }

  // Determine token0 value
  const token0 = pair.token0().toHexString();
  log.debug("getUniswapV2PairTotalValue: token0: {} ({})", [token0, getContractName(token0)]);
  const token0Contract = getERC20(token0, blockNumber);
  if (!token0Contract) {
    throw new Error("Unable to find ERC20 contract for " + token0);
  }

  const token0Reserves = toDecimal(pair.getReserves().value0, token0Contract.decimals());
  // We use getUSDRate, so that the preferred liquidity pool is used
  const token0Rate = getUSDRate(token0, blockNumber);
  const token0Value = token0Reserves.times(token0Rate);
  log.debug("getUniswapV2PairTotalValue: token0: reserves = {}, rate = {}, value: {}", [
    token0Reserves.toString(),
    token0Rate.toString(),
    token0Value.toString(),
  ]);
  const token0ValueExcludingOhm =
    token0.toLowerCase() == ERC20_OHM_V2.toLowerCase() ? BigDecimal.zero() : token0Value;

  // Determine token1 value
  const token1 = pair.token1().toHexString();
  log.debug("getUniswapV2PairTotalValue: token1: {} ({})", [token1, getContractName(token1)]);
  const token1Contract = getERC20(token1, blockNumber);
  if (!token1Contract) {
    throw new Error("Unable to find ERC20 contract for " + token1);
  }

  const token1Reserves = toDecimal(pair.getReserves().value1, token1Contract.decimals());
  // We use getUSDRate, so that the preferred liquidity pool is used
  const token1Rate = getUSDRate(token1, blockNumber);
  const token1Value = token1Reserves.times(token1Rate);
  log.debug("getUniswapV2PairTotalValue: token1: reserves = {}, rate = {}, value: {}", [
    token1Reserves.toString(),
    token1Rate.toString(),
    token1Value.toString(),
  ]);
  const token1ValueExcludingOhm =
    token1.toLowerCase() == ERC20_OHM_V2.toLowerCase() ? BigDecimal.zero() : token1Value;

  const totalValue = excludeOhmValue
    ? token0ValueExcludingOhm.plus(token1ValueExcludingOhm)
    : token0Value.plus(token1Value);
  log.info("getUniswapV2PairTotalValue: Total value of pair {} is {}", [
    pairAddress,
    totalValue.toString(),
  ]);
  return totalValue;
}

/**
 * Determines the value of the given balance
 * of a liquidity pool.
 *
 * @param lpBalance
 * @param pairAddress
 * @param blockNumber
 * @returns
 */
export function getUniswapV2PairValue(
  lpBalance: BigInt,
  pairAddress: string,
  blockNumber: BigInt,
): BigDecimal {
  const pair = getUniswapV2Pair(pairAddress, blockNumber);
  if (!pair) {
    log.warning(
      "getUniswapV2PairValue: Cannot determine discounted value as the contract {} does not exist yet",
      [getContractName(pairAddress)],
    );
    return BigDecimal.zero();
  }

  const lpValue = getUniswapV2PairTotalValue(pairAddress, false, blockNumber);
  const poolTotalSupply = toDecimal(pair.totalSupply(), 18);
  const poolPercentageOwned = toDecimal(lpBalance, 18).div(poolTotalSupply);
  const balanceValue = poolPercentageOwned.times(lpValue);
  log.info("getUniswapV2PairValue: Value for pair {} and balance {} is {}", [
    pairAddress,
    lpBalance.toString(),
    balanceValue.toString(),
  ]);
  return balanceValue;
}

/**
 * Determines the value of the given balance
 * of a liquidity pool between OHM and a USD
 * stablecoin.
 *
 * @param lpBalance
 * @param pairAddress
 * @param blockNumber
 * @returns
 */
export function getOhmUSDPairValue(
  lpBalance: BigInt,
  pairAddress: string,
  blockNumber: BigInt,
): BigDecimal {
  const pair = getUniswapV2Pair(pairAddress, blockNumber);
  if (!pair) {
    log.warning(
      "getOhmUSDPairValue: Cannot determine discounted value as the contract {} does not exist yet",
      [getContractName(pairAddress)],
    );
    return BigDecimal.zero();
  }

  const ohmReserves = pair.getReserves().value0;
  const secondTokenReserves = pair.getReserves().value1;
  const poolTotalSupply = toDecimal(pair.totalSupply(), 18);
  const poolPercentageOwned = toDecimal(lpBalance, 18).div(poolTotalSupply);

  const ohmValue = toDecimal(ohmReserves, 9).times(getBaseOhmUsdRate(blockNumber));

  // Total value in USD is ohmValue + balance of USD stablecoin
  // TODO support for price lookup
  const lpValue = ohmValue.plus(toDecimal(secondTokenReserves, 18));

  return poolPercentageOwned.times(lpValue);
}

/**
 * Calculates the unit rate of the given UniswapV2 pair.
 *
 * The total supply of the pair is determined and
 * divides the value to give the unit rate.
 *
 * @param pairAddress UniswapV2 pair address
 * @param totalValue total value of the UniswapV2 pair
 * @param blockNumber current block
 * @returns
 */
export function getUniswapV2PairUnitRate(
  pairAddress: string,
  totalValue: BigDecimal,
  blockNumber: BigInt,
): BigDecimal {
  const pair = getUniswapV2Pair(pairAddress, blockNumber);
  if (!pair) {
    log.warning(
      "getUniswapV2PairUnitRate: Cannot determine discounted value as the contract {} does not exist yet",
      [getContractName(pairAddress)],
    );
    return BigDecimal.zero();
  }

  const totalSupply = toDecimal(pair.totalSupply(), pair.decimals());
  const unitRate = totalValue.div(totalSupply);
  log.info("getUniswapV2PairUnitRate: Unit rate of UniswapV2 LP {} is {} for total supply {}", [
    pairAddress,
    unitRate.toString(),
    totalSupply.toString(),
  ]);
  return unitRate;
}

/**
 * Returns the TokenRecord for the UniswapV2 pair's token
 * at the given {walletAddress}.
 *
 * @param metricName
 * @param pairAddress token address for the UniswapV2 pair
 * @param pairRate the unit rate of the pair
 * @param walletAddress the wallet to look up the balance
 * @param multiplier
 * @param blockNumber the current block number
 * @returns
 */
function getUniswapV2PairRecord(
  timestamp: BigInt,
  pairAddress: string,
  pairRate: BigDecimal,
  walletAddress: string,
  multiplier: BigDecimal,
  blockNumber: BigInt,
): TokenRecord | null {
  const pairToken = getUniswapV2Pair(pairAddress, blockNumber);
  if (!pairToken) {
    throw new Error("Unable to bind to contract for UniswapV2 pair " + pairAddress);
  }

  // Get the balance of the pair's token in walletAddress
  const pairTokenBalance = pairToken.balanceOf(Address.fromString(walletAddress));
  if (pairTokenBalance.equals(BigInt.zero())) {
    log.debug(
      "getUniswapV2PairRecord: UniswapV2 pair balance for token {} ({}) in wallet {} ({}) was 0",
      [getContractName(pairAddress), pairAddress, getContractName(walletAddress), walletAddress],
    );
    return null;
  }

  const pairTokenBalanceDecimal = toDecimal(pairTokenBalance, pairToken.decimals());

  return createOrUpdateTokenRecord(
    timestamp,
    getContractName(pairAddress),
    pairAddress,
    getContractName(walletAddress),
    walletAddress,
    pairRate,
    pairTokenBalanceDecimal,
    blockNumber,
    true,
    ERC20_TOKENS,
    BLOCKCHAIN,
    multiplier,
    TokenCategoryPOL,
  );
}

/**
 * Returns the records for the specified UniswapV2 LP.
 *
 * This function does the following:
 * - Calculates the total value of the LP
 * - Calculates the unit rate of the LP
 * - Iterates through {getWalletAddressesForContract} and adds records
 * for the balance of the LP's token
 *
 * @param metricName
 * @param pairAddress the address of the UniswapV2 pair
 * @param tokenAddress restrict results to match the specified tokenbe excluded
 * @param blockNumber the current block number
 * @returns
 */
export function getUniswapV2PairRecords(
  timestamp: BigInt,
  pairAddress: string,
  tokenAddress: string | null,
  blockNumber: BigInt,
): TokenRecord[] {
  const records: TokenRecord[] = [];
  // If we are restricting by token and tokenAddress does not match either side of the pair
  if (tokenAddress && !liquidityPairHasToken(pairAddress, tokenAddress)) {
    log.debug(
      "getUniswapV2PairRecords: Skipping UniswapV2 pair that does not match specified token address {}",
      [tokenAddress],
    );
    return records;
  }

  // Calculate total value of the LP
  const totalValue = getUniswapV2PairTotalValue(pairAddress, false, blockNumber);
  if (totalValue.equals(BigDecimal.zero())) {
    return records;
  }

  const includedValue = getUniswapV2PairTotalValue(pairAddress, true, blockNumber);
  // Calculate multiplier
  const multiplier = includedValue.div(totalValue);
  log.info("getUniswapV2PairRecords: applying multiplier of {}", [multiplier.toString()]);

  // Calculate the unit rate of the LP
  const unitRate = getUniswapV2PairUnitRate(pairAddress, totalValue, blockNumber);
  const wallets = getWalletAddressesForContract(pairAddress);

  for (let i = 0; i < wallets.length; i++) {
    const walletAddress = wallets[i];

    const record = getUniswapV2PairRecord(
      timestamp,
      pairAddress,
      unitRate,
      walletAddress,
      multiplier,
      blockNumber,
    );
    if (record) {
      records.push(record);
    }
  }

  return records;
}

function getBigDecimalFromBalance(
  tokenAddress: string,
  balance: BigInt,
  blockNumber: BigInt,
): BigDecimal {
  const tokenContract = getERC20(tokenAddress, blockNumber);
  if (!tokenContract) {
    throw new Error("Unable to fetch ERC20 at address " + tokenAddress + " for Curve pool");
  }

  return toDecimal(balance, tokenContract.decimals());
}

/**
 * Calculates the quantity of {tokenAddress}
 * contained within the pair at {pairAddress}.
 *
 * If {tokenAddress} is not present within the pair,
 * 0 will be returned.
 *
 * @param pairAddress address of a UniswapV2 pair
 * @param tokenAddress address of the token to look for
 * @param blockNumber current block number
 * @returns BigDecimal representing the quantity, or 0
 */
export function getUniswapV2PairTotalTokenQuantity(
  pairAddress: string,
  tokenAddress: string,
  blockNumber: BigInt,
): BigDecimal {
  // Obtain both tokens
  const pair = UniswapV2Pair.bind(Address.fromString(pairAddress));
  if (!pair) {
    log.warning(
      "getUniswapV2PairTotalTokenQuantity: Cannot determine total quantity the contract {} does not exist yet",
      [getContractName(pairAddress)],
    );
    return BigDecimal.zero();
  }

  const token0 = pair.token0();
  const token1 = pair.token1();

  if (token0.equals(Address.fromString(tokenAddress))) {
    const token0Balance = pair.getReserves().value0;
    return getBigDecimalFromBalance(tokenAddress, token0Balance, blockNumber);
  } else if (token1.equals(Address.fromString(tokenAddress))) {
    const token1Balance = pair.getReserves().value1;
    return getBigDecimalFromBalance(tokenAddress, token1Balance, blockNumber);
  }

  log.warning(
    "getUniswapV2PairTotalTokenQuantity: Attempted to obtain quantity of token {} from UniswapV2 pair {}, but it was not found",
    [getContractName(tokenAddress), getContractName(pairAddress)],
  );
  return BigDecimal.zero();
}

/**
 * Returns records for the quantity of {tokenAddress}
 * across {getWalletAddressesForContract}.
 *
 * @param metricName
 * @param pairAddress
 * @param tokenAddress
 * @param blockNumber
 * @returns
 */
export function getUniswapV2PairTokenQuantity(
  timestamp: BigInt,
  pairAddress: string,
  tokenAddress: string,
  blockNumber: BigInt,
): TokenSupply[] {
  log.info("getUniswapV2PairTokenQuantity: Calculating quantity of token {} in UniswapV2 pool {}", [
    getContractName(tokenAddress),
    getContractName(pairAddress),
  ]);
  const records: TokenSupply[] = [];
  const poolTokenContract = getUniswapV2Pair(pairAddress, blockNumber);
  if (!poolTokenContract) {
    log.warning(
      "getUniswapV2PairTokenQuantity: UniswapV2 contract at {} likely doesn't exist at block {}",
      [pairAddress, blockNumber.toString()],
    );
    return records;
  }

  // Calculate the token quantity for the pool
  const totalQuantity = getUniswapV2PairTotalTokenQuantity(pairAddress, tokenAddress, blockNumber);
  const tokenDecimals = poolTokenContract.decimals();
  log.info("getUniswapV2PairTokenQuantity: UniswapV2 pool {} has total quantity of {}", [
    getContractName(pairAddress),
    totalQuantity.toString(),
  ]);
  const poolTokenTotalSupply = toDecimal(poolTokenContract.totalSupply(), tokenDecimals);
  if (poolTokenTotalSupply.equals(BigDecimal.zero())) {
    log.debug(
      "getUniswapV2PairTokenQuantity: Skipping UniswapV2 pair {} with total supply of 0 at block {}",
      [getContractName(pairAddress), blockNumber.toString()],
    );
    return records;
  }

  log.info("getUniswapV2PairTokenQuantity: UniswapV2 pool {} has total supply of {}", [
    getContractName(pairAddress),
    poolTokenTotalSupply.toString(),
  ]);

  // Grab balances
  const poolTokenBalances = getUniswapV2PairRecords(
    timestamp,
    pairAddress,
    tokenAddress,
    blockNumber,
  );

  for (let i = 0; i < poolTokenBalances.length; i++) {
    const record = poolTokenBalances[i];

    const tokenBalance = totalQuantity.times(record.balance).div(poolTokenTotalSupply);
    records.push(
      createOrUpdateTokenSupply(
        timestamp,
        getContractName(tokenAddress),
        tokenAddress,
        getContractName(pairAddress),
        pairAddress,
        record.source,
        record.sourceAddress,
        TYPE_LIQUIDITY,
        tokenBalance,
        blockNumber,
        -1,
      ),
    );
  }

  return records;
}
