'use strict';

import assert from 'assert';

import { fourtwentycoins } from "fourtwentycoins";
import { loadTests, TestCase } from "@420integrated/testcases";

import * as utils from './utils';


function equals(a: any, b: any): boolean {
    if (Array.isArray(a)) {
        if (!Array.isArray(b) || a.length !== b.length) {
            return false;
        }
        for (let i = 0; i < a.length; i++) {
            if (!equals(a[i], b[i])) { return false; }
        }
        return true;
    }

    return a === b;
}

describe('Test Contract Address Generation', function() {

    // @TODO: Mine a large collection of these from the blockchain

    let getContractAddress = fourtwentycoins.utils.getContractAddress;

    let Tests = [
        // Transaction: 0x939aa17985bc2a52a0c1cba9497ef09e092355a805a8150e30e24b753bac6864
        {
            address: '0x3474627D4F63A678266BC17171D87f8570936622',
            name: 'tx-0x939aa179 (number)',
            tx: {
                from: '0xb2682160c482eb985ec9f3e364eec0a904c44c23',
                nonce: 10,
            }
        },

        {
            address: '0x3474627D4F63A678266BC17171D87f8570936622',
            name: 'tx-0x939aa179 (odd-zero-hex)',
            tx: {
                from: '0xb2682160c482eb985ec9f3e364eec0a904c44c23',
                nonce: "0xa",
            }
        },

        {
            address: '0x3474627D4F63A678266BC17171D87f8570936622',
            name: 'tx-0x939aa179 (even-zero-hex)',
            tx: {
                from: '0xb2682160c482eb985ec9f3e364eec0a904c44c23',
                nonce: "0x0a",
            }
        },

        // Ropsten: https://fourtwentyvm.io/tx/0x78d17f8ab31fb6ad688340634a9a29d8726feb6d588338a9b9b21a44159bc916
        {
            address: '0x271300790813f82638A8A6A8a86d65df6dF33c17',
            name: 'tx-0x78d17f8a (odd-long-hex)',
            tx: {
                from: '0x8ba1f109551bd432803012645ac136ddd64dba72',
                nonce: "0x200",
            }
        },

        {
            address: '0x271300790813f82638A8A6A8a86d65df6dF33c17',
            name: 'tx-0x78d17f8a (even-long-hex)',
            tx: {
                from: '0x8ba1f109551bd432803012645ac136ddd64dba72',
                nonce: "0x0200",
            }
        },

        // https://ropsten.fourtwentyvm.io/tx/0x444ea8ae9890ac0ee5fd249512726abf9d23f44a378d5f45f727b65dc1b899c2
        {
            address: '0x995C25706C407a1F1E84b3777775e3e619764933',
            name: 'tx-0x444ea8ae (even-long-hex)',
            tx: {
                from: '0x8ba1f109551bd432803012645ac136ddd64dba72',
                nonce: "0x1d",
            }
        },

        {
            address: '0x995C25706C407a1F1E84b3777775e3e619764933',
            name: 'tx-0x444ea8ae (padded-long-hex)',
            tx: {
                from: '0x8ba1f109551bd432803012645ac136ddd64dba72',
                nonce: "0x001d",
            }
        },

        {
            address: '0x995C25706C407a1F1E84b3777775e3e619764933',
            name: 'tx-0x444ea8ae (number)',
            tx: {
                from: '0x8ba1f109551bd432803012645ac136ddd64dba72',
                nonce: 29,
            }
        },

        // Ropsten: 0x5bdfd14fcc917abc2f02a30721d152a6f147f09e8cbaad4e0d5405d646c5c3e1
        {
            address: '0x0CcCC7507aEDf9FEaF8C8D731421746e16b4d39D',
            name: 'zero-nonce',
            tx: {
                from: '0xc6af6e1a78a6752c7f8cd63877eb789a2adb776c',
                nonce: 0
            }
        },
    ]

    Tests.forEach(function(test) {
        it(('Computes the transaction address - ' + test.name), function() {
            this.timeout(120000);
            assert.equal(getContractAddress(test.tx), test.address, 'computes the transaction address');
        });
    });
});

