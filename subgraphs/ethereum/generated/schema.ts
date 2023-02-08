// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  BigDecimal,
  BigInt,
  Bytes,
  Entity,
  store,
  TypedMap,
  Value,
  ValueKind} from "@graphprotocol/graph-ts";

export class DailyBond extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    const id = this.get("id");
    assert(id != null, "Cannot save DailyBond entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type DailyBond must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("DailyBond", id.toString(), this);
    }
  }

  static load(id: string): DailyBond | null {
    return changetype<DailyBond | null>(store.get("DailyBond", id));
  }

  get id(): string {
    const value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timestamp(): BigInt {
    const value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get token(): string {
    const value = this.get("token");
    return value!.toString();
  }

  set token(value: string) {
    this.set("token", Value.fromString(value));
  }

  get amount(): BigDecimal {
    const value = this.get("amount");
    return value!.toBigDecimal();
  }

  set amount(value: BigDecimal) {
    this.set("amount", Value.fromBigDecimal(value));
  }

  get value(): BigDecimal {
    const value = this.get("value");
    return value!.toBigDecimal();
  }

  set value(value: BigDecimal) {
    this.set("value", Value.fromBigDecimal(value));
  }
}

export class Rebase extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    const id = this.get("id");
    assert(id != null, "Cannot save Rebase entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Rebase must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Rebase", id.toString(), this);
    }
  }

  static load(id: string): Rebase | null {
    return changetype<Rebase | null>(store.get("Rebase", id));
  }

  get id(): string {
    const value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get amount(): BigDecimal {
    const value = this.get("amount");
    return value!.toBigDecimal();
  }

  set amount(value: BigDecimal) {
    this.set("amount", Value.fromBigDecimal(value));
  }

  get stakedOhms(): BigDecimal {
    const value = this.get("stakedOhms");
    return value!.toBigDecimal();
  }

  set stakedOhms(value: BigDecimal) {
    this.set("stakedOhms", Value.fromBigDecimal(value));
  }

  get percentage(): BigDecimal {
    const value = this.get("percentage");
    return value!.toBigDecimal();
  }

  set percentage(value: BigDecimal) {
    this.set("percentage", Value.fromBigDecimal(value));
  }

  get contract(): string {
    const value = this.get("contract");
    return value!.toString();
  }

  set contract(value: string) {
    this.set("contract", Value.fromString(value));
  }

  get timestamp(): BigInt {
    const value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get value(): BigDecimal {
    const value = this.get("value");
    return value!.toBigDecimal();
  }

  set value(value: BigDecimal) {
    this.set("value", Value.fromBigDecimal(value));
  }
}

export class DailyStakingReward extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    const id = this.get("id");
    assert(id != null, "Cannot save DailyStakingReward entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type DailyStakingReward must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("DailyStakingReward", id.toString(), this);
    }
  }

  static load(id: string): DailyStakingReward | null {
    return changetype<DailyStakingReward | null>(
      store.get("DailyStakingReward", id)
    );
  }

  get id(): string {
    const value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timestamp(): BigInt {
    const value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get amount(): BigDecimal {
    const value = this.get("amount");
    return value!.toBigDecimal();
  }

  set amount(value: BigDecimal) {
    this.set("amount", Value.fromBigDecimal(value));
  }

  get value(): BigDecimal {
    const value = this.get("value");
    return value!.toBigDecimal();
  }

  set value(value: BigDecimal) {
    this.set("value", Value.fromBigDecimal(value));
  }
}

export class Token extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    const id = this.get("id");
    assert(id != null, "Cannot save Token entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Token must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Token", id.toString(), this);
    }
  }

  static load(id: string): Token | null {
    return changetype<Token | null>(store.get("Token", id));
  }

  get id(): string {
    const value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }
}

