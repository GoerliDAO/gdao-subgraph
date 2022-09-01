import { BigDecimal, BigInt, log } from "@graphprotocol/graph-ts";

import { ERC20_GOHM } from "./Constants";
import { getERC20 } from "./ContractHelper";
import { toDecimal } from "./Decimals";

/**
 * Returns the total supply of the gOHM token at the given block number.
 *
 * If the ERC20 contract cannot be loaded, 0 will be returned.
 *
 * @param blockNumber the current block number
 * @returns BigDecimal presenting the total supply at {blockNumber}
 */
export function getGOhmTotalSupply(blockNumber: BigInt): BigDecimal {
  const contract = getERC20(ERC20_GOHM, blockNumber);

  if (!contract) {
    log.error(
      "getTotalSupply: Expected to be able to bind to OHM contract at address {} for block {}, but it was not found.",
      [ERC20_GOHM, blockNumber.toString()],
    );
    return BigDecimal.zero();
  }

  return toDecimal(contract.totalSupply(), contract.decimals());
}