describe('Test RLP Coder', function() {
    type TestCase = {
        name: string,

        decoded: string,
        encoded: string
    };

    const tests: Array<TestCase> = loadTests('rlp-coder');

    tests.forEach(function(test) {
        it(('RLP coder encoded - ' + test.name), function() {
            this.timeout(120000);
            assert.equal(fourtwentycoins.utils.RLP.encode(test.decoded), test.encoded, 'RLP encoded - ' + test.name);
        });
    });

    tests.forEach((test: TestCase) => {
        it(('RLP coder decoded - ' + test.name), function() {
            this.timeout(120000);
            assert.ok(equals(fourtwentycoins.utils.RLP.decode(test.encoded), test.decoded),
                'RLP decoded - ' + test.name);
        });
    });
});

describe('Test Unit Conversion', function () {

    const tests: Array<TestCase.Unit> = loadTests('units');

    tests.forEach((test) => {
        let marley = fourtwentycoins.BigNumber.from(test.marley);

        it (('parses ' + test.fourtwentycoin + ' fourtwentycoin'), function() {
            assert.ok(fourtwentycoins.utils.parseFourtwentycoin(test.420coin.replace(/,/g, '')).eq(marley),
                'parsing 420coin failed - ' + test.name);
        });

        it (('formats ' + marley.toString() + ' marley to fourtwentycoin'), function() {
            let actual = fourtwentycoins.utils.formatFourtwentycoin(marley);
            assert.equal(actual, test.fourtwentycoin_format,
                   'formatting marley failed - ' + test.name);
        });
    });

    tests.forEach((test) => {
        let marley = fourtwentycoins.BigNumber.from(test.marley);

        type UnitName = 'kmarley' | 'mmarley' | 'gmarley' | 'snoop' | 'willie' | 'satoshi'
        type UnitNameFormat = 'kmarley_format' | 'mmarley_format' | 'gmarley_format' | 'snoop_format' | 'willie_format' | 'satoshi_format'

        ['kmarley', 'mmarley', 'gmarley', 'snoop', 'willie', 'satoshi'].forEach((name: UnitName) => {

            let unitName: string | number = name;
            if (name === 'satoshi') { unitName = 8; }

            if (test[name]) {
                it(('parses ' + test[name] + ' ' + name), function() {
                    this.timeout(120000);
                    assert.ok(fourtwentycoins.utils.parseUnits(test[name].replace(/,/g, ''), unitName).eq(marley),
                        ('parsing ' + name + ' failed - ' + test.name));
                });
            }

            let expectedKey: UnitNameFormat = (<UnitNameFormat>(name + '_format'));
            if (test[expectedKey]) {
                it (('formats ' + marley.toString() + ' marley to ' + name + ')'), function() {
                    let actual = fourtwentycoins.utils.formatUnits(marley, unitName);
                    let expected = test[expectedKey];
                    assert.equal(actual, expected,
                        ('formats ' + name + ' - ' + test.name));
                });
            }
        });
    });

    it("formats with commify", function() {
        const tests: { [ testcase: string ]: string } = {
            "0.0": "0.0",
            ".0": "0.0",
            "0.": "0.0",
            "00.00": "0.0",

            "100.000": "100.0",
            "100.0000": "100.0",
            "1000.000": "1,000.0",
            "1000.0000": "1,000.0",

            "100.123": "100.123",
            "100.1234": "100.1234",
            "1000.1234": "1,000.1234",
            "1000.12345": "1,000.12345",

            "998998998998.123456789": "998,998,998,998.123456789",
        };

        Object.keys(tests).forEach((test) => {
            assert.equal(fourtwentycoins.utils.commify(test), tests[test]);
        });
    });
});


