import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { assert, describe, test } from "matchstick-as/assembly/index";

import { TokenRecord } from "../generated/schema";
import {
  createOrUpdateTokenRecord,
  getTokenRecordValue,
  setTokenRecordMultiplier,
} from "../src/utils/TokenRecordHelper";

const createTokenRecord = (): TokenRecord => {
  return createOrUpdateTokenRecord(
    "metric",
    "name",
    "tokenAddress",
    "source",
    "address",
    BigDecimal.fromString("2"),
    BigDecimal.fromString("3"),
    BigInt.fromString("1"),
  );
};

describe("constructor", () => {
  test("basic values", () => {
    const record = createTokenRecord();

    assert.stringEquals("metric-name-source-1", record.id);
    assert.stringEquals("name", record.token);
    assert.stringEquals("tokenAddress", record.tokenAddress);
    assert.stringEquals("source", record.source);
    assert.stringEquals("address", record.sourceAddress);
    assert.stringEquals("2", record.rate.toString());
    assert.stringEquals("3", record.balance.toString());
    assert.stringEquals("1", record.multiplier.toString());
  });

  test("custom multiplier", () => {
    const record = createOrUpdateTokenRecord(
      "metric",
      "name",
      "tokenAddress",
      "source",
      "address",
      BigDecimal.fromString("2"),
      BigDecimal.fromString("3"),
      BigInt.fromString("1"),
      BigDecimal.fromString("0.25"),
    );

    assert.stringEquals("0.25", record.multiplier.toString());
  });

  test("sets value", () => {
    const record = createTokenRecord();

    // Creating the record will set the value
    // 2 * 3 * 1
    assert.stringEquals("6", record.value.toString());
  });
});

describe("multiplier", () => {
  test("sets value", () => {
    const record = createTokenRecord();

    // Setting the multiplier will change the value
    setTokenRecordMultiplier(record, BigDecimal.fromString("0.25"));

    // 2 * 3 * 0.25
    assert.stringEquals("1.5", record.value.toString());
  });
});

describe("value", () => {
  test("multiplier = 1", () => {
    const record = createOrUpdateTokenRecord(
      "metric",
      "name",
      "tokenAddress",
      "source",
      "address",
      BigDecimal.fromString("2"),
      BigDecimal.fromString("3"),
      BigInt.fromString("1"),
    );

    // 2 * 3 * 1
    assert.stringEquals("6", getTokenRecordValue(record).toString());
  });

  test("multiplier = 0.25", () => {
    const record = createOrUpdateTokenRecord(
      "metric",
      "name",
      "tokenAddress",
      "source",
      "address",
      BigDecimal.fromString("2"),
      BigDecimal.fromString("3"),
      BigInt.fromString("1"),
      BigDecimal.fromString("0.25"),
    );

    // 2 * 3 * 0.25
    assert.stringEquals("1.5", getTokenRecordValue(record).toString());
  });
});
