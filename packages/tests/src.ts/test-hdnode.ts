'use strict';

import assert from "assert";

import { fourtwentycoins } from "fourtwentycoins";
import { loadTests, randomNumber, TestCase } from "@420integrated/testcases";

function randomCase(seed: string, text: string): string {
    return text.split("").map(function(c, index) {
       if (randomNumber(seed + "-" + index, 0, 2)) {
           return c.toUpperCase();
       }
       return c
    }).join("");
}

// Too many test cases are caussing issues for the CI
// Only run random cases under random-128
function checkRandom(name: string): boolean {
    /*
    if (name.substring(0, 7) === "random-") {
        return (parseInt(name.substring(7)) <= 128);
    }
    */
    return true;
}

describe('Test HD Node Derivation is Case Agnostic', function() {
    let tests: Array<TestCase.HDWallet> = loadTests('hdnode');
    tests.forEach((test) => {
        if (!checkRandom(test.name)) { return; }

        it("Normalizes case - " + test.name, function() {
            this.timeout(10000);
            let wordlist = (<{ [ locale: string ]: fourtwentycoins.Wordlist }>(fourtwentycoins.wordlists))[test.locale];

            let rootNode = fourtwentycoins.utils.HDNode.fromMnemonic(test.mnemonic, test.password || null, wordlist);

            let altMnemonic = randomCase(test.name, test.mnemonic);
            let altNode = fourtwentycoins.utils.HDNode.fromMnemonic(altMnemonic, test.password || null, wordlist);

            assert.equal(altNode.privateKey, rootNode.privateKey, altMnemonic);
        });
    });
});

describe('Test HD Node Derivation from Seed', function() {

    let tests: Array<TestCase.HDWallet> = loadTests('hdnode');

    tests.forEach((test) => {
        if (!checkRandom(test.name)) { return; }

        // If there is nothing to derive, skip this portion of the test
        if (test.hdnodes.length === 0) { return; }

        it('Derives the HD nodes - ' + test.name, function() {
            this.timeout(10000);

            let rootNode = fourtwentycoins.utils.HDNode.fromSeed(test.seed);
            test.hdnodes.forEach((nodeTest) => {

                let node = rootNode.derivePath(nodeTest.path);
                assert.equal(node.privateKey, nodeTest.privateKey,
                    'Generates privateKey - ' + nodeTest.privateKey);

                let wallet = new fourtwentycoins.Wallet(node.privateKey);
                assert.equal(wallet.address.toLowerCase(), nodeTest.address,
                    'Generates address - ' + nodeTest.privateKey);
            });
        });
    });
});

describe('Test HD Node Derivation from Mnemonic', function() {

    let tests: Array<TestCase.HDWallet> = loadTests('hdnode');

    tests.forEach((test) => {
        if (!checkRandom(test.name)) { return; }

        // If there is nothing to derive, skip this portion of the test
        if (test.hdnodes.length === 0) { return; }

        it('Derives the HD nodes - ' + test.name, function() {
            this.timeout(10000);

            let rootNode = fourtwentycoins.utils.HDNode.fromMnemonic(test.mnemonic, test.password || null);
            test.hdnodes.forEach((nodeTest) => {

                let node = rootNode.derivePath(nodeTest.path);

                assert.equal(node.privateKey, nodeTest.privateKey,
                    'Matches privateKey - ' + nodeTest.privateKey);
                assert.equal(node.path, nodeTest.path,
                    'Matches path - ' + nodeTest.privateKey);
                assert.equal(node.mnemonic.phrase, test.mnemonic,
                    'Matches mnemonic.phrase - ' + nodeTest.privateKey);
                assert.equal(node.mnemonic.path, nodeTest.path,
                    'Matches mnemonic.path - ' + nodeTest.privateKey);

                let wallet = new fourtwentycoins.Wallet(node.privateKey);
                assert.equal(wallet.address.toLowerCase(), nodeTest.address,
                    'Generates address - ' + nodeTest.privateKey);
            });
        });
    });
});