describe('Test Namehash', function() {
    type TestCase = {
         expected: string,
         name: string
    };

    const tests: Array<TestCase> = loadTests('namehash');

    tests.forEach((test: TestCase) => {
        it(('computes namehash - "' + test.name + '"'), function() {
            this.timeout(120000);
            assert.equal(fourtwentycoins.utils.namehash(test.name), test.expected,
                'computes namehash(' + test.name + ')');
        });
    });

    it("isValidName", function() {
        assert.ok(fourtwentycoins.utils.isValidName("ricmoo.fourtwenty"));

        assert.ok(!fourtwentycoins.utils.isValidName(""));
        assert.ok(!fourtwentycoins.utils.isValidName("ricmoo..fourtwenty"));
    });
});

describe('Test ID Hash Functions', function () {
    type TestCase = {
         expected: string,
         name: string,
         text: string
    };

    const tests: Array<TestCase> = [
        {
            name: 'setAddr signature hash',
            text: 'setAddr(bytes32,address)',
            expected: '0xd5fa2b00b0756613052388dd576d941ba16904757996b8bb03a737ef4fd1f9ce'
        }
    ]

    tests.forEach((test: TestCase) => {
        it(('computes id - ' + test.name), function() {
            this.timeout(120000);
            let actual = fourtwentycoins.utils.id(test.text);
            assert.equal(actual, test.expected,
                'computes id(' + test.text + ')');
        });
    });
});

describe('Test Solidity Hash Functions', function() {

    type TestCase = {
        keccak256: string,
        sha256: string,
        types: Array<string>,
        values: Array<string>
    };

    const tests: Array<TestCase> = loadTests('solidity-hashes');

    function test(funcName: string, testKey: 'keccak256' | 'sha256') {
        it(`computes ${ funcName } correctly`, function() {
            this.timeout(120000);

            tests.forEach((test, index) => {
                let actual = (<any>(fourtwentycoins.utils))['solidity' + funcName](test.types, test.values);
                let expected = test[testKey];
                assert.equal(actual, expected,
                    ('computes solidity-' + funcName + '(' + JSON.stringify(test.values) + ') - ' + test.types));
            });
        });
    }

    test('Keccak256', 'keccak256');
    test('Sha256', 'sha256');

    const testsInvalid = [
        "uint0",     // number - null length
        "uint1",     // number - not byte-aligned
        "uint08",    // number - leading zeros
        "uint266",   // number - out-of-range
        "bytes0",    // bytes - null length
        "bytes02",   // bytes - leading zeros
        "bytes33",   // bytes - out-of-range
        "purple"     // invalid type
    ];

    testsInvalid.forEach((type) => {
        it(`disallows invalid type "${ type }"`, function() {
            assert.throws(() => {
                fourtwentycoins.utils.solidityPack([ type ], [ "0x12" ]);
            }, (error: Error) => {
                const message = error.message;
                return (message.match(/invalid([a-z ]*) type/) && message.indexOf(type) >= 0);
            });
        });
    });
});

describe('Test Hash Functions', function() {

    const tests: Array<TestCase.Hash> = loadTests('hashes');

    it('computes keccak256 correctly', function() {
        this.timeout(120000);
        tests.forEach(function(test) {
            assert.equal(fourtwentycoins.utils.keccak256(test.data), test.keccak256, ('Keccak256 - ' + test.data));
        });
    });

    it('computes sha2-256 correctly', function() {
        this.timeout(120000);
        tests.forEach(function(test) {
            assert.equal(fourtwentycoins.utils.sha256(test.data), test.sha256, ('SHA256 - ' + test.data));
        });
    });

    it('computes sha2-512 correctly', function() {
        this.timeout(120000);
        tests.forEach(function(test) {
            assert.equal(fourtwentycoins.utils.sha512(test.data), test.sha512, ('SHA512 - ' + test.data));
        });
    });
});

