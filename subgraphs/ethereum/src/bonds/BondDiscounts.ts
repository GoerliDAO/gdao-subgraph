import { Address, BigDecimal, BigInt, log } from "@graphprotocol/graph-ts";

import { toDecimal } from "../../../../common/src/utils/Decimals";
import { DAIBondV1 } from "../../generated/BondDiscounts/DAIBondV1";
import { DAIBondV2 } from "../../generated/BondDiscounts/DAIBondV2";
import { DAIBondV3 } from "../../generated/BondDiscounts/DAIBondV3";
import { ETHBondV1 } from "../../generated/BondDiscounts/ETHBondV1";
import { FRAXBondV1 } from "../../generated/BondDiscounts/FRAXBondV1";
import { LUSDBondV1 } from "../../generated/BondDiscounts/LUSDBondV1";
import { OHMDAIBondV1 } from "../../generated/BondDiscounts/OHMDAIBondV1";
import { OHMDAIBondV2 } from "../../generated/BondDiscounts/OHMDAIBondV2";
import { OHMDAIBondV3 } from "../../generated/BondDiscounts/OHMDAIBondV3";
import { OHMDAIBondV4 } from "../../generated/BondDiscounts/OHMDAIBondV4";
import { OHMFRAXBondV1 } from "../../generated/BondDiscounts/OHMFRAXBondV1";
import { OHMFRAXBondV2 } from "../../generated/BondDiscounts/OHMFRAXBondV2";
import { OHMLUSDBondV1 } from "../../generated/BondDiscounts/OHMLUSDBondV1";
import { StakeCall } from "../../generated/BondDiscounts/OlympusStakingV3";
import { BondDiscount } from "../../generated/schema";
import {
  DAIBOND_CONTRACTS1,
  DAIBOND_CONTRACTS1_BLOCK,
  DAIBOND_CONTRACTS2,
  DAIBOND_CONTRACTS2_BLOCK,
  DAIBOND_CONTRACTS3,
  DAIBOND_CONTRACTS3_BLOCK,
  ETHBOND_CONTRACT1,
  ETHBOND_CONTRACT1_BLOCK,
  FRAXBOND_CONTRACT1,
  FRAXBOND_CONTRACT1_BLOCK,
  LUSDBOND_CONTRACT1,
  LUSDBOND_CONTRACT1_BLOCK,
  OHMDAISLPBOND_CONTRACT1,
  OHMDAISLPBOND_CONTRACT1_BLOCK,
  OHMDAISLPBOND_CONTRACT2,
  OHMDAISLPBOND_CONTRACT2_BLOCK,
  OHMDAISLPBOND_CONTRACT3,
  OHMDAISLPBOND_CONTRACT3_BLOCK,
  OHMDAISLPBOND_CONTRACT4,
  OHMDAISLPBOND_CONTRACT4_BLOCK,
  OHMFRAXLPBOND_CONTRACT1,
  OHMFRAXLPBOND_CONTRACT1_BLOCK,
  OHMFRAXLPBOND_CONTRACT2,
  OHMFRAXLPBOND_CONTRACT2_BLOCK,
  OHMLUSDBOND_CONTRACT1,
  OHMLUSDBOND_CONTRACT1_BLOCK,
} from "../utils/Constants";
import { hourFromTimestamp } from "../utils/Dates";
import { getBaseOhmUsdRate } from "../utils/Price";

export function loadOrCreateBondDiscount(timestamp: BigInt): BondDiscount {
  const hourTimestamp = hourFromTimestamp(timestamp);

  let bondDiscount = BondDiscount.load(hourTimestamp);
  if (bondDiscount == null) {
    bondDiscount = new BondDiscount(hourTimestamp);
    bondDiscount.timestamp = timestamp;
    bondDiscount.dai_discount = BigDecimal.fromString("0");
    bondDiscount.ohmdai_discount = BigDecimal.fromString("0");
    bondDiscount.frax_discount = BigDecimal.fromString("0");
    bondDiscount.ohmfrax_discount = BigDecimal.fromString("0");
    bondDiscount.eth_discount = BigDecimal.fromString("0");
    bondDiscount.lusd_discount = BigDecimal.fromString("0");
    bondDiscount.ohmlusd_discount = BigDecimal.fromString("0");
    bondDiscount.save();
  }
  return bondDiscount as BondDiscount;
}