describe('Test HD Mnemonic Phrases', function testMnemonic() {

    let tests: Array<TestCase.HDWallet> = loadTests('hdnode');

    tests.forEach(function(test) {
        if (!checkRandom(test.name)) { return; }

        it(('converts mnemonic phrases - ' + test.name), function() {
            this.timeout(1000000);

            assert.equal(fourtwentycoins.utils.mnemonicToSeed(test.mnemonic, test.password), test.seed,
                'Converts mnemonic to seed - ' + test.mnemonic + ':' + test.password);

            // Test default english
            if (test.locale === "en") {
                assert.equal(fourtwentycoins.utils.entropyToMnemonic(test.entropy), test.mnemonic,
                    "Converts entropy to mnemonic " + test.name + " (default en)");

                assert.equal(fourtwentycoins.utils.mnemonicToEntropy(test.mnemonic), test.entropy,
                    "Converts mnemonic to entropy - " + test.mnemonic + " (default en)");
            }

            let wordlist = (<{ [ locale: string ]: fourtwentycoins.Wordlist }>(fourtwentycoins.wordlists))[test.locale];

            let mnemonic = fourtwentycoins.utils.entropyToMnemonic(test.entropy, wordlist);
            assert.equal(mnemonic.normalize('NFKD'), test.mnemonic.normalize('NFKD'),
                'Converts entropy to mnemonic ' + test.name);

            assert.equal(fourtwentycoins.utils.mnemonicToEntropy(test.mnemonic, wordlist), test.entropy,
                'Converts mnemonic to entropy - ' + test.mnemonic);
        });
    });
});

describe("HD Extended Keys", function() {
    const root = fourtwentycoins.utils.HDNode.fromSeed("0xdeadbeefdeadbeefdeadbeefdeadbeef");
    const root42 = root.derivePath("42");

    it("exports and imports xpriv extended keys", function() {
        const xpriv = root.extendedKey;
        const node = fourtwentycoins.utils.HDNode.fromExtendedKey(xpriv);

        assert.equal(root.address, node.address, "address matches");

        const node42 = node.derivePath("42");
        assert.equal(root42.address, node42.address, "address matches");
    });

    it("exports and imports xpub extended keys", function() {
        const xpub = root.neuter().extendedKey;
        const node = fourtwentycoins.utils.HDNode.fromExtendedKey(xpub);

        assert.equal(root.address, node.address, "address matches");

        const node42 = node.derivePath("42");
        assert.equal(root42.address, node42.address, "address matches");
    });
});

describe("HD error cases", function() {
    const testInvalid = [
        "",
        "m/45/m",
        "m/44/foobar"
    ];

    const root = fourtwentycoins.utils.HDNode.fromSeed("0xdeadbeefdeadbeefdeadbeefdeadbeef");

    testInvalid.forEach((path) => {
        it(`fails on path "${ path }"`, function() {
            assert.throws(() => {
                root.derivePath(path);
            }, (error: any) => {
                return true;
            });
        });
    });

    it("fails to derive child of hardened key", function() {
        // Deriving non-hardened should work...
        const node = root.neuter().derivePath("44");

        assert.throws(() => {
            // Deriving hardened should fail...
            node.derivePath("44'");
        }, (error: any) => {
            return true;
        });
    });

    // The zero-mnemonic, with and without correct checksum
    const zeroMnemonicCS = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about";
    const zeroMnemonic = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon";

    it("fails on invalid mnemonic length", function() {
        const shortMnemonic = "abandon abandon abandon abandon";

        // Test the validate functions
        assert.ok(fourtwentycoins.utils.isValidMnemonic(zeroMnemonicCS));
        assert.ok(!fourtwentycoins.utils.isValidMnemonic(zeroMnemonic));
        assert.ok(!fourtwentycoins.utils.isValidMnemonic(shortMnemonic));

        assert.throws(() => {
            fourtwentycoins.utils.mnemonicToEntropy(shortMnemonic);
        }, (error: any) => {
            return true;
        });
    });

    it("fails on invalid checksum", function() {
        assert.throws(() => {
            fourtwentycoins.utils.mnemonicToEntropy(zeroMnemonic);
        }, (error: any) => {
            return true;
        });
    });

    it("fails on unknown locale", function() {
        assert.throws(() => {
            fourtwentycoins.utils.HDNode.fromMnemonic(zeroMnemonicCS, "foobar", "xx");
        }, (error: any) => {
            return true;
        });
    });
});