describe('Test Solidity splitSignature', function() {

    it('splits a canonical signature', function() {
        this.timeout(120000);
        let r = '0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef';
        let s = '0xcafe1a7ecafe1a7ecafe1a7ecafe1a7ecafe1a7ecafe1a7ecafe1a7ecafe1a7e';
        for (let v = 27; v <= 28; v++) {
            let signature = fourtwentycoins.utils.concat([ r, s, [ v ] ]);
            let sig = fourtwentycoins.utils.splitSignature(signature);
            assert.equal(sig.r, r, 'split r correctly');
            assert.equal(sig.s, s, 'split s correctly');
            assert.equal(sig.v, v, 'split v correctly');
        }
    });

    it('splits a legacy signature', function() {
        this.timeout(120000);
        let r = '0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef';
        let s = '0xcafe1a7ecafe1a7ecafe1a7ecafe1a7ecafe1a7ecafe1a7ecafe1a7ecafe1a7e';
        for (let v = 27; v <= 28; v++) {
            let signature = fourtwentycoins.utils.concat([ r, s, [ v - 27 ] ]);
            let sig = fourtwentycoins.utils.splitSignature(signature);
            assert.equal(sig.r, r, 'split r correctly');
            assert.equal(sig.s, s, 'split s correctly');
            assert.equal(sig.v, v, 'split v correctly');
        }
    });
});

describe('Test Base64 coder', function() {

    // https://en.wikipedia.org/wiki/Base64#Examples
    it('encodes and decodes the example from wikipedia', function() {
        this.timeout(120000);
        let decodedText = 'Man is distinguished, not only by his reason, but by this singular passion from other animals, which is a lust of the mind, that by a perseverance of delight in the continued and indefatigable generation of knowledge, exceeds the short vehemence of any carnal pleasure.';
        let decoded = fourtwentycoins.utils.toUtf8Bytes(decodedText);
        let encoded = 'TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb24sIGJ1dCBieSB0aGlzIHNpbmd1bGFyIHBhc3Npb24gZnJvbSBvdGhlciBhbmltYWxzLCB3aGljaCBpcyBhIGx1c3Qgb2YgdGhlIG1pbmQsIHRoYXQgYnkgYSBwZXJzZXZlcmFuY2Ugb2YgZGVsaWdodCBpbiB0aGUgY29udGludWVkIGFuZCBpbmRlZmF0aWdhYmxlIGdlbmVyYXRpb24gb2Yga25vd2xlZGdlLCBleGNlZWRzIHRoZSBzaG9ydCB2ZWhlbWVuY2Ugb2YgYW55IGNhcm5hbCBwbGVhc3VyZS4=';
        assert.equal(fourtwentycoins.utils.base64.encode(decoded), encoded, 'encodes to base64 string');
        assert.equal(fourtwentycoins.utils.toUtf8String(fourtwentycoins.utils.base64.decode(encoded)), decodedText, 'decodes from base64 string');
    });
});

