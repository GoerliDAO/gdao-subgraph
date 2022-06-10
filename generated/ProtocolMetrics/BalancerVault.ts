// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class AuthorizerChanged extends ethereum.Event {
  get params(): AuthorizerChanged__Params {
    return new AuthorizerChanged__Params(this);
  }
}

export class AuthorizerChanged__Params {
  _event: AuthorizerChanged;

  constructor(event: AuthorizerChanged) {
    this._event = event;
  }

  get newAuthorizer(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class ExternalBalanceTransfer extends ethereum.Event {
  get params(): ExternalBalanceTransfer__Params {
    return new ExternalBalanceTransfer__Params(this);
  }
}

export class ExternalBalanceTransfer__Params {
  _event: ExternalBalanceTransfer;

  constructor(event: ExternalBalanceTransfer) {
    this._event = event;
  }

  get token(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get sender(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get recipient(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class FlashLoan extends ethereum.Event {
  get params(): FlashLoan__Params {
    return new FlashLoan__Params(this);
  }
}

export class FlashLoan__Params {
  _event: FlashLoan;

  constructor(event: FlashLoan) {
    this._event = event;
  }

  get recipient(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get token(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get feeAmount(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class InternalBalanceChanged extends ethereum.Event {
  get params(): InternalBalanceChanged__Params {
    return new InternalBalanceChanged__Params(this);
  }
}

export class InternalBalanceChanged__Params {
  _event: InternalBalanceChanged;

  constructor(event: InternalBalanceChanged) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get token(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get delta(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class PausedStateChanged extends ethereum.Event {
  get params(): PausedStateChanged__Params {
    return new PausedStateChanged__Params(this);
  }
}

export class PausedStateChanged__Params {
  _event: PausedStateChanged;

  constructor(event: PausedStateChanged) {
    this._event = event;
  }

  get paused(): boolean {
    return this._event.parameters[0].value.toBoolean();
  }
}

export class PoolBalanceChanged extends ethereum.Event {
  get params(): PoolBalanceChanged__Params {
    return new PoolBalanceChanged__Params(this);
  }
}

export class PoolBalanceChanged__Params {
  _event: PoolBalanceChanged;

  constructor(event: PoolBalanceChanged) {
    this._event = event;
  }

  get poolId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get liquidityProvider(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokens(): Array<Address> {
    return this._event.parameters[2].value.toAddressArray();
  }

  get deltas(): Array<BigInt> {
    return this._event.parameters[3].value.toBigIntArray();
  }

  get protocolFeeAmounts(): Array<BigInt> {
    return this._event.parameters[4].value.toBigIntArray();
  }
}

export class PoolBalanceManaged extends ethereum.Event {
  get params(): PoolBalanceManaged__Params {
    return new PoolBalanceManaged__Params(this);
  }
}

export class PoolBalanceManaged__Params {
  _event: PoolBalanceManaged;

  constructor(event: PoolBalanceManaged) {
    this._event = event;
  }

  get poolId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get assetManager(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get token(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get cashDelta(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get managedDelta(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class PoolRegistered extends ethereum.Event {
  get params(): PoolRegistered__Params {
    return new PoolRegistered__Params(this);
  }
}

export class PoolRegistered__Params {
  _event: PoolRegistered;

  constructor(event: PoolRegistered) {
    this._event = event;
  }

  get poolId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get poolAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get specialization(): i32 {
    return this._event.parameters[2].value.toI32();
  }
}

export class RelayerApprovalChanged extends ethereum.Event {
  get params(): RelayerApprovalChanged__Params {
    return new RelayerApprovalChanged__Params(this);
  }
}

export class RelayerApprovalChanged__Params {
  _event: RelayerApprovalChanged;

  constructor(event: RelayerApprovalChanged) {
    this._event = event;
  }

  get relayer(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get sender(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get approved(): boolean {
    return this._event.parameters[2].value.toBoolean();
  }
}

export class Swap extends ethereum.Event {
  get params(): Swap__Params {
    return new Swap__Params(this);
  }
}

export class Swap__Params {
  _event: Swap;

  constructor(event: Swap) {
    this._event = event;
  }

  get poolId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get tokenIn(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenOut(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get amountIn(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get amountOut(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class TokensDeregistered extends ethereum.Event {
  get params(): TokensDeregistered__Params {
    return new TokensDeregistered__Params(this);
  }
}

export class TokensDeregistered__Params {
  _event: TokensDeregistered;

  constructor(event: TokensDeregistered) {
    this._event = event;
  }

  get poolId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get tokens(): Array<Address> {
    return this._event.parameters[1].value.toAddressArray();
  }
}

export class TokensRegistered extends ethereum.Event {
  get params(): TokensRegistered__Params {
    return new TokensRegistered__Params(this);
  }
}

export class TokensRegistered__Params {
  _event: TokensRegistered;

  constructor(event: TokensRegistered) {
    this._event = event;
  }

  get poolId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get tokens(): Array<Address> {
    return this._event.parameters[1].value.toAddressArray();
  }

  get assetManagers(): Array<Address> {
    return this._event.parameters[2].value.toAddressArray();
  }
}

export class BalancerVault__getPausedStateResult {
  value0: boolean;
  value1: BigInt;
  value2: BigInt;

  constructor(value0: boolean, value1: BigInt, value2: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromBoolean(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    return map;
  }

  getPaused(): boolean {
    return this.value0;
  }

  getPauseWindowEndTime(): BigInt {
    return this.value1;
  }

  getBufferPeriodEndTime(): BigInt {
    return this.value2;
  }
}

export class BalancerVault__getPoolResult {
  value0: Address;
  value1: i32;

  constructor(value0: Address, value1: i32) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddress(this.value0));
    map.set(
      "value1",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(this.value1))
    );
    return map;
  }

  getValue0(): Address {
    return this.value0;
  }

  getValue1(): i32 {
    return this.value1;
  }
}

export class BalancerVault__getPoolTokenInfoResult {
  value0: BigInt;
  value1: BigInt;
  value2: BigInt;
  value3: Address;

  constructor(value0: BigInt, value1: BigInt, value2: BigInt, value3: Address) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromAddress(this.value3));
    return map;
  }

  getCash(): BigInt {
    return this.value0;
  }

  getManaged(): BigInt {
    return this.value1;
  }

  getLastChangeBlock(): BigInt {
    return this.value2;
  }

  getAssetManager(): Address {
    return this.value3;
  }
}

export class BalancerVault__getPoolTokensResult {
  value0: Array<Address>;
  value1: Array<BigInt>;
  value2: BigInt;

  constructor(value0: Array<Address>, value1: Array<BigInt>, value2: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddressArray(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigIntArray(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    return map;
  }

  getTokens(): Array<Address> {
    return this.value0;
  }

  getBalances(): Array<BigInt> {
    return this.value1;
  }

  getLastChangeBlock(): BigInt {
    return this.value2;
  }
}

export class BalancerVault__queryBatchSwapInputSwapsStruct extends ethereum.Tuple {
  get poolId(): Bytes {
    return this[0].toBytes();
  }

  get assetInIndex(): BigInt {
    return this[1].toBigInt();
  }

  get assetOutIndex(): BigInt {
    return this[2].toBigInt();
  }

  get amount(): BigInt {
    return this[3].toBigInt();
  }

  get userData(): Bytes {
    return this[4].toBytes();
  }
}

export class BalancerVault__queryBatchSwapInputFundsStruct extends ethereum.Tuple {
  get sender(): Address {
    return this[0].toAddress();
  }

  get fromInternalBalance(): boolean {
    return this[1].toBoolean();
  }

  get recipient(): Address {
    return this[2].toAddress();
  }

  get toInternalBalance(): boolean {
    return this[3].toBoolean();
  }
}

export class BalancerVault extends ethereum.SmartContract {
  static bind(address: Address): BalancerVault {
    return new BalancerVault("BalancerVault", address);
  }

  WETH(): Address {
    let result = super.call("WETH", "WETH():(address)", []);

    return result[0].toAddress();
  }

  try_WETH(): ethereum.CallResult<Address> {
    let result = super.tryCall("WETH", "WETH():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getActionId(selector: Bytes): Bytes {
    let result = super.call("getActionId", "getActionId(bytes4):(bytes32)", [
      ethereum.Value.fromFixedBytes(selector)
    ]);

    return result[0].toBytes();
  }

  try_getActionId(selector: Bytes): ethereum.CallResult<Bytes> {
    let result = super.tryCall("getActionId", "getActionId(bytes4):(bytes32)", [
      ethereum.Value.fromFixedBytes(selector)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  getAuthorizer(): Address {
    let result = super.call("getAuthorizer", "getAuthorizer():(address)", []);

    return result[0].toAddress();
  }

  try_getAuthorizer(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getAuthorizer",
      "getAuthorizer():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getDomainSeparator(): Bytes {
    let result = super.call(
      "getDomainSeparator",
      "getDomainSeparator():(bytes32)",
      []
    );

    return result[0].toBytes();
  }

  try_getDomainSeparator(): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "getDomainSeparator",
      "getDomainSeparator():(bytes32)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  getInternalBalance(user: Address, tokens: Array<Address>): Array<BigInt> {
    let result = super.call(
      "getInternalBalance",
      "getInternalBalance(address,address[]):(uint256[])",
      [
        ethereum.Value.fromAddress(user),
        ethereum.Value.fromAddressArray(tokens)
      ]
    );

    return result[0].toBigIntArray();
  }

  try_getInternalBalance(
    user: Address,
    tokens: Array<Address>
  ): ethereum.CallResult<Array<BigInt>> {
    let result = super.tryCall(
      "getInternalBalance",
      "getInternalBalance(address,address[]):(uint256[])",
      [
        ethereum.Value.fromAddress(user),
        ethereum.Value.fromAddressArray(tokens)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigIntArray());
  }

  getNextNonce(user: Address): BigInt {
    let result = super.call("getNextNonce", "getNextNonce(address):(uint256)", [
      ethereum.Value.fromAddress(user)
    ]);

    return result[0].toBigInt();
  }

  try_getNextNonce(user: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getNextNonce",
      "getNextNonce(address):(uint256)",
      [ethereum.Value.fromAddress(user)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getPausedState(): BalancerVault__getPausedStateResult {
    let result = super.call(
      "getPausedState",
      "getPausedState():(bool,uint256,uint256)",
      []
    );

    return new BalancerVault__getPausedStateResult(
      result[0].toBoolean(),
      result[1].toBigInt(),
      result[2].toBigInt()
    );
  }

  try_getPausedState(): ethereum.CallResult<
    BalancerVault__getPausedStateResult
  > {
    let result = super.tryCall(
      "getPausedState",
      "getPausedState():(bool,uint256,uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new BalancerVault__getPausedStateResult(
        value[0].toBoolean(),
        value[1].toBigInt(),
        value[2].toBigInt()
      )
    );
  }

  getPool(poolId: Bytes): BalancerVault__getPoolResult {
    let result = super.call("getPool", "getPool(bytes32):(address,uint8)", [
      ethereum.Value.fromFixedBytes(poolId)
    ]);

    return new BalancerVault__getPoolResult(
      result[0].toAddress(),
      result[1].toI32()
    );
  }

  try_getPool(
    poolId: Bytes
  ): ethereum.CallResult<BalancerVault__getPoolResult> {
    let result = super.tryCall("getPool", "getPool(bytes32):(address,uint8)", [
      ethereum.Value.fromFixedBytes(poolId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new BalancerVault__getPoolResult(value[0].toAddress(), value[1].toI32())
    );
  }

  getPoolTokenInfo(
    poolId: Bytes,
    token: Address
  ): BalancerVault__getPoolTokenInfoResult {
    let result = super.call(
      "getPoolTokenInfo",
      "getPoolTokenInfo(bytes32,address):(uint256,uint256,uint256,address)",
      [ethereum.Value.fromFixedBytes(poolId), ethereum.Value.fromAddress(token)]
    );

    return new BalancerVault__getPoolTokenInfoResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toBigInt(),
      result[3].toAddress()
    );
  }

  try_getPoolTokenInfo(
    poolId: Bytes,
    token: Address
  ): ethereum.CallResult<BalancerVault__getPoolTokenInfoResult> {
    let result = super.tryCall(
      "getPoolTokenInfo",
      "getPoolTokenInfo(bytes32,address):(uint256,uint256,uint256,address)",
      [ethereum.Value.fromFixedBytes(poolId), ethereum.Value.fromAddress(token)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new BalancerVault__getPoolTokenInfoResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toBigInt(),
        value[3].toAddress()
      )
    );
  }

  getPoolTokens(poolId: Bytes): BalancerVault__getPoolTokensResult {
    let result = super.call(
      "getPoolTokens",
      "getPoolTokens(bytes32):(address[],uint256[],uint256)",
      [ethereum.Value.fromFixedBytes(poolId)]
    );

    return new BalancerVault__getPoolTokensResult(
      result[0].toAddressArray(),
      result[1].toBigIntArray(),
      result[2].toBigInt()
    );
  }

  try_getPoolTokens(
    poolId: Bytes
  ): ethereum.CallResult<BalancerVault__getPoolTokensResult> {
    let result = super.tryCall(
      "getPoolTokens",
      "getPoolTokens(bytes32):(address[],uint256[],uint256)",
      [ethereum.Value.fromFixedBytes(poolId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new BalancerVault__getPoolTokensResult(
        value[0].toAddressArray(),
        value[1].toBigIntArray(),
        value[2].toBigInt()
      )
    );
  }

  getProtocolFeesCollector(): Address {
    let result = super.call(
      "getProtocolFeesCollector",
      "getProtocolFeesCollector():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_getProtocolFeesCollector(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getProtocolFeesCollector",
      "getProtocolFeesCollector():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  hasApprovedRelayer(user: Address, relayer: Address): boolean {
    let result = super.call(
      "hasApprovedRelayer",
      "hasApprovedRelayer(address,address):(bool)",
      [ethereum.Value.fromAddress(user), ethereum.Value.fromAddress(relayer)]
    );

    return result[0].toBoolean();
  }

  try_hasApprovedRelayer(
    user: Address,
    relayer: Address
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "hasApprovedRelayer",
      "hasApprovedRelayer(address,address):(bool)",
      [ethereum.Value.fromAddress(user), ethereum.Value.fromAddress(relayer)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  queryBatchSwap(
    kind: i32,
    swaps: Array<BalancerVault__queryBatchSwapInputSwapsStruct>,
    assets: Array<Address>,
    funds: BalancerVault__queryBatchSwapInputFundsStruct
  ): Array<BigInt> {
    let result = super.call(
      "queryBatchSwap",
      "queryBatchSwap(uint8,(bytes32,uint256,uint256,uint256,bytes)[],address[],(address,bool,address,bool)):(int256[])",
      [
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(kind)),
        ethereum.Value.fromTupleArray(swaps),
        ethereum.Value.fromAddressArray(assets),
        ethereum.Value.fromTuple(funds)
      ]
    );

    return result[0].toBigIntArray();
  }

  try_queryBatchSwap(
    kind: i32,
    swaps: Array<BalancerVault__queryBatchSwapInputSwapsStruct>,
    assets: Array<Address>,
    funds: BalancerVault__queryBatchSwapInputFundsStruct
  ): ethereum.CallResult<Array<BigInt>> {
    let result = super.tryCall(
      "queryBatchSwap",
      "queryBatchSwap(uint8,(bytes32,uint256,uint256,uint256,bytes)[],address[],(address,bool,address,bool)):(int256[])",
      [
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(kind)),
        ethereum.Value.fromTupleArray(swaps),
        ethereum.Value.fromAddressArray(assets),
        ethereum.Value.fromTuple(funds)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigIntArray());
  }

  registerPool(specialization: i32): Bytes {
    let result = super.call("registerPool", "registerPool(uint8):(bytes32)", [
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(specialization))
    ]);

    return result[0].toBytes();
  }

  try_registerPool(specialization: i32): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "registerPool",
      "registerPool(uint8):(bytes32)",
      [ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(specialization))]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get authorizer(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get weth(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get pauseWindowDuration(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get bufferPeriodDuration(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class BatchSwapCall extends ethereum.Call {
  get inputs(): BatchSwapCall__Inputs {
    return new BatchSwapCall__Inputs(this);
  }

  get outputs(): BatchSwapCall__Outputs {
    return new BatchSwapCall__Outputs(this);
  }
}

export class BatchSwapCall__Inputs {
  _call: BatchSwapCall;

  constructor(call: BatchSwapCall) {
    this._call = call;
  }

  get kind(): i32 {
    return this._call.inputValues[0].value.toI32();
  }

  get swaps(): Array<BatchSwapCallSwapsStruct> {
    return this._call.inputValues[1].value.toTupleArray<
      BatchSwapCallSwapsStruct
    >();
  }

  get assets(): Array<Address> {
    return this._call.inputValues[2].value.toAddressArray();
  }

  get funds(): BatchSwapCallFundsStruct {
    return changetype<BatchSwapCallFundsStruct>(
      this._call.inputValues[3].value.toTuple()
    );
  }

  get limits(): Array<BigInt> {
    return this._call.inputValues[4].value.toBigIntArray();
  }

  get deadline(): BigInt {
    return this._call.inputValues[5].value.toBigInt();
  }
}

export class BatchSwapCall__Outputs {
  _call: BatchSwapCall;

  constructor(call: BatchSwapCall) {
    this._call = call;
  }

  get assetDeltas(): Array<BigInt> {
    return this._call.outputValues[0].value.toBigIntArray();
  }
}

export class BatchSwapCallSwapsStruct extends ethereum.Tuple {
  get poolId(): Bytes {
    return this[0].toBytes();
  }

  get assetInIndex(): BigInt {
    return this[1].toBigInt();
  }

  get assetOutIndex(): BigInt {
    return this[2].toBigInt();
  }

  get amount(): BigInt {
    return this[3].toBigInt();
  }

  get userData(): Bytes {
    return this[4].toBytes();
  }
}

export class BatchSwapCallFundsStruct extends ethereum.Tuple {
  get sender(): Address {
    return this[0].toAddress();
  }

  get fromInternalBalance(): boolean {
    return this[1].toBoolean();
  }

  get recipient(): Address {
    return this[2].toAddress();
  }

  get toInternalBalance(): boolean {
    return this[3].toBoolean();
  }
}

export class DeregisterTokensCall extends ethereum.Call {
  get inputs(): DeregisterTokensCall__Inputs {
    return new DeregisterTokensCall__Inputs(this);
  }

  get outputs(): DeregisterTokensCall__Outputs {
    return new DeregisterTokensCall__Outputs(this);
  }
}

export class DeregisterTokensCall__Inputs {
  _call: DeregisterTokensCall;

  constructor(call: DeregisterTokensCall) {
    this._call = call;
  }

  get poolId(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get tokens(): Array<Address> {
    return this._call.inputValues[1].value.toAddressArray();
  }
}

export class DeregisterTokensCall__Outputs {
  _call: DeregisterTokensCall;

  constructor(call: DeregisterTokensCall) {
    this._call = call;
  }
}

export class ExitPoolCall extends ethereum.Call {
  get inputs(): ExitPoolCall__Inputs {
    return new ExitPoolCall__Inputs(this);
  }

  get outputs(): ExitPoolCall__Outputs {
    return new ExitPoolCall__Outputs(this);
  }
}

export class ExitPoolCall__Inputs {
  _call: ExitPoolCall;

  constructor(call: ExitPoolCall) {
    this._call = call;
  }

  get poolId(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get sender(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get recipient(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get request(): ExitPoolCallRequestStruct {
    return changetype<ExitPoolCallRequestStruct>(
      this._call.inputValues[3].value.toTuple()
    );
  }
}

export class ExitPoolCall__Outputs {
  _call: ExitPoolCall;

  constructor(call: ExitPoolCall) {
    this._call = call;
  }
}

export class ExitPoolCallRequestStruct extends ethereum.Tuple {
  get assets(): Array<Address> {
    return this[0].toAddressArray();
  }

  get minAmountsOut(): Array<BigInt> {
    return this[1].toBigIntArray();
  }

  get userData(): Bytes {
    return this[2].toBytes();
  }

  get toInternalBalance(): boolean {
    return this[3].toBoolean();
  }
}

export class FlashLoanCall extends ethereum.Call {
  get inputs(): FlashLoanCall__Inputs {
    return new FlashLoanCall__Inputs(this);
  }

  get outputs(): FlashLoanCall__Outputs {
    return new FlashLoanCall__Outputs(this);
  }
}

export class FlashLoanCall__Inputs {
  _call: FlashLoanCall;

  constructor(call: FlashLoanCall) {
    this._call = call;
  }

  get recipient(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get tokens(): Array<Address> {
    return this._call.inputValues[1].value.toAddressArray();
  }

  get amounts(): Array<BigInt> {
    return this._call.inputValues[2].value.toBigIntArray();
  }

  get userData(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }
}

export class FlashLoanCall__Outputs {
  _call: FlashLoanCall;

  constructor(call: FlashLoanCall) {
    this._call = call;
  }
}

export class JoinPoolCall extends ethereum.Call {
  get inputs(): JoinPoolCall__Inputs {
    return new JoinPoolCall__Inputs(this);
  }

  get outputs(): JoinPoolCall__Outputs {
    return new JoinPoolCall__Outputs(this);
  }
}

export class JoinPoolCall__Inputs {
  _call: JoinPoolCall;

  constructor(call: JoinPoolCall) {
    this._call = call;
  }

  get poolId(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get sender(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get recipient(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get request(): JoinPoolCallRequestStruct {
    return changetype<JoinPoolCallRequestStruct>(
      this._call.inputValues[3].value.toTuple()
    );
  }
}

export class JoinPoolCall__Outputs {
  _call: JoinPoolCall;

  constructor(call: JoinPoolCall) {
    this._call = call;
  }
}

export class JoinPoolCallRequestStruct extends ethereum.Tuple {
  get assets(): Array<Address> {
    return this[0].toAddressArray();
  }

  get maxAmountsIn(): Array<BigInt> {
    return this[1].toBigIntArray();
  }

  get userData(): Bytes {
    return this[2].toBytes();
  }

  get fromInternalBalance(): boolean {
    return this[3].toBoolean();
  }
}

export class ManagePoolBalanceCall extends ethereum.Call {
  get inputs(): ManagePoolBalanceCall__Inputs {
    return new ManagePoolBalanceCall__Inputs(this);
  }

  get outputs(): ManagePoolBalanceCall__Outputs {
    return new ManagePoolBalanceCall__Outputs(this);
  }
}

export class ManagePoolBalanceCall__Inputs {
  _call: ManagePoolBalanceCall;

  constructor(call: ManagePoolBalanceCall) {
    this._call = call;
  }

  get ops(): Array<ManagePoolBalanceCallOpsStruct> {
    return this._call.inputValues[0].value.toTupleArray<
      ManagePoolBalanceCallOpsStruct
    >();
  }
}

export class ManagePoolBalanceCall__Outputs {
  _call: ManagePoolBalanceCall;

  constructor(call: ManagePoolBalanceCall) {
    this._call = call;
  }
}

export class ManagePoolBalanceCallOpsStruct extends ethereum.Tuple {
  get kind(): i32 {
    return this[0].toI32();
  }

  get poolId(): Bytes {
    return this[1].toBytes();
  }

  get token(): Address {
    return this[2].toAddress();
  }

  get amount(): BigInt {
    return this[3].toBigInt();
  }
}

export class ManageUserBalanceCall extends ethereum.Call {
  get inputs(): ManageUserBalanceCall__Inputs {
    return new ManageUserBalanceCall__Inputs(this);
  }

  get outputs(): ManageUserBalanceCall__Outputs {
    return new ManageUserBalanceCall__Outputs(this);
  }
}

export class ManageUserBalanceCall__Inputs {
  _call: ManageUserBalanceCall;

  constructor(call: ManageUserBalanceCall) {
    this._call = call;
  }

  get ops(): Array<ManageUserBalanceCallOpsStruct> {
    return this._call.inputValues[0].value.toTupleArray<
      ManageUserBalanceCallOpsStruct
    >();
  }
}

export class ManageUserBalanceCall__Outputs {
  _call: ManageUserBalanceCall;

  constructor(call: ManageUserBalanceCall) {
    this._call = call;
  }
}

export class ManageUserBalanceCallOpsStruct extends ethereum.Tuple {
  get kind(): i32 {
    return this[0].toI32();
  }

  get asset(): Address {
    return this[1].toAddress();
  }

  get amount(): BigInt {
    return this[2].toBigInt();
  }

  get sender(): Address {
    return this[3].toAddress();
  }

  get recipient(): Address {
    return this[4].toAddress();
  }
}

export class QueryBatchSwapCall extends ethereum.Call {
  get inputs(): QueryBatchSwapCall__Inputs {
    return new QueryBatchSwapCall__Inputs(this);
  }

  get outputs(): QueryBatchSwapCall__Outputs {
    return new QueryBatchSwapCall__Outputs(this);
  }
}

export class QueryBatchSwapCall__Inputs {
  _call: QueryBatchSwapCall;

  constructor(call: QueryBatchSwapCall) {
    this._call = call;
  }

  get kind(): i32 {
    return this._call.inputValues[0].value.toI32();
  }

  get swaps(): Array<QueryBatchSwapCallSwapsStruct> {
    return this._call.inputValues[1].value.toTupleArray<
      QueryBatchSwapCallSwapsStruct
    >();
  }

  get assets(): Array<Address> {
    return this._call.inputValues[2].value.toAddressArray();
  }

  get funds(): QueryBatchSwapCallFundsStruct {
    return changetype<QueryBatchSwapCallFundsStruct>(
      this._call.inputValues[3].value.toTuple()
    );
  }
}

export class QueryBatchSwapCall__Outputs {
  _call: QueryBatchSwapCall;

  constructor(call: QueryBatchSwapCall) {
    this._call = call;
  }

  get value0(): Array<BigInt> {
    return this._call.outputValues[0].value.toBigIntArray();
  }
}

export class QueryBatchSwapCallSwapsStruct extends ethereum.Tuple {
  get poolId(): Bytes {
    return this[0].toBytes();
  }

  get assetInIndex(): BigInt {
    return this[1].toBigInt();
  }

  get assetOutIndex(): BigInt {
    return this[2].toBigInt();
  }

  get amount(): BigInt {
    return this[3].toBigInt();
  }

  get userData(): Bytes {
    return this[4].toBytes();
  }
}

export class QueryBatchSwapCallFundsStruct extends ethereum.Tuple {
  get sender(): Address {
    return this[0].toAddress();
  }

  get fromInternalBalance(): boolean {
    return this[1].toBoolean();
  }

  get recipient(): Address {
    return this[2].toAddress();
  }

  get toInternalBalance(): boolean {
    return this[3].toBoolean();
  }
}

export class RegisterPoolCall extends ethereum.Call {
  get inputs(): RegisterPoolCall__Inputs {
    return new RegisterPoolCall__Inputs(this);
  }

  get outputs(): RegisterPoolCall__Outputs {
    return new RegisterPoolCall__Outputs(this);
  }
}

export class RegisterPoolCall__Inputs {
  _call: RegisterPoolCall;

  constructor(call: RegisterPoolCall) {
    this._call = call;
  }

  get specialization(): i32 {
    return this._call.inputValues[0].value.toI32();
  }
}

export class RegisterPoolCall__Outputs {
  _call: RegisterPoolCall;

  constructor(call: RegisterPoolCall) {
    this._call = call;
  }

  get value0(): Bytes {
    return this._call.outputValues[0].value.toBytes();
  }
}

export class RegisterTokensCall extends ethereum.Call {
  get inputs(): RegisterTokensCall__Inputs {
    return new RegisterTokensCall__Inputs(this);
  }

  get outputs(): RegisterTokensCall__Outputs {
    return new RegisterTokensCall__Outputs(this);
  }
}

export class RegisterTokensCall__Inputs {
  _call: RegisterTokensCall;

  constructor(call: RegisterTokensCall) {
    this._call = call;
  }

  get poolId(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get tokens(): Array<Address> {
    return this._call.inputValues[1].value.toAddressArray();
  }

  get assetManagers(): Array<Address> {
    return this._call.inputValues[2].value.toAddressArray();
  }
}

export class RegisterTokensCall__Outputs {
  _call: RegisterTokensCall;

  constructor(call: RegisterTokensCall) {
    this._call = call;
  }
}

export class SetAuthorizerCall extends ethereum.Call {
  get inputs(): SetAuthorizerCall__Inputs {
    return new SetAuthorizerCall__Inputs(this);
  }

  get outputs(): SetAuthorizerCall__Outputs {
    return new SetAuthorizerCall__Outputs(this);
  }
}

export class SetAuthorizerCall__Inputs {
  _call: SetAuthorizerCall;

  constructor(call: SetAuthorizerCall) {
    this._call = call;
  }

  get newAuthorizer(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetAuthorizerCall__Outputs {
  _call: SetAuthorizerCall;

  constructor(call: SetAuthorizerCall) {
    this._call = call;
  }
}

export class SetPausedCall extends ethereum.Call {
  get inputs(): SetPausedCall__Inputs {
    return new SetPausedCall__Inputs(this);
  }

  get outputs(): SetPausedCall__Outputs {
    return new SetPausedCall__Outputs(this);
  }
}

export class SetPausedCall__Inputs {
  _call: SetPausedCall;

  constructor(call: SetPausedCall) {
    this._call = call;
  }

  get paused(): boolean {
    return this._call.inputValues[0].value.toBoolean();
  }
}

export class SetPausedCall__Outputs {
  _call: SetPausedCall;

  constructor(call: SetPausedCall) {
    this._call = call;
  }
}

export class SetRelayerApprovalCall extends ethereum.Call {
  get inputs(): SetRelayerApprovalCall__Inputs {
    return new SetRelayerApprovalCall__Inputs(this);
  }

  get outputs(): SetRelayerApprovalCall__Outputs {
    return new SetRelayerApprovalCall__Outputs(this);
  }
}

export class SetRelayerApprovalCall__Inputs {
  _call: SetRelayerApprovalCall;

  constructor(call: SetRelayerApprovalCall) {
    this._call = call;
  }

  get sender(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get relayer(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get approved(): boolean {
    return this._call.inputValues[2].value.toBoolean();
  }
}

export class SetRelayerApprovalCall__Outputs {
  _call: SetRelayerApprovalCall;

  constructor(call: SetRelayerApprovalCall) {
    this._call = call;
  }
}

export class SwapCall extends ethereum.Call {
  get inputs(): SwapCall__Inputs {
    return new SwapCall__Inputs(this);
  }

  get outputs(): SwapCall__Outputs {
    return new SwapCall__Outputs(this);
  }
}

export class SwapCall__Inputs {
  _call: SwapCall;

  constructor(call: SwapCall) {
    this._call = call;
  }

  get singleSwap(): SwapCallSingleSwapStruct {
    return changetype<SwapCallSingleSwapStruct>(
      this._call.inputValues[0].value.toTuple()
    );
  }

  get funds(): SwapCallFundsStruct {
    return changetype<SwapCallFundsStruct>(
      this._call.inputValues[1].value.toTuple()
    );
  }

  get limit(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get deadline(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }
}

export class SwapCall__Outputs {
  _call: SwapCall;

  constructor(call: SwapCall) {
    this._call = call;
  }

  get amountCalculated(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class SwapCallSingleSwapStruct extends ethereum.Tuple {
  get poolId(): Bytes {
    return this[0].toBytes();
  }

  get kind(): i32 {
    return this[1].toI32();
  }

  get assetIn(): Address {
    return this[2].toAddress();
  }

  get assetOut(): Address {
    return this[3].toAddress();
  }

  get amount(): BigInt {
    return this[4].toBigInt();
  }

  get userData(): Bytes {
    return this[5].toBytes();
  }
}

export class SwapCallFundsStruct extends ethereum.Tuple {
  get sender(): Address {
    return this[0].toAddress();
  }

  get fromInternalBalance(): boolean {
    return this[1].toBoolean();
  }

  get recipient(): Address {
    return this[2].toAddress();
  }

  get toInternalBalance(): boolean {
    return this[3].toBoolean();
  }
}