export function updateBondDiscounts(blockNumber: BigInt): void {
  const bd = loadOrCreateBondDiscount(blockNumber);
  const ohmRate = getBaseOhmUsdRate(blockNumber);

  // OHMDAI
  if (blockNumber.gt(BigInt.fromString(OHMDAISLPBOND_CONTRACT1_BLOCK))) {
    const bond = OHMDAIBondV1.bind(Address.fromString(OHMDAISLPBOND_CONTRACT1));
    // bd.ohmdai_discount = ohmRate.div(toDecimal(bond.bondPriceInUSD(), 18)).minus(BigDecimal.fromString("1")).times(BigDecimal.fromString("100"))
  }
  if (blockNumber.gt(BigInt.fromString(OHMDAISLPBOND_CONTRACT2_BLOCK))) {
    const bond = OHMDAIBondV2.bind(Address.fromString(OHMDAISLPBOND_CONTRACT2));
    // bd.ohmdai_discount = ohmRate.div(toDecimal(bond.bondPriceInUSD(), 18)).minus(BigDecimal.fromString("1")).times(BigDecimal.fromString("100"))
  }
  if (blockNumber.gt(BigInt.fromString(OHMDAISLPBOND_CONTRACT3_BLOCK))) {
    const bond = OHMDAIBondV3.bind(Address.fromString(OHMDAISLPBOND_CONTRACT3));
    // bd.ohmdai_discount = ohmRate.div(toDecimal(bond.bondPriceInUSD(), 18)).minus(BigDecimal.fromString("1")).times(BigDecimal.fromString("100"))
  }
  if (blockNumber.gt(BigInt.fromString(OHMDAISLPBOND_CONTRACT4_BLOCK))) {
    const bond = OHMDAIBondV4.bind(Address.fromString(OHMDAISLPBOND_CONTRACT4));
    const price_call = bond.try_bondPriceInUSD();
    if (price_call.reverted === false && price_call.value.gt(BigInt.fromI32(0))) {
      bd.ohmdai_discount = ohmRate.div(toDecimal(price_call.value, 18));
      bd.ohmdai_discount = bd.ohmdai_discount.minus(BigDecimal.fromString("1"));
      bd.ohmdai_discount = bd.ohmdai_discount.times(BigDecimal.fromString("100"));
      log.debug("OHMDAI Discount OHM price {}  Bond Price {}  Discount {}", [
        ohmRate.toString(),
        price_call.value.toString(),
        bd.ohmfrax_discount.toString(),
      ]);
    }
  }

  // DAI
  if (blockNumber.gt(BigInt.fromString(DAIBOND_CONTRACTS1_BLOCK))) {
    const bond = DAIBondV1.bind(Address.fromString(DAIBOND_CONTRACTS1));
    // bd.dai_discount = ohmRate.div(toDecimal(bond.bondPriceInUSD(), 18)).minus(BigDecimal.fromString("1")).times(BigDecimal.fromString("100"))
  }
  if (blockNumber.gt(BigInt.fromString(DAIBOND_CONTRACTS2_BLOCK))) {
    const bond = DAIBondV2.bind(Address.fromString(DAIBOND_CONTRACTS2));
    const price_call = bond.try_bondPriceInUSD();
    if (price_call.reverted === false && price_call.value.gt(BigInt.fromI32(0))) {
      bd.dai_discount = ohmRate.div(toDecimal(price_call.value, 18));
      bd.dai_discount = bd.dai_discount.minus(BigDecimal.fromString("1"));
      bd.dai_discount = bd.dai_discount.times(BigDecimal.fromString("100"));
      log.debug("DAI Discount OHM price {}  Bond Price {}  Discount {}", [
        ohmRate.toString(),
        price_call.value.toString(),
        bd.ohmfrax_discount.toString(),
      ]);
    }
  }

  if (blockNumber.gt(BigInt.fromString(DAIBOND_CONTRACTS3_BLOCK))) {
    const bond = DAIBondV3.bind(Address.fromString(DAIBOND_CONTRACTS3));
    const price_call = bond.try_bondPriceInUSD();
    if (price_call.reverted === false && price_call.value.gt(BigInt.fromI32(0))) {
      bd.dai_discount = ohmRate.div(toDecimal(price_call.value, 18));
      bd.dai_discount = bd.dai_discount.minus(BigDecimal.fromString("1"));
      bd.dai_discount = bd.dai_discount.times(BigDecimal.fromString("100"));
      log.debug("DAI Discount OHM price {}  Bond Price {}  Discount {}", [
        ohmRate.toString(),
        price_call.value.toString(),
        bd.ohmfrax_discount.toString(),
      ]);
    }
  }

  // OHMFRAX
  if (blockNumber.gt(BigInt.fromString(OHMFRAXLPBOND_CONTRACT1_BLOCK))) {
    const bond = OHMFRAXBondV1.bind(Address.fromString(OHMFRAXLPBOND_CONTRACT1));
    const price_call = bond.try_bondPriceInUSD();
    if (price_call.reverted === false && price_call.value.gt(BigInt.fromI32(0))) {
      bd.ohmfrax_discount = ohmRate.div(toDecimal(price_call.value, 18));
      bd.ohmfrax_discount = bd.ohmfrax_discount.minus(BigDecimal.fromString("1"));
      bd.ohmfrax_discount = bd.ohmfrax_discount.times(BigDecimal.fromString("100"));
      log.debug("OHMFRAX Discount OHM price {}  Bond Price {}  Discount {}", [
        ohmRate.toString(),
        price_call.value.toString(),
        bd.ohmfrax_discount.toString(),
      ]);
    }
  }
  if (blockNumber.gt(BigInt.fromString(OHMFRAXLPBOND_CONTRACT2_BLOCK))) {
    const bond = OHMFRAXBondV2.bind(Address.fromString(OHMFRAXLPBOND_CONTRACT2));
    const price_call = bond.try_bondPriceInUSD();
    if (price_call.reverted === false && price_call.value.gt(BigInt.fromI32(0))) {
      bd.ohmfrax_discount = ohmRate.div(toDecimal(price_call.value, 18));
      bd.ohmfrax_discount = bd.ohmfrax_discount.minus(BigDecimal.fromString("1"));
      bd.ohmfrax_discount = bd.ohmfrax_discount.times(BigDecimal.fromString("100"));
      log.debug("OHMFRAX Discount OHM price {}  Bond Price {}  Discount {}", [
        ohmRate.toString(),
        price_call.value.toString(),
        bd.ohmfrax_discount.toString(),
      ]);
    }
  }

  // FRAX
  if (blockNumber.gt(BigInt.fromString(FRAXBOND_CONTRACT1_BLOCK))) {
    const bond = FRAXBondV1.bind(Address.fromString(FRAXBOND_CONTRACT1));
    const price_call = bond.try_bondPriceInUSD();
    if (price_call.reverted === false && price_call.value.gt(BigInt.fromI32(0))) {
      bd.frax_discount = ohmRate.div(toDecimal(price_call.value, 18));
      bd.frax_discount = bd.frax_discount.minus(BigDecimal.fromString("1"));
      bd.frax_discount = bd.frax_discount.times(BigDecimal.fromString("100"));
      log.debug("FRAX Discount OHM price {}  Bond Price {}  Discount {}", [
        ohmRate.toString(),
        price_call.value.toString(),
        bd.ohmfrax_discount.toString(),
      ]);
    }
  }

  // ETH
  if (blockNumber.gt(BigInt.fromString(ETHBOND_CONTRACT1_BLOCK))) {
    const bond = ETHBondV1.bind(Address.fromString(ETHBOND_CONTRACT1));
    const price_call = bond.try_bondPriceInUSD();
    if (price_call.reverted === false && price_call.value.gt(BigInt.fromI32(0))) {
      bd.eth_discount = ohmRate.div(toDecimal(price_call.value, 18));
      bd.eth_discount = bd.eth_discount.minus(BigDecimal.fromString("1"));
      bd.eth_discount = bd.eth_discount.times(BigDecimal.fromString("100"));
      log.debug("ETH Discount OHM price {}  Bond Price {}  Discount {}", [
        ohmRate.toString(),
        price_call.value.toString(),
        bd.ohmfrax_discount.toString(),
      ]);
    }
  }

  // LUSD
  if (blockNumber.gt(BigInt.fromString(LUSDBOND_CONTRACT1_BLOCK))) {
    const bond = LUSDBondV1.bind(Address.fromString(LUSDBOND_CONTRACT1));
    const price_call = bond.try_bondPriceInUSD();
    if (price_call.reverted === false && price_call.value.gt(BigInt.fromI32(0))) {
      bd.lusd_discount = ohmRate.div(toDecimal(price_call.value, 18));
      bd.lusd_discount = bd.lusd_discount.minus(BigDecimal.fromString("1"));
      bd.lusd_discount = bd.lusd_discount.times(BigDecimal.fromString("100"));
      log.debug("LUSD Discount OHM price {}  Bond Price {}  Discount {}", [
        ohmRate.toString(),
        price_call.value.toString(),
        bd.ohmfrax_discount.toString(),
      ]);
    }
  }

  // OHMLUSD
  if (blockNumber.gt(BigInt.fromString(OHMLUSDBOND_CONTRACT1_BLOCK))) {
    const bond = OHMLUSDBondV1.bind(Address.fromString(OHMLUSDBOND_CONTRACT1));
    const price_call = bond.try_bondPriceInUSD();
    if (price_call.reverted === false && price_call.value.gt(BigInt.fromI32(0))) {
      bd.ohmlusd_discount = ohmRate.div(toDecimal(price_call.value, 18));
      bd.ohmlusd_discount = bd.ohmlusd_discount.minus(BigDecimal.fromString("1"));
      bd.ohmlusd_discount = bd.ohmlusd_discount.times(BigDecimal.fromString("100"));
      log.debug("OHMLUSD Discount OHM price {}  Bond Price {}  Discount {}", [
        ohmRate.toString(),
        price_call.value.toString(),
        bd.ohmfrax_discount.toString(),
      ]);
    }
  }

  bd.save();
}

export function handleBondDiscounts(call: StakeCall): void {
  updateBondDiscounts(call.block.number);
}