describe('Test UTF-8 coder', function() {
    const overlong = fourtwentycoins.utils.Utf8ErrorReason.OVERLONG;
    const utf16Surrogate = fourtwentycoins.utils.Utf8ErrorReason.UTF16_SURROGATE;
    const overrun = fourtwentycoins.utils.Utf8ErrorReason.OVERRUN;
    const missingContinue = fourtwentycoins.utils.Utf8ErrorReason.MISSING_CONTINUE;
    const unexpectedContinue = fourtwentycoins.utils.Utf8ErrorReason.UNEXPECTED_CONTINUE;
    const outOfRange = fourtwentycoins.utils.Utf8ErrorReason.OUT_OF_RANGE;

    let BadUTF = [
        // See: https://en.wikipedia.org/wiki/UTF-8#Overlong_encodings
        { bytes: [ 0xF0,0x82, 0x82, 0xAC ], reason: overlong, ignored: "", replaced: "\u20ac", name: 'wikipedia overlong encoded Euro sign' },
        { bytes: [ 0xc0, 0x80 ], reason: overlong, ignored: "", replaced: "\u0000", name: '2-byte overlong - 0xc080' },
        { bytes: [ 0xc0, 0xbf ], reason: overlong, ignored: "", replaced: "?", name: '2-byte overlong - 0xc0bf' },
        { bytes: [ 0xc1, 0x80 ], reason: overlong, ignored: "", replaced: "@", name: '2-byte overlong - 0xc180' },
        { bytes: [ 0xc1, 0xbf ], reason: overlong, ignored: "", replaced: "\u007f", name: '2-byte overlong - 0xc1bf' },

        // Reserved UTF-16 Surrogate halves
        { bytes: [ 0xed, 0xa0, 0x80 ], reason: utf16Surrogate, ignored: "", replaced: "\ufffd", name: 'utf-16 surrogate - U+d800' },
        { bytes: [ 0xed, 0xbf, 0xbf ], reason: utf16Surrogate, ignored: "", replaced: "\ufffd", name: 'utf-16 surrogate - U+dfff' },

        // a leading byte not followed by enough continuation bytes
        { bytes: [ 0xdf ], reason: overrun, ignored: "", replaced: "\ufffd", name: 'too short - 2-bytes - 0x00' },
        { bytes: [ 0xe0 ], reason: overrun, ignored: "", replaced: "\ufffd", name: 'too short - 3-bytes' },
        { bytes: [ 0xe0, 0x80 ], reason: overrun, ignored: "", replaced: "\ufffd", name: 'too short - 3-bytes with 1' },

        { bytes: [ 0x80 ], reason: unexpectedContinue, ignored: "", replaced: "\ufffd", name: 'unexpected continuation byte' },
        { bytes: [ 0xc2, 0x00 ], reason: missingContinue, ignored: "\u0000", replaced: "\ufffd\u0000", name: 'invalid continuation byte - 0xc200' },
        { bytes: [ 0xc2, 0x40 ], reason: missingContinue, ignored: "@", replaced: "\ufffd@", name: 'invalid continuation byte - 0xc240' },
        { bytes: [ 0xc2, 0xc0 ], reason: missingContinue, ignored: "", replaced: "\ufffd\ufffd", name: 'invalid continuation byte - 0xc2c0' },

        // Out of range
        { bytes: [ 0xf4, 0x90, 0x80, 0x80 ], reason: outOfRange, ignored: "", replaced: "\ufffd", name: 'out of range' },
    ];

    BadUTF.forEach(function(test) {
        it('toUtf8String - ' + test.name, function() {
            // Check the string using the ignoreErrors conversion
            const ignored = fourtwentycoins.utils.toUtf8String(test.bytes, fourtwentycoins.utils.Utf8ErrorFuncs.ignore);
            assert.equal(ignored, test.ignored, "ignoring errors matches");

            // Check the string using the replaceErrors conversion
            const replaced = fourtwentycoins.utils.toUtf8String(test.bytes, fourtwentycoins.utils.Utf8ErrorFuncs.replace);
            assert.equal(replaced, test.replaced, "replaced errors matches");

            // Check the string throws the correct error during conversion
            assert.throws(function() {
                let result = fourtwentycoins.utils.toUtf8String(test.bytes);
                console.log('Result', result);
            }, function(error: Error) {
                return (error.message.split(";").pop().split("(")[0].trim() === test.reason)
            }, test.name);
        });
    });

    it('toUtf8String - random conversions', function() {
        this.timeout(200000);

        function randomChar(seed: string) {
            switch (utils.randomNumber(seed + '-range', 0, 4)) {
                case 0:
                    return String.fromCharCode(utils.randomNumber(seed + '-value', 0, 0x100));
                case 1:
                    return String.fromCharCode(utils.randomNumber(seed + '-value', 0, 0xd800));
                case 2:
                    return String.fromCharCode(utils.randomNumber(seed + '-value', 0xdfff + 1, 0xffff));
                case 3:
                    let left = utils.randomNumber(seed + '-value', 0xd800, 0xdbff + 1);
                    let right = utils.randomNumber(seed + '-value', 0xdc00, 0xdfff + 1);
                    return String.fromCharCode(left, right);
            }

            throw new Error('this should not happen');
        }

        function randomString(seed: string) {
            let length = utils.randomNumber(seed + '-length', 1, 5);
            let str = '';
            for (let i = 0; i < length; i++) {
                str += randomChar(seed + '-char-' + i);
            }
            return str;
        }

        for (let i = 0; i < 100000; i++) {
            let seed = 'test-' + String(i);
            let str = randomString(seed);

            let bytes = fourtwentycoins.utils.toUtf8Bytes(str)
            let str2 = fourtwentycoins.utils.toUtf8String(bytes);
            let escaped = JSON.parse(fourtwentycoins.utils._toEscapedUtf8String(bytes));

            assert.ok(Buffer.from(str).equals(Buffer.from(bytes)), 'bytes not generated correctly - ' + bytes)
            assert.equal(str2, str, 'conversion not reflexive - ' + bytes);
            assert.equal(escaped, str, 'conversion not reflexive - ' + bytes);
        }
    });
});