export class ProtocolMetric extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    const id = this.get("id");
    assert(id != null, "Cannot save ProtocolMetric entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type ProtocolMetric must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("ProtocolMetric", id.toString(), this);
    }
  }

  static load(id: string): ProtocolMetric | null {
    return changetype<ProtocolMetric | null>(store.get("ProtocolMetric", id));
  }

  get id(): string {
    const value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get block(): BigInt {
    const value = this.get("block");
    return value!.toBigInt();
  }

  set block(value: BigInt) {
    this.set("block", Value.fromBigInt(value));
  }

  get currentAPY(): BigDecimal {
    const value = this.get("currentAPY");
    return value!.toBigDecimal();
  }

  set currentAPY(value: BigDecimal) {
    this.set("currentAPY", Value.fromBigDecimal(value));
  }

  get currentIndex(): BigDecimal {
    const value = this.get("currentIndex");
    return value!.toBigDecimal();
  }

  set currentIndex(value: BigDecimal) {
    this.set("currentIndex", Value.fromBigDecimal(value));
  }

  get date(): string {
    const value = this.get("date");
    return value!.toString();
  }

  set date(value: string) {
    this.set("date", Value.fromString(value));
  }

  get gOhmPrice(): BigDecimal {
    const value = this.get("gOhmPrice");
    return value!.toBigDecimal();
  }

  set gOhmPrice(value: BigDecimal) {
    this.set("gOhmPrice", Value.fromBigDecimal(value));
  }

  get gOhmSyntheticSupply(): BigDecimal | null {
    const value = this.get("gOhmSyntheticSupply");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigDecimal();
    }
  }

  set gOhmSyntheticSupply(value: BigDecimal | null) {
    if (!value) {
      this.unset("gOhmSyntheticSupply");
    } else {
      this.set("gOhmSyntheticSupply", Value.fromBigDecimal(<BigDecimal>value));
    }
  }

  get gOhmTotalSupply(): BigDecimal {
    const value = this.get("gOhmTotalSupply");
    return value!.toBigDecimal();
  }

  set gOhmTotalSupply(value: BigDecimal) {
    this.set("gOhmTotalSupply", Value.fromBigDecimal(value));
  }

  get marketCap(): BigDecimal | null {
    const value = this.get("marketCap");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigDecimal();
    }
  }

  set marketCap(value: BigDecimal | null) {
    if (!value) {
      this.unset("marketCap");
    } else {
      this.set("marketCap", Value.fromBigDecimal(<BigDecimal>value));
    }
  }

  get nextDistributedOhm(): BigDecimal {
    const value = this.get("nextDistributedOhm");
    return value!.toBigDecimal();
  }

  set nextDistributedOhm(value: BigDecimal) {
    this.set("nextDistributedOhm", Value.fromBigDecimal(value));
  }

  get nextEpochRebase(): BigDecimal {
    const value = this.get("nextEpochRebase");
    return value!.toBigDecimal();
  }

  set nextEpochRebase(value: BigDecimal) {
    this.set("nextEpochRebase", Value.fromBigDecimal(value));
  }

  get ohmCirculatingSupply(): BigDecimal | null {
    const value = this.get("ohmCirculatingSupply");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigDecimal();
    }
  }

  set ohmCirculatingSupply(value: BigDecimal | null) {
    if (!value) {
      this.unset("ohmCirculatingSupply");
    } else {
      this.set("ohmCirculatingSupply", Value.fromBigDecimal(<BigDecimal>value));
    }
  }

  get ohmFloatingSupply(): BigDecimal | null {
    const value = this.get("ohmFloatingSupply");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigDecimal();
    }
  }

  set ohmFloatingSupply(value: BigDecimal | null) {
    if (!value) {
      this.unset("ohmFloatingSupply");
    } else {
      this.set("ohmFloatingSupply", Value.fromBigDecimal(<BigDecimal>value));
    }
  }

  get ohmPrice(): BigDecimal {
    const value = this.get("ohmPrice");
    return value!.toBigDecimal();
  }

  set ohmPrice(value: BigDecimal) {
    this.set("ohmPrice", Value.fromBigDecimal(value));
  }

  get ohmTotalSupply(): BigDecimal {
    const value = this.get("ohmTotalSupply");
    return value!.toBigDecimal();
  }

  set ohmTotalSupply(value: BigDecimal) {
    this.set("ohmTotalSupply", Value.fromBigDecimal(value));
  }

  get sOhmCirculatingSupply(): BigDecimal {
    const value = this.get("sOhmCirculatingSupply");
    return value!.toBigDecimal();
  }

  set sOhmCirculatingSupply(value: BigDecimal) {
    this.set("sOhmCirculatingSupply", Value.fromBigDecimal(value));
  }

  get timestamp(): BigInt {
    const value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get totalValueLocked(): BigDecimal {
    const value = this.get("totalValueLocked");
    return value!.toBigDecimal();
  }

  set totalValueLocked(value: BigDecimal) {
    this.set("totalValueLocked", Value.fromBigDecimal(value));
  }

  get treasuryLiquidBacking(): BigDecimal | null {
    const value = this.get("treasuryLiquidBacking");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigDecimal();
    }
  }

  set treasuryLiquidBacking(value: BigDecimal | null) {
    if (!value) {
      this.unset("treasuryLiquidBacking");
    } else {
      this.set(
        "treasuryLiquidBacking",
        Value.fromBigDecimal(<BigDecimal>value)
      );
    }
  }

  get treasuryLiquidBackingPerGOhmSynthetic(): BigDecimal | null {
    const value = this.get("treasuryLiquidBackingPerGOhmSynthetic");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigDecimal();
    }
  }

  set treasuryLiquidBackingPerGOhmSynthetic(value: BigDecimal | null) {
    if (!value) {
      this.unset("treasuryLiquidBackingPerGOhmSynthetic");
    } else {
      this.set(
        "treasuryLiquidBackingPerGOhmSynthetic",
        Value.fromBigDecimal(<BigDecimal>value)
      );
    }
  }

  get treasuryLiquidBackingPerOhmFloating(): BigDecimal | null {
    const value = this.get("treasuryLiquidBackingPerOhmFloating");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigDecimal();
    }
  }

  set treasuryLiquidBackingPerOhmFloating(value: BigDecimal | null) {
    if (!value) {
      this.unset("treasuryLiquidBackingPerOhmFloating");
    } else {
      this.set(
        "treasuryLiquidBackingPerOhmFloating",
        Value.fromBigDecimal(<BigDecimal>value)
      );
    }
  }

  get treasuryMarketValue(): BigDecimal | null {
    const value = this.get("treasuryMarketValue");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigDecimal();
    }
  }

  set treasuryMarketValue(value: BigDecimal | null) {
    if (!value) {
      this.unset("treasuryMarketValue");
    } else {
      this.set("treasuryMarketValue", Value.fromBigDecimal(<BigDecimal>value));
    }
  }
}

