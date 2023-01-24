import { Address, BigDecimal, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { assert, createMockedFunction, describe, test } from "matchstick-as";

import { toBigInt } from "../../shared/src/utils/Decimals";
import { GnosisAuction, GnosisAuctionRoot, TokenSupply } from "../generated/schema";
import { GNOSIS_RECORD_ID } from "../src/GnosisAuction";
import { ERC20_OHM_V2 } from "../src/utils/Constants";
import { BOND_MANAGER, getTreasuryOHMRecords, getVestingBondSupplyRecords } from "../src/utils/OhmCalculations";

const CONTRACT_GNOSIS = "0x0b7ffc1f4ad541a4ed16b40d8c37f0929158d101";
const CONTRACT_TELLER = "0x007FE70dc9797C4198528aE43d8195ffF82Bdc95";

function tokenSupplyRecordsToMap(records: TokenSupply[]): Map<string, TokenSupply> {
    const map = new Map<string, TokenSupply>();

    for (let i = 0; i < records.length; i++) {
        const record = records[i];
        if (!record.sourceAddress) {
            continue;
        }

        map.set(record.sourceAddress, record);
    }

    return map;
}

function mockContractBalances(gnosisBalance: BigDecimal = BigDecimal.fromString("0"), bondManagerBalance: BigDecimal = BigDecimal.fromString("0"), payoutCapacity: BigDecimal = BigDecimal.fromString("0")): void {
    // Holds user deposits
    createMockedFunction(Address.fromString(ERC20_OHM_V2), "balanceOf", "balanceOf(address):(uint256)").
        withArgs([ethereum.Value.fromAddress(Address.fromString(CONTRACT_GNOSIS))]).
        returns([
            ethereum.Value.fromUnsignedBigInt(toBigInt(gnosisBalance, 9)),
        ]);

    // Holds user deposits after auction closure
    createMockedFunction(Address.fromString(ERC20_OHM_V2), "balanceOf", "balanceOf(address):(uint256)").
        withArgs([ethereum.Value.fromAddress(Address.fromString(BOND_MANAGER))]).
        returns([
            ethereum.Value.fromUnsignedBigInt(toBigInt(bondManagerBalance, 9)),
        ]);

    // Holds minted OHM
    createMockedFunction(Address.fromString(ERC20_OHM_V2), "balanceOf", "balanceOf(address):(uint256)").
        withArgs([ethereum.Value.fromAddress(Address.fromString(CONTRACT_TELLER))]).
        returns([
            ethereum.Value.fromUnsignedBigInt(toBigInt(payoutCapacity, 9)),
        ]);
}

describe("Vesting Bonds", () => {
    const AUCTION_ID = "1";
    const PAYOUT_CAPACITY = BigDecimal.fromString("100000");
    const BID_QUANTITY = BigDecimal.fromString("90330");

    function setUpGnosisAuction(payoutCapacity = PAYOUT_CAPACITY, bidQuantity: BigDecimal | null = null): void {
        const record = new GnosisAuction(AUCTION_ID);
        record.payoutCapacity = payoutCapacity;
        if (bidQuantity) {
            record.bidQuantity = bidQuantity;
        }
        record.save();

        const rootRecord = new GnosisAuctionRoot(GNOSIS_RECORD_ID);
        rootRecord.markets = [BigInt.fromString(AUCTION_ID)];
        rootRecord.save();
    }

    function mockContracts(): void {
        // Access methods on bond manager
        createMockedFunction(Address.fromString(BOND_MANAGER), "gnosisEasyAuction", "gnosisEasyAuction():(address)").returns([
            ethereum.Value.fromAddress(Address.fromString(CONTRACT_GNOSIS))
        ]);

        createMockedFunction(Address.fromString(BOND_MANAGER), "fixedExpiryTeller", "fixedExpiryTeller():(address)").returns([
            ethereum.Value.fromAddress(Address.fromString(CONTRACT_TELLER))
        ]);
    }

    test("no auctions", () => {
        mockContracts();
        mockContractBalances();

        const records = getVestingBondSupplyRecords(BigInt.fromString("1"), BigInt.fromString("2"));

        // No supply impact
        assert.i32Equals(records.length, 0);
    });

    test("open auction", () => {
        // Mock auction payoutCapacity (GnosisAuction)
        setUpGnosisAuction();

        // Mock contract values for the BondManager
        mockContracts();
        mockContractBalances(BigDecimal.zero(), BigDecimal.zero(), PAYOUT_CAPACITY);

        const records = getVestingBondSupplyRecords(BigInt.fromString("1"), BigInt.fromString("2"));
        const recordsMap = tokenSupplyRecordsToMap(records);

        // supply decreased by payoutCapacity in teller
        const tellerRecord = recordsMap.get(CONTRACT_TELLER);
        assert.stringEquals(tellerRecord.supplyBalance.toString(), PAYOUT_CAPACITY.times(BigDecimal.fromString("-1")).toString());

        // No supply impact from Gnosis contract
        assert.assertTrue(recordsMap.has(CONTRACT_GNOSIS) == false);
    });

    test("open auction with deposits", () => {
        // Mock auction payoutCapacity (GnosisAuction)
        setUpGnosisAuction();

        // Mock contract values for the BondManager and Gnosis deposit
        mockContracts();
        const gnosisBalance = BigDecimal.fromString("1000");
        mockContractBalances(gnosisBalance, BigDecimal.zero(), PAYOUT_CAPACITY);

        const records = getVestingBondSupplyRecords(BigInt.fromString("1"), BigInt.fromString("2"));
        const recordsMap = tokenSupplyRecordsToMap(records);

        // supply decreased by payoutCapacity in teller
        const tellerRecord = recordsMap.get(CONTRACT_TELLER);
        assert.stringEquals(tellerRecord.supplyBalance.toString(), PAYOUT_CAPACITY.times(BigDecimal.fromString("-1")).toString());

        // No supply impact from Gnosis contract
        assert.assertTrue(recordsMap.has(CONTRACT_GNOSIS) == false);
    });

    test("closed auction with balance in GnosisEasyAuction", () => {
        // Mock auction payoutCapacity and bidQuantity (GnosisAuction)
        setUpGnosisAuction(PAYOUT_CAPACITY, BID_QUANTITY);

        // Mock contract values for the BondManager
        mockContracts();
        mockContractBalances(BID_QUANTITY, BigDecimal.zero(), PAYOUT_CAPACITY);

        const records = getVestingBondSupplyRecords(BigInt.fromString("1"), BigInt.fromString("2"));
        const recordsMap = tokenSupplyRecordsToMap(records);

        // No supply impact from teller
        assert.assertTrue(recordsMap.has(CONTRACT_TELLER) == false);

        // Supply decreased by BID_QUANTITY
        const gnosisRecord = recordsMap.get(CONTRACT_GNOSIS);
        assert.stringEquals(gnosisRecord.supplyBalance.toString(), BID_QUANTITY.times(BigDecimal.fromString("-1")).toString());
    });

    test("closed auction with balance in BondManager", () => {
        // Mock auction payoutCapacity and bidQuantity (GnosisAuction)
        setUpGnosisAuction(PAYOUT_CAPACITY, BID_QUANTITY);

        // Mock contract values for the BondManager
        mockContracts();
        mockContractBalances(BigDecimal.zero(), BID_QUANTITY, PAYOUT_CAPACITY);

        const records = getVestingBondSupplyRecords(BigInt.fromString("1"), BigInt.fromString("2"));
        const recordsMap = tokenSupplyRecordsToMap(records);

        // No supply impact from teller
        assert.assertTrue(recordsMap.has(CONTRACT_TELLER) == false);

        // Supply decreased by BID_QUANTITY
        const gnosisRecord = recordsMap.get(CONTRACT_GNOSIS);
        assert.stringEquals(gnosisRecord.supplyBalance.toString(), BID_QUANTITY.times(BigDecimal.fromString("-1")).toString());
    });

    test("closed auction with partial sale", () => {
        const partialBidQuantity = BigDecimal.fromString("50000");

        // Mock auction payoutCapacity and bidQuantity (GnosisAuction)
        setUpGnosisAuction(PAYOUT_CAPACITY, partialBidQuantity);

        // Mock contract values for the BondManager
        mockContracts();
        mockContractBalances(partialBidQuantity, BigDecimal.zero(), PAYOUT_CAPACITY);

        const records = getVestingBondSupplyRecords(BigInt.fromString("1"), BigInt.fromString("2"));
        const recordsMap = tokenSupplyRecordsToMap(records);

        // No supply impact from teller
        assert.assertTrue(recordsMap.has(CONTRACT_TELLER) == false);

        // Supply decreased by partialBidQuantity
        const gnosisRecord = recordsMap.get(CONTRACT_GNOSIS);
        assert.stringEquals(gnosisRecord.supplyBalance.toString(), partialBidQuantity.times(BigDecimal.fromString("-1")).toString());
    });
});

describe("Treasury OHM", () => {
    test("excludes bond teller", () => {
        mockContractBalances(BigDecimal.zero(), BigDecimal.zero(), BigDecimal.fromString("1"));

        const records = getTreasuryOHMRecords(BigInt.fromString("1"), BigInt.fromString("2"));
        const recordsMap = tokenSupplyRecordsToMap(records);

        // No supply impact from teller
        assert.assertTrue(recordsMap.has(CONTRACT_TELLER) == false);
    });

    test("excludes bond manager", () => {
        mockContractBalances(BigDecimal.zero(), BigDecimal.fromString("1"), BigDecimal.zero());

        const records = getTreasuryOHMRecords(BigInt.fromString("1"), BigInt.fromString("2"));
        const recordsMap = tokenSupplyRecordsToMap(records);

        // No supply impact from bond manager
        assert.assertTrue(recordsMap.has(BOND_MANAGER) == false);
    });
});