describe('Test Bytes32String coder', function() {
    // @TODO: a LOT more test cases; generated from Solidity
    it("encodes an ens name", function() {
        let str = "ricmoo.firefly.fourtwenty";
        let bytes32 = fourtwentycoins.utils.formatBytes32String(str);
        let str2 = fourtwentycoins.utils.parseBytes32String(bytes32);
        assert.equal(bytes32, '0x7269636d6f6f2e66697265666c792e6574680000000000000000000000000000', 'formatted correctly');
        assert.equal(str2, str, "parsed correctly");
    });
});


function getHex(value: string): string {
    return "0x" + Buffer.from(value).toString("hex");
}

describe("Test nameprep", function() {
    const Tests: Array<TestCase.Nameprep> = loadTests("nameprep");
    Tests.forEach((test) => {
        // No RTL support yet... These will always fail
        if ([
            "Surrogate code U+DF42",
            "Left-to-right mark U+200E",
            "Deprecated U+202A",
            "Language tagging character U+E0001",
            "Bidi: RandALCat character U+05BE and LCat characters",
            "Bidi: RandALCat character U+FD50 and LCat characters",
            "Bidi: RandALCat without trailing RandALCat U+0627 U+0031"
        ].indexOf(test.comment) >= 0) {
            return;
        }

        it(test.comment, function() {
            let input = fourtwentycoins.utils.toUtf8String(test.input);
            if (test.output) {
                let expected = fourtwentycoins.utils.toUtf8String(test.output)
                let actual = fourtwentycoins.utils.nameprep(input);
                assert.equal(actual, expected, `actual("${ getHex(actual) }") !== expected("${ getHex(expected) }")`);
            } else {
                let ok = true;
                let reason = "";
                try {
                    let actual = fourtwentycoins.utils.nameprep(input);
                    console.log(actual);
                    reason = `should has thrown ${ test.rc } - actual("${ getHex(actual) }")`;
                    ok = false;
                } catch (error) {
                }
                assert.ok(ok, reason);
            }
        });
    });
});

describe("Test Signature Manipulation", function() {
    const tests: Array<TestCase.SignedTransaction> = loadTests("transactions");
    tests.forEach((test) => {
        it("autofills partial signatures - " + test.name, function() {
            const address = fourtwentycoins.utils.getAddress(test.accountAddress);
            const hash = fourtwentycoins.utils.keccak256(test.unsignedTransaction);
            const data = fourtwentycoins.utils.RLP.decode(test.signedTransaction);
            const s = data.pop(), r = data.pop(), v = parseInt(data.pop().substring(2), 16);
            const sig = fourtwentycoins.utils.splitSignature({ r: r, s: s, v: v });

            {
                const addr = fourtwentycoins.utils.recoverAddress(hash, {
                    r: r, s: s, v: v
                });
                assert.equal(addr, address, "Using r, s and v");
            }

            {
                const addr = fourtwentycoins.utils.recoverAddress(hash, {
                    r: sig.r, _vs: sig._vs
                });
                assert.equal(addr, address, "Using r, _vs");
            }

            {
                const addr = fourtwentycoins.utils.recoverAddress(hash, {
                    r: sig.r, s: sig.s, recoveryParam: sig.recoveryParam
                });
                assert.equal(addr, address, "Using r, s and recoveryParam");
            }
        });
    });
});