export class BondDiscount extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    const id = this.get("id");
    assert(id != null, "Cannot save BondDiscount entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type BondDiscount must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("BondDiscount", id.toString(), this);
    }
  }

  static load(id: string): BondDiscount | null {
    return changetype<BondDiscount | null>(store.get("BondDiscount", id));
  }

  get id(): string {
    const value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timestamp(): BigInt {
    const value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get dai_discount(): BigDecimal {
    const value = this.get("dai_discount");
    return value!.toBigDecimal();
  }

  set dai_discount(value: BigDecimal) {
    this.set("dai_discount", Value.fromBigDecimal(value));
  }

  get ohmdai_discount(): BigDecimal {
    const value = this.get("ohmdai_discount");
    return value!.toBigDecimal();
  }

  set ohmdai_discount(value: BigDecimal) {
    this.set("ohmdai_discount", Value.fromBigDecimal(value));
  }

  get frax_discount(): BigDecimal {
    const value = this.get("frax_discount");
    return value!.toBigDecimal();
  }

  set frax_discount(value: BigDecimal) {
    this.set("frax_discount", Value.fromBigDecimal(value));
  }

  get ohmfrax_discount(): BigDecimal {
    const value = this.get("ohmfrax_discount");
    return value!.toBigDecimal();
  }

  set ohmfrax_discount(value: BigDecimal) {
    this.set("ohmfrax_discount", Value.fromBigDecimal(value));
  }

  get eth_discount(): BigDecimal {
    const value = this.get("eth_discount");
    return value!.toBigDecimal();
  }

  set eth_discount(value: BigDecimal) {
    this.set("eth_discount", Value.fromBigDecimal(value));
  }

  get lusd_discount(): BigDecimal {
    const value = this.get("lusd_discount");
    return value!.toBigDecimal();
  }

  set lusd_discount(value: BigDecimal) {
    this.set("lusd_discount", Value.fromBigDecimal(value));
  }

  get ohmlusd_discount(): BigDecimal {
    const value = this.get("ohmlusd_discount");
    return value!.toBigDecimal();
  }

  set ohmlusd_discount(value: BigDecimal) {
    this.set("ohmlusd_discount", Value.fromBigDecimal(value));
  }
}

export class TokenRecord extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    const id = this.get("id");
    assert(id != null, "Cannot save TokenRecord entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type TokenRecord must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("TokenRecord", id.toString(), this);
    }
  }

  static load(id: string): TokenRecord | null {
    return changetype<TokenRecord | null>(store.get("TokenRecord", id));
  }

  get id(): string {
    const value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get block(): BigInt {
    const value = this.get("block");
    return value!.toBigInt();
  }

  set block(value: BigInt) {
    this.set("block", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    const value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get date(): string {
    const value = this.get("date");
    return value!.toString();
  }

  set date(value: string) {
    this.set("date", Value.fromString(value));
  }

  get token(): string {
    const value = this.get("token");
    return value!.toString();
  }

  set token(value: string) {
    this.set("token", Value.fromString(value));
  }

  get tokenAddress(): string {
    const value = this.get("tokenAddress");
    return value!.toString();
  }

  set tokenAddress(value: string) {
    this.set("tokenAddress", Value.fromString(value));
  }

  get source(): string {
    const value = this.get("source");
    return value!.toString();
  }

  set source(value: string) {
    this.set("source", Value.fromString(value));
  }

  get sourceAddress(): string {
    const value = this.get("sourceAddress");
    return value!.toString();
  }

  set sourceAddress(value: string) {
    this.set("sourceAddress", Value.fromString(value));
  }

  get rate(): BigDecimal {
    const value = this.get("rate");
    return value!.toBigDecimal();
  }

  set rate(value: BigDecimal) {
    this.set("rate", Value.fromBigDecimal(value));
  }

  get balance(): BigDecimal {
    const value = this.get("balance");
    return value!.toBigDecimal();
  }

  set balance(value: BigDecimal) {
    this.set("balance", Value.fromBigDecimal(value));
  }

  get multiplier(): BigDecimal {
    const value = this.get("multiplier");
    return value!.toBigDecimal();
  }

  set multiplier(value: BigDecimal) {
    this.set("multiplier", Value.fromBigDecimal(value));
  }

  get value(): BigDecimal {
    const value = this.get("value");
    return value!.toBigDecimal();
  }

  set value(value: BigDecimal) {
    this.set("value", Value.fromBigDecimal(value));
  }

  get valueExcludingOhm(): BigDecimal {
    const value = this.get("valueExcludingOhm");
    return value!.toBigDecimal();
  }

  set valueExcludingOhm(value: BigDecimal) {
    this.set("valueExcludingOhm", Value.fromBigDecimal(value));
  }

  get category(): string {
    const value = this.get("category");
    return value!.toString();
  }

  set category(value: string) {
    this.set("category", Value.fromString(value));
  }

  get isLiquid(): boolean {
    const value = this.get("isLiquid");
    return value!.toBoolean();
  }

  set isLiquid(value: boolean) {
    this.set("isLiquid", Value.fromBoolean(value));
  }

  get isBluechip(): boolean {
    const value = this.get("isBluechip");
    return value!.toBoolean();
  }

  set isBluechip(value: boolean) {
    this.set("isBluechip", Value.fromBoolean(value));
  }

  get blockchain(): string {
    const value = this.get("blockchain");
    return value!.toString();
  }

  set blockchain(value: string) {
    this.set("blockchain", Value.fromString(value));
  }
}

export class TokenSupply extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    const id = this.get("id");
    assert(id != null, "Cannot save TokenSupply entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type TokenSupply must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("TokenSupply", id.toString(), this);
    }
  }

  static load(id: string): TokenSupply | null {
    return changetype<TokenSupply | null>(store.get("TokenSupply", id));
  }

  get id(): string {
    const value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get block(): BigInt {
    const value = this.get("block");
    return value!.toBigInt();
  }

  set block(value: BigInt) {
    this.set("block", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    const value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get date(): string {
    const value = this.get("date");
    return value!.toString();
  }

  set date(value: string) {
    this.set("date", Value.fromString(value));
  }

  get token(): string {
    const value = this.get("token");
    return value!.toString();
  }

  set token(value: string) {
    this.set("token", Value.fromString(value));
  }

  get tokenAddress(): string {
    const value = this.get("tokenAddress");
    return value!.toString();
  }

  set tokenAddress(value: string) {
    this.set("tokenAddress", Value.fromString(value));
  }

  get pool(): string | null {
    const value = this.get("pool");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set pool(value: string | null) {
    if (!value) {
      this.unset("pool");
    } else {
      this.set("pool", Value.fromString(<string>value));
    }
  }

  get poolAddress(): string | null {
    const value = this.get("poolAddress");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set poolAddress(value: string | null) {
    if (!value) {
      this.unset("poolAddress");
    } else {
      this.set("poolAddress", Value.fromString(<string>value));
    }
  }

  get source(): string | null {
    const value = this.get("source");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set source(value: string | null) {
    if (!value) {
      this.unset("source");
    } else {
      this.set("source", Value.fromString(<string>value));
    }
  }

  get sourceAddress(): string | null {
    const value = this.get("sourceAddress");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set sourceAddress(value: string | null) {
    if (!value) {
      this.unset("sourceAddress");
    } else {
      this.set("sourceAddress", Value.fromString(<string>value));
    }
  }

  get type(): string {
    const value = this.get("type");
    return value!.toString();
  }

  set type(value: string) {
    this.set("type", Value.fromString(value));
  }

  get balance(): BigDecimal {
    const value = this.get("balance");
    return value!.toBigDecimal();
  }

  set balance(value: BigDecimal) {
    this.set("balance", Value.fromBigDecimal(value));
  }

  get supplyBalance(): BigDecimal {
    const value = this.get("supplyBalance");
    return value!.toBigDecimal();
  }

  set supplyBalance(value: BigDecimal) {
    this.set("supplyBalance", Value.fromBigDecimal(value));
  }
}

export class PriceSnapshot extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    const id = this.get("id");
    assert(id != null, "Cannot save PriceSnapshot entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type PriceSnapshot must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("PriceSnapshot", id.toString(), this);
    }
  }

  static load(id: string): PriceSnapshot | null {
    return changetype<PriceSnapshot | null>(store.get("PriceSnapshot", id));
  }

  get id(): string {
    const value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get block(): BigInt {
    const value = this.get("block");
    return value!.toBigInt();
  }

  set block(value: BigInt) {
    this.set("block", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    const value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get date(): string {
    const value = this.get("date");
    return value!.toString();
  }

  set date(value: string) {
    this.set("date", Value.fromString(value));
  }

  get priceOhm(): BigDecimal {
    const value = this.get("priceOhm");
    return value!.toBigDecimal();
  }

  set priceOhm(value: BigDecimal) {
    this.set("priceOhm", Value.fromBigDecimal(value));
  }

  get priceGOhm(): BigDecimal {
    const value = this.get("priceGOhm");
    return value!.toBigDecimal();
  }

  set priceGOhm(value: BigDecimal) {
    this.set("priceGOhm", Value.fromBigDecimal(value));
  }
}

export class GnosisAuctionRoot extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    const id = this.get("id");
    assert(id != null, "Cannot save GnosisAuctionRoot entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type GnosisAuctionRoot must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("GnosisAuctionRoot", id.toString(), this);
    }
  }

  static load(id: string): GnosisAuctionRoot | null {
    return changetype<GnosisAuctionRoot | null>(
      store.get("GnosisAuctionRoot", id)
    );
  }

  get id(): string {
    const value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get markets(): Array<BigInt> {
    const value = this.get("markets");
    return value!.toBigIntArray();
  }

  set markets(value: Array<BigInt>) {
    this.set("markets", Value.fromBigIntArray(value));
  }
}

export class GnosisAuction extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    const id = this.get("id");
    assert(id != null, "Cannot save GnosisAuction entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type GnosisAuction must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("GnosisAuction", id.toString(), this);
    }
  }

  static load(id: string): GnosisAuction | null {
    return changetype<GnosisAuction | null>(store.get("GnosisAuction", id));
  }

  get id(): string {
    const value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get auctionOpenTimestamp(): BigInt {
    const value = this.get("auctionOpenTimestamp");
    return value!.toBigInt();
  }

  set auctionOpenTimestamp(value: BigInt) {
    this.set("auctionOpenTimestamp", Value.fromBigInt(value));
  }

  get payoutCapacity(): BigDecimal {
    const value = this.get("payoutCapacity");
    return value!.toBigDecimal();
  }

  set payoutCapacity(value: BigDecimal) {
    this.set("payoutCapacity", Value.fromBigDecimal(value));
  }

  get termSeconds(): BigInt {
    const value = this.get("termSeconds");
    return value!.toBigInt();
  }

  set termSeconds(value: BigInt) {
    this.set("termSeconds", Value.fromBigInt(value));
  }

  get bidQuantity(): BigDecimal | null {
    const value = this.get("bidQuantity");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigDecimal();
    }
  }

  set bidQuantity(value: BigDecimal | null) {
    if (!value) {
      this.unset("bidQuantity");
    } else {
      this.set("bidQuantity", Value.fromBigDecimal(<BigDecimal>value));
    }
  }

  get auctionCloseTimestamp(): BigInt | null {
    const value = this.get("auctionCloseTimestamp");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set auctionCloseTimestamp(value: BigInt | null) {
    if (!value) {
      this.unset("auctionCloseTimestamp");
    } else {
      this.set("auctionCloseTimestamp", Value.fromBigInt(<BigInt>value));
    }
  }
}

export class ERC20TokenSnapshot extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    const id = this.get("id");
    assert(id != null, "Cannot save ERC20TokenSnapshot entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type ERC20TokenSnapshot must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("ERC20TokenSnapshot", id.toString(), this);
    }
  }

  static load(id: string): ERC20TokenSnapshot | null {
    return changetype<ERC20TokenSnapshot | null>(
      store.get("ERC20TokenSnapshot", id)
    );
  }

  get id(): string {
    const value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get address(): Bytes {
    const value = this.get("address");
    return value!.toBytes();
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
  }

  get decimals(): i32 {
    const value = this.get("decimals");
    return value!.toI32();
  }

  set decimals(value: i32) {
    this.set("decimals", Value.fromI32(value));
  }

  get totalSupply(): BigDecimal {
    const value = this.get("totalSupply");
    return value!.toBigDecimal();
  }

  set totalSupply(value: BigDecimal) {
    this.set("totalSupply", Value.fromBigDecimal(value));
  }
}

export class ConvexRewardPoolSnapshot extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    const id = this.get("id");
    assert(
      id != null,
      "Cannot save ConvexRewardPoolSnapshot entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type ConvexRewardPoolSnapshot must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("ConvexRewardPoolSnapshot", id.toString(), this);
    }
  }

  static load(id: string): ConvexRewardPoolSnapshot | null {
    return changetype<ConvexRewardPoolSnapshot | null>(
      store.get("ConvexRewardPoolSnapshot", id)
    );
  }

  get id(): string {
    const value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get block(): BigInt {
    const value = this.get("block");
    return value!.toBigInt();
  }

  set block(value: BigInt) {
    this.set("block", Value.fromBigInt(value));
  }

  get address(): Bytes {
    const value = this.get("address");
    return value!.toBytes();
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
  }

  get stakingToken(): Bytes {
    const value = this.get("stakingToken");
    return value!.toBytes();
  }

  set stakingToken(value: Bytes) {
    this.set("stakingToken", Value.fromBytes(value));
  }
}

export class BalancerPoolSnapshot extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    const id = this.get("id");
    assert(id != null, "Cannot save BalancerPoolSnapshot entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type BalancerPoolSnapshot must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("BalancerPoolSnapshot", id.toString(), this);
    }
  }

  static load(id: string): BalancerPoolSnapshot | null {
    return changetype<BalancerPoolSnapshot | null>(
      store.get("BalancerPoolSnapshot", id)
    );
  }

  get id(): string {
    const value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get block(): BigInt {
    const value = this.get("block");
    return value!.toBigInt();
  }

  set block(value: BigInt) {
    this.set("block", Value.fromBigInt(value));
  }

  get pool(): Bytes {
    const value = this.get("pool");
    return value!.toBytes();
  }

  set pool(value: Bytes) {
    this.set("pool", Value.fromBytes(value));
  }

  get poolToken(): Bytes {
    const value = this.get("poolToken");
    return value!.toBytes();
  }

  set poolToken(value: Bytes) {
    this.set("poolToken", Value.fromBytes(value));
  }

  get decimals(): i32 {
    const value = this.get("decimals");
    return value!.toI32();
  }

  set decimals(value: i32) {
    this.set("decimals", Value.fromI32(value));
  }

  get totalSupply(): BigDecimal {
    const value = this.get("totalSupply");
    return value!.toBigDecimal();
  }

  set totalSupply(value: BigDecimal) {
    this.set("totalSupply", Value.fromBigDecimal(value));
  }

  get tokens(): Array<Bytes> {
    const value = this.get("tokens");
    return value!.toBytesArray();
  }

  set tokens(value: Array<Bytes>) {
    this.set("tokens", Value.fromBytesArray(value));
  }

  get balances(): Array<BigDecimal> {
    const value = this.get("balances");
    return value!.toBigDecimalArray();
  }

  set balances(value: Array<BigDecimal>) {
    this.set("balances", Value.fromBigDecimalArray(value));
  }

  get weights(): Array<BigDecimal> {
    const value = this.get("weights");
    return value!.toBigDecimalArray();
  }

  set weights(value: Array<BigDecimal>) {
    this.set("weights", Value.fromBigDecimalArray(value));
  }
}

export class UniswapV2PoolSnapshot extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    const id = this.get("id");
    assert(
      id != null,
      "Cannot save UniswapV2PoolSnapshot entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type UniswapV2PoolSnapshot must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("UniswapV2PoolSnapshot", id.toString(), this);
    }
  }

  static load(id: string): UniswapV2PoolSnapshot | null {
    return changetype<UniswapV2PoolSnapshot | null>(
      store.get("UniswapV2PoolSnapshot", id)
    );
  }

  get id(): string {
    const value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get block(): BigInt {
    const value = this.get("block");
    return value!.toBigInt();
  }

  set block(value: BigInt) {
    this.set("block", Value.fromBigInt(value));
  }

  get poolToken(): Bytes {
    const value = this.get("poolToken");
    return value!.toBytes();
  }

  set poolToken(value: Bytes) {
    this.set("poolToken", Value.fromBytes(value));
  }

  get decimals(): i32 {
    const value = this.get("decimals");
    return value!.toI32();
  }

  set decimals(value: i32) {
    this.set("decimals", Value.fromI32(value));
  }

  get totalSupply(): BigDecimal {
    const value = this.get("totalSupply");
    return value!.toBigDecimal();
  }

  set totalSupply(value: BigDecimal) {
    this.set("totalSupply", Value.fromBigDecimal(value));
  }

  get tokens(): Array<Bytes> {
    const value = this.get("tokens");
    return value!.toBytesArray();
  }

  set tokens(value: Array<Bytes>) {
    this.set("tokens", Value.fromBytesArray(value));
  }

  get balances(): Array<BigDecimal> {
    const value = this.get("balances");
    return value!.toBigDecimalArray();
  }

  set balances(value: Array<BigDecimal>) {
    this.set("balances", Value.fromBigDecimalArray(value));
  }
}
