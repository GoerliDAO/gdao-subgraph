// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  Address,
  BigInt,
  Bytes,
  Entity,
  ethereum,
  JSONValue,
  TypedMap} from "@graphprotocol/graph-ts";

export class ActivePoolAddressSet extends ethereum.Event {
  get params(): ActivePoolAddressSet__Params {
    return new ActivePoolAddressSet__Params(this);
  }
}

export class ActivePoolAddressSet__Params {
  _event: ActivePoolAddressSet;

  constructor(event: ActivePoolAddressSet) {
    this._event = event;
  }

  get _activePoolAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class BorrowerOperationsAddressSet extends ethereum.Event {
  get params(): BorrowerOperationsAddressSet__Params {
    return new BorrowerOperationsAddressSet__Params(this);
  }
}

export class BorrowerOperationsAddressSet__Params {
  _event: BorrowerOperationsAddressSet;

  constructor(event: BorrowerOperationsAddressSet) {
    this._event = event;
  }

  get _borrowerOperationsAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class EtherSent extends ethereum.Event {
  get params(): EtherSent__Params {
    return new EtherSent__Params(this);
  }
}

export class EtherSent__Params {
  _event: EtherSent;

  constructor(event: EtherSent) {
    this._event = event;
  }

  get _account(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class F_ETHUpdated extends ethereum.Event {
  get params(): F_ETHUpdated__Params {
    return new F_ETHUpdated__Params(this);
  }
}

export class F_ETHUpdated__Params {
  _event: F_ETHUpdated;

  constructor(event: F_ETHUpdated) {
    this._event = event;
  }

  get _F_ETH(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class F_LUSDUpdated extends ethereum.Event {
  get params(): F_LUSDUpdated__Params {
    return new F_LUSDUpdated__Params(this);
  }
}

export class F_LUSDUpdated__Params {
  _event: F_LUSDUpdated;

  constructor(event: F_LUSDUpdated) {
    this._event = event;
  }

  get _F_LUSD(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class LQTYTokenAddressSet extends ethereum.Event {
  get params(): LQTYTokenAddressSet__Params {
    return new LQTYTokenAddressSet__Params(this);
  }
}

export class LQTYTokenAddressSet__Params {
  _event: LQTYTokenAddressSet;

  constructor(event: LQTYTokenAddressSet) {
    this._event = event;
  }

  get _lqtyTokenAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class LUSDTokenAddressSet extends ethereum.Event {
  get params(): LUSDTokenAddressSet__Params {
    return new LUSDTokenAddressSet__Params(this);
  }
}

export class LUSDTokenAddressSet__Params {
  _event: LUSDTokenAddressSet;

  constructor(event: LUSDTokenAddressSet) {
    this._event = event;
  }

  get _lusdTokenAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class StakeChanged extends ethereum.Event {
  get params(): StakeChanged__Params {
    return new StakeChanged__Params(this);
  }
}

export class StakeChanged__Params {
  _event: StakeChanged;

  constructor(event: StakeChanged) {
    this._event = event;
  }

  get staker(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newStake(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class StakerSnapshotsUpdated extends ethereum.Event {
  get params(): StakerSnapshotsUpdated__Params {
    return new StakerSnapshotsUpdated__Params(this);
  }
}

export class StakerSnapshotsUpdated__Params {
  _event: StakerSnapshotsUpdated;

  constructor(event: StakerSnapshotsUpdated) {
    this._event = event;
  }

  get _staker(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _F_ETH(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get _F_LUSD(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class StakingGainsWithdrawn extends ethereum.Event {
  get params(): StakingGainsWithdrawn__Params {
    return new StakingGainsWithdrawn__Params(this);
  }
}

export class StakingGainsWithdrawn__Params {
  _event: StakingGainsWithdrawn;

  constructor(event: StakingGainsWithdrawn) {
    this._event = event;
  }

  get staker(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get LUSDGain(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get ETHGain(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class TotalLQTYStakedUpdated extends ethereum.Event {
  get params(): TotalLQTYStakedUpdated__Params {
    return new TotalLQTYStakedUpdated__Params(this);
  }
}

export class TotalLQTYStakedUpdated__Params {
  _event: TotalLQTYStakedUpdated;

  constructor(event: TotalLQTYStakedUpdated) {
    this._event = event;
  }

  get _totalLQTYStaked(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class TroveManagerAddressSet extends ethereum.Event {
  get params(): TroveManagerAddressSet__Params {
    return new TroveManagerAddressSet__Params(this);
  }
}

export class TroveManagerAddressSet__Params {
  _event: TroveManagerAddressSet;

  constructor(event: TroveManagerAddressSet) {
    this._event = event;
  }

  get _troveManager(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class LQTYStaking__snapshotsResult {
  value0: BigInt;
  value1: BigInt;

  constructor(value0: BigInt, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    const map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    return map;
  }

  getF_ETH_Snapshot(): BigInt {
    return this.value0;
  }

  getF_LUSD_Snapshot(): BigInt {
    return this.value1;
  }
}

export class LQTYStaking extends ethereum.SmartContract {
  static bind(address: Address): LQTYStaking {
    return new LQTYStaking("LQTYStaking", address);
  }

  DECIMAL_PRECISION(): BigInt {
    const result = super.call(
      "DECIMAL_PRECISION",
      "DECIMAL_PRECISION():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_DECIMAL_PRECISION(): ethereum.CallResult<BigInt> {
    const result = super.tryCall(
      "DECIMAL_PRECISION",
      "DECIMAL_PRECISION():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  F_ETH(): BigInt {
    const result = super.call("F_ETH", "F_ETH():(uint256)", []);

    return result[0].toBigInt();
  }

  try_F_ETH(): ethereum.CallResult<BigInt> {
    const result = super.tryCall("F_ETH", "F_ETH():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  F_LUSD(): BigInt {
    const result = super.call("F_LUSD", "F_LUSD():(uint256)", []);

    return result[0].toBigInt();
  }

  try_F_LUSD(): ethereum.CallResult<BigInt> {
    const result = super.tryCall("F_LUSD", "F_LUSD():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  NAME(): string {
    const result = super.call("NAME", "NAME():(string)", []);

    return result[0].toString();
  }

  try_NAME(): ethereum.CallResult<string> {
    const result = super.tryCall("NAME", "NAME():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  activePoolAddress(): Address {
    const result = super.call(
      "activePoolAddress",
      "activePoolAddress():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_activePoolAddress(): ethereum.CallResult<Address> {
    const result = super.tryCall(
      "activePoolAddress",
      "activePoolAddress():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  borrowerOperationsAddress(): Address {
    const result = super.call(
      "borrowerOperationsAddress",
      "borrowerOperationsAddress():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_borrowerOperationsAddress(): ethereum.CallResult<Address> {
    const result = super.tryCall(
      "borrowerOperationsAddress",
      "borrowerOperationsAddress():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getPendingETHGain(_user: Address): BigInt {
    const result = super.call(
      "getPendingETHGain",
      "getPendingETHGain(address):(uint256)",
      [ethereum.Value.fromAddress(_user)]
    );

    return result[0].toBigInt();
  }

  try_getPendingETHGain(_user: Address): ethereum.CallResult<BigInt> {
    const result = super.tryCall(
      "getPendingETHGain",
      "getPendingETHGain(address):(uint256)",
      [ethereum.Value.fromAddress(_user)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getPendingLUSDGain(_user: Address): BigInt {
    const result = super.call(
      "getPendingLUSDGain",
      "getPendingLUSDGain(address):(uint256)",
      [ethereum.Value.fromAddress(_user)]
    );

    return result[0].toBigInt();
  }

  try_getPendingLUSDGain(_user: Address): ethereum.CallResult<BigInt> {
    const result = super.tryCall(
      "getPendingLUSDGain",
      "getPendingLUSDGain(address):(uint256)",
      [ethereum.Value.fromAddress(_user)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  isOwner(): boolean {
    const result = super.call("isOwner", "isOwner():(bool)", []);

    return result[0].toBoolean();
  }

  try_isOwner(): ethereum.CallResult<boolean> {
    const result = super.tryCall("isOwner", "isOwner():(bool)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  lqtyToken(): Address {
    const result = super.call("lqtyToken", "lqtyToken():(address)", []);

    return result[0].toAddress();
  }

  try_lqtyToken(): ethereum.CallResult<Address> {
    const result = super.tryCall("lqtyToken", "lqtyToken():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  lusdToken(): Address {
    const result = super.call("lusdToken", "lusdToken():(address)", []);

    return result[0].toAddress();
  }

  try_lusdToken(): ethereum.CallResult<Address> {
    const result = super.tryCall("lusdToken", "lusdToken():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  owner(): Address {
    const result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    const result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  snapshots(param0: Address): LQTYStaking__snapshotsResult {
    const result = super.call(
      "snapshots",
      "snapshots(address):(uint256,uint256)",
      [ethereum.Value.fromAddress(param0)]
    );

    return new LQTYStaking__snapshotsResult(
      result[0].toBigInt(),
      result[1].toBigInt()
    );
  }

  try_snapshots(
    param0: Address
  ): ethereum.CallResult<LQTYStaking__snapshotsResult> {
    const result = super.tryCall(
      "snapshots",
      "snapshots(address):(uint256,uint256)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(
      new LQTYStaking__snapshotsResult(value[0].toBigInt(), value[1].toBigInt())
    );
  }

  stakes(param0: Address): BigInt {
    const result = super.call("stakes", "stakes(address):(uint256)", [
      ethereum.Value.fromAddress(param0)
    ]);

    return result[0].toBigInt();
  }

  try_stakes(param0: Address): ethereum.CallResult<BigInt> {
    const result = super.tryCall("stakes", "stakes(address):(uint256)", [
      ethereum.Value.fromAddress(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  totalLQTYStaked(): BigInt {
    const result = super.call(
      "totalLQTYStaked",
      "totalLQTYStaked():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_totalLQTYStaked(): ethereum.CallResult<BigInt> {
    const result = super.tryCall(
      "totalLQTYStaked",
      "totalLQTYStaked():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  troveManagerAddress(): Address {
    const result = super.call(
      "troveManagerAddress",
      "troveManagerAddress():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_troveManagerAddress(): ethereum.CallResult<Address> {
    const result = super.tryCall(
      "troveManagerAddress",
      "troveManagerAddress():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class IncreaseF_ETHCall extends ethereum.Call {
  get inputs(): IncreaseF_ETHCall__Inputs {
    return new IncreaseF_ETHCall__Inputs(this);
  }

  get outputs(): IncreaseF_ETHCall__Outputs {
    return new IncreaseF_ETHCall__Outputs(this);
  }
}

export class IncreaseF_ETHCall__Inputs {
  _call: IncreaseF_ETHCall;

  constructor(call: IncreaseF_ETHCall) {
    this._call = call;
  }

  get _ETHFee(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class IncreaseF_ETHCall__Outputs {
  _call: IncreaseF_ETHCall;

  constructor(call: IncreaseF_ETHCall) {
    this._call = call;
  }
}

export class IncreaseF_LUSDCall extends ethereum.Call {
  get inputs(): IncreaseF_LUSDCall__Inputs {
    return new IncreaseF_LUSDCall__Inputs(this);
  }

  get outputs(): IncreaseF_LUSDCall__Outputs {
    return new IncreaseF_LUSDCall__Outputs(this);
  }
}

export class IncreaseF_LUSDCall__Inputs {
  _call: IncreaseF_LUSDCall;

  constructor(call: IncreaseF_LUSDCall) {
    this._call = call;
  }

  get _LUSDFee(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class IncreaseF_LUSDCall__Outputs {
  _call: IncreaseF_LUSDCall;

  constructor(call: IncreaseF_LUSDCall) {
    this._call = call;
  }
}

export class SetAddressesCall extends ethereum.Call {
  get inputs(): SetAddressesCall__Inputs {
    return new SetAddressesCall__Inputs(this);
  }

  get outputs(): SetAddressesCall__Outputs {
    return new SetAddressesCall__Outputs(this);
  }
}

export class SetAddressesCall__Inputs {
  _call: SetAddressesCall;

  constructor(call: SetAddressesCall) {
    this._call = call;
  }

  get _lqtyTokenAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _lusdTokenAddress(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _troveManagerAddress(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get _borrowerOperationsAddress(): Address {
    return this._call.inputValues[3].value.toAddress();
  }

  get _activePoolAddress(): Address {
    return this._call.inputValues[4].value.toAddress();
  }
}

export class SetAddressesCall__Outputs {
  _call: SetAddressesCall;

  constructor(call: SetAddressesCall) {
    this._call = call;
  }
}

export class StakeCall extends ethereum.Call {
  get inputs(): StakeCall__Inputs {
    return new StakeCall__Inputs(this);
  }

  get outputs(): StakeCall__Outputs {
    return new StakeCall__Outputs(this);
  }
}

export class StakeCall__Inputs {
  _call: StakeCall;

  constructor(call: StakeCall) {
    this._call = call;
  }

  get _LQTYamount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class StakeCall__Outputs {
  _call: StakeCall;

  constructor(call: StakeCall) {
    this._call = call;
  }
}

export class UnstakeCall extends ethereum.Call {
  get inputs(): UnstakeCall__Inputs {
    return new UnstakeCall__Inputs(this);
  }

  get outputs(): UnstakeCall__Outputs {
    return new UnstakeCall__Outputs(this);
  }
}

export class UnstakeCall__Inputs {
  _call: UnstakeCall;

  constructor(call: UnstakeCall) {
    this._call = call;
  }

  get _LQTYamount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class UnstakeCall__Outputs {
  _call: UnstakeCall;

  constructor(call: UnstakeCall) {
    this._call = call;
  }
}