describe("BigNumber", function() {
    const tests: Array<TestCase.BigNumber> = loadTests("bignumber");
    tests.forEach((test) => {
        if (test.expectedValue == null) {
            it(test.testcase, function() {
                assert.throws(() => {
                    const value = fourtwentycoins.BigNumber.from(test.value);
                    console.log("ERROR", value);
                }, (error: Error) => {
                    return true;
                });
            });
        } else {
            it(test.testcase, function() {
                const value = fourtwentycoins.BigNumber.from(test.value);
                assert.equal(value.toHexString(), test.expectedValue);

                const value2 = fourtwentycoins.BigNumber.from(value)
                assert.equal(value2.toHexString(), test.expectedValue);
            });
        }
    });

    [
        { value: "0x0", expected: "0x0" },
        { value: "-0x0", expected: "0x0" },
        { value: "0x5", expected: "0x5" },
        { value: "-0x5", expected: "0x5" },
        { value: "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff", expected: "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" },
        { value: "-0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff", expected: "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" },
        { value: "0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff", expected: "0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" },
        { value: "-0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff", expected: "0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" },
    ].forEach((test) => {
        it(`absolute value (${ test.value })`, function() {
            const value = fourtwentycoins.BigNumber.from(test.value);
            const expected = fourtwentycoins.BigNumber.from(test.expected);
            assert.ok(value.abs().eq(expected));
        });
    });

    // @TODO: Add more tests here

});


describe("FixedNumber", function() {
    {
        const Tests = [
            { value: "0.0",    expected: "0.0"  },
            { value: "-0.0",   expected: "0.0"  },

            { value: "1.0",    expected: "1.0"  },
            { value: "1.00",   expected: "1.0"  },
            { value: "01.00",  expected: "1.0"  },
            { value: 1,        expected: "1.0"  },

            { value: "-1.0",   expected: "-1.0"  },
            { value: "-1.00",  expected: "-1.0"  },
            { value: "-01.00", expected: "-1.0"  },
            { value: -1,       expected: "-1.0"  },
        ];

        Tests.forEach((test) => {
            it (`Create from=${ test.value }`, function() {
                const value = fourtwentycoins.FixedNumber.from(test.value);
                assert.equal(value.toString(), test.expected);
            });
        });
    }

    {
        const Tests = [
            { value: "1.0",    round: 1,   expected: "1.0"  },
            { value: "1.4",    round: 1,   expected: "1.4"  },
            { value: "1.4",    round: 2,   expected: "1.4"  },
            { value: "1.4",    round: 0,   expected: "1.0"  },
            { value: "1.5",    round: 0,   expected: "2.0"  },
            { value: "1.6",    round: 0,   expected: "2.0"  },

            { value: "-1.0",   round: 1,   expected: "-1.0" },
            { value: "-1.4",   round: 1,   expected: "-1.4" },
            { value: "-1.4",   round: 2,   expected: "-1.4" },
            { value: "-1.4",   round: 0,   expected: "-1.0" },
            { value: "-1.5",   round: 0,   expected: "-1.0" },
            { value: "-1.6",   round: 0,   expected: "-2.0" },

            { value: "1.51",   round: 1,   expected: "1.5"  },
            { value: "1.55",   round: 1,   expected: "1.6"  },
        ];

        Tests.forEach((test) => {
            it (`Rounding value=${ test.value }, decimals=${ test.round }`, function() {
                const value = fourtwentycoins.FixedNumber.from(test.value).round(test.round);
                assert.equal(value.toString(), test.expected);
            });
        });
    }

    {
        const Tests = [
            { value: "1.0",   ceiling: "1.0",   floor: "1.0"  },
            { value: "1.1",   ceiling: "2.0",   floor: "1.0"  },
            { value: "1.9",   ceiling: "2.0",   floor: "1.0"  },
            { value: "-1.0",  ceiling: "-1.0",  floor: "-1.0" },
            { value: "-1.1",  ceiling: "-1.0",  floor: "-2.0" },
            { value: "-1.9",  ceiling: "-1.0",  floor: "-2.0" },
        ];

        Tests.forEach((test) => {
            it (`Clamping value=${ test.value }`, function() {
                const value = fourtwentycoins.FixedNumber.from(test.value);
                assert.equal(value.floor().toString(), test.floor);
                assert.equal(value.ceiling().toString(), test.ceiling);
            });
        });
    }
});

describe("Logger", function() {
    const logger = new fourtwentycoins.utils.Logger("testing/0.0");

    it ("setLogLevel", function() {
        fourtwentycoins.utils.Logger.setLogLevel(fourtwentycoins.utils.Logger.levels.DEBUG);
        fourtwentycoins.utils.Logger.setLogLevel(fourtwentycoins.utils.Logger.levels.INFO);
        fourtwentycoins.utils.Logger.setLogLevel(fourtwentycoins.utils.Logger.levels.WARNING);
        fourtwentycoins.utils.Logger.setLogLevel(fourtwentycoins.utils.Logger.levels.ERROR);
        fourtwentycoins.utils.Logger.setLogLevel(fourtwentycoins.utils.Logger.levels.OFF);

        // Reset back to INFO when done tests
        fourtwentycoins.utils.Logger.setLogLevel(fourtwentycoins.utils.Logger.levels.INFO);
    });

    it("checkArgumentCount", function() {
        logger.checkArgumentCount(3, 3);
    });

    it("checkArgumentCount - too few", function() {
        assert.throws(() => {
            logger.checkArgumentCount(1, 3);
        }, (error: any) => {
            return error.code === fourtwentycoins.utils.Logger.errors.MISSING_ARGUMENT;
        });
    });

    it("checkArgumentCount - too many", function() {
        assert.throws(() => {
            logger.checkArgumentCount(3, 1);
        }, (error: any) => {
            return error.code === fourtwentycoins.utils.Logger.errors.UNEXPECTED_ARGUMENT;
        });
    });
});

describe("Base58 Coder", function() {
    it("decodes", function() {
        assert.equal(fourtwentycoins.utils.toUtf8String(fourtwentycoins.utils.base58.decode("JxF12TrwUP45BMd")), "Hello World");
    });

    it("encodes", function() {
        assert.equal(fourtwentycoins.utils.base58.encode(fourtwentycoins.utils.toUtf8Bytes("Hello World")), "JxF12TrwUP45BMd");
    });
});

/*
describe("Web Fetch", function() {
    it("fetches JSON", async function() {
        const url = "https:/\/api.fourtwentyvm.io/api?module=stats&action=fourtwentyprice&apikey=9D13ZE7XSBTJ94N9BNJ2MA33VMAY2YPIRB";
        const getData = fourtwentycoins.utils.fetchJson(url)
    });
});
*/

describe("EIP-712", function() {
    const tests = loadTests<Array<TestCase.Eip712>>("eip712");

    tests.forEach((test) => {
        it(`encoding ${ test.name }`, function() {
            const encoder = fourtwentycoins.utils._TypedDataEncoder.from(test.types);
            assert.equal(encoder.primaryType, test.primaryType, "instance.primaryType");
            assert.equal(encoder.encode(test.data), test.encoded, "instance.encode()");

            //console.log(test);
            assert.equal(fourtwentycoins.utils._TypedDataEncoder.getPrimaryType(test.types), test.primaryType, "getPrimaryType");
            assert.equal(fourtwentycoins.utils._TypedDataEncoder.hash(test.domain, test.types, test.data), test.digest, "digest");
        });
    });

    tests.forEach((test) => {
        if (!test.privateKey) { return; }
        it(`signing ${ test.name }`, async function() {
            const wallet = new fourtwentycoins.Wallet(test.privateKey);
            const signature = await wallet._signTypedData(test.domain, test.types, test.data);
            assert.equal(signature, test.signature, "signature");
        });
    });
});
