"use strict";

const { resolve } = require("path");
const fs = require("fs");

const ts = require("typescript");

function getDefinitions(source) {
    const sourceFile = ts.createSourceFile("filename.ts", source);

    const defs = [ ];

    function add(type, name, pos) {
        const lineNo = sourceFile.getLineAndCharacterOfPosition(pos).line + 1;
        name = type + "." + name
        defs.push({ type, name, lineNo });
    }

    let lastClass = null, lastEnum = null;
    function visit(node, depth) {
        if (ts.isConstructorDeclaration(node)) {
            add("constructor", lastClass, node.body.pos);
        } else if (ts.isFunctionDeclaration(node)) {
            add("function", node.name.text, node.name.end);
        } else if (ts.isConstructorDeclaration(node)) {
            add("constructor", lastClass, node.pos);
        } else if (ts.isClassDeclaration(node)) {
            lastClass = node.name.escapedText;
            add("class", lastClass, node.name.end);
        } else if (ts.isMethodDeclaration(node)) {
            if (lastClass == null) { throw new Error("missing class"); }
            if (ts.hasStaticModifier(node)) {
                add("staticmethod", (lastClass + "." + node.name.text), node.name.end);
            } else {
                add("method", (lastClass + "." + node.name.text), node.name.end);
            }
        } else if (ts.isEnumDeclaration(node)) {
            lastEnum = node.name.escapedText;
            add("enum", lastEnum, node.name.end);
        } else if (ts.isEnumMember(node)) {
            add("enum", (lastEnum + "." + node.name.escapedText), node.name.end);
        } else if (ts.isVariableDeclaration(node)) {
            if (depth === 3) {
                add("var", node.name.escapedText, node.name.end);
            }
        }
        ts.forEachChild(node, (node) => { return visit(node, depth + 1); });
    }

    visit(sourceFile, 0);

    return defs;
}

const getSourceUrl = (function(path, include, exclude) {
    console.log("Scanning TypeScript Sources...");
    const Link = "https://github.com/420integrated/fourtwentycoins.js/blob/master/packages$FILENAME#L$LINE";
    const Root = resolve(__dirname, path);

    const readdir = function(path) {
        if (path.match(exclude)) { return [ ]; }

        const stat = fs.statSync(path);
        if (stat.isDirectory()) {
            return fs.readdirSync(path).reduce((result, filename) => {
                readdir(resolve(path, filename)).forEach((file) => {
                    result.push(file);
                });
                return result;
            }, [ ]);
        }

        if (path.match(include)) {
            const source = fs.readFileSync(path).toString();
            return [ { filename: path.substring(Root.length), defs: getDefinitions(source) } ]
        }

        return [ ];
    }

    const defs = readdir(Root);

    return function getSourceUrl(key) {
        const comps = key.split(":");
        if (comps.length !== 2) { throw new Error("unsupported key"); }

        const pathCheck = new RegExp("(^|[^a-zA-Z0-9_])" + comps[0].split("/").join("/(.*/)*") + "($|[^a-zA-Z0-9_])");

        let match = comps[1];
        if (match.indexOf("(" /* fix: )*/)) {
            match = new RegExp("(^|\\.)" + match.split("(" /* fix: ) */)[0] + "$");
        } else if (match[0] === "=") {
            match = new RegExp("^" + match.substring(1) + "$");
        } else {
            match = new RegExp("(^|\\.)" + match + "$");
        }

        const result = [ ];
        defs.forEach((def) => {
            if (!def.filename.match(pathCheck)) { return; }
            def.defs.forEach((d) => {
                if (!d.name.match(match)) { return; }
                result.push({ filename: def.filename, lineNo: d.lineNo, name: d.name });
            });
        });
        if (result.length > 1) {
            throw new Error(`Ambiguous TypeScript link: ${ key } in [ ${ result.map((r) => JSON.stringify(r.filename + ":" + r.lineNo + "@" + r.name)).join(", ") }]`);
        } else if (result.length === 0) {
            throw new Error(`No matching TypeScript link: ${ key }`);
        }

        return Link
            .replace("$LINE", String(result[0].lineNo))
            .replace("$FILENAME", result[0].filename);
    }
})("../packages/", new RegExp("packages/.*/src.ts/.*\.ts$"), new RegExp("/node_modules/|src.ts/.*browser.*"));

function codeContextify(context) {
    const { inspect } = require("util");
    const fourtwentycoins = context.require("./packages/fourtwentycoins ");

    context.fourtwentycoins = fourtwentycoins ;
    context.BigNumber = fourtwentycoins.BigNumber;
    context.constants = fourtwentycoins.constants;
    context.utils = fourtwentycoins.utils;
    context.arrayify = fourtwentycoins.utils.arrayify;
    context.hexlify = fourtwentycoins.utils.hexlify;
    context.hexValue = fourtwentycoins.utils.hexValue;
    context.Wallet = fourtwentycoins.Wallet;
    context.provider = new fourtwentycoins.providers.InfuraProvider();

    context.BigNumber.prototype[inspect.custom] = function(depth, options) {
        return `{ BigNumber: ${JSON.stringify(this.toString()) } }`;
    }


    context._inspect = function(value, depth) {
        if (value && value.constructor && value.constructor.name === "Uint8Array") {
            return `Uint8Array [ ${ Array.prototype.join.call(value, ", ") } ]`;
        }

        //return JSON.stringify(value);
        return inspect(value, {
            compact: false,
            breakLength: Infinity,
            sorted: true,
        });
    }
}


module.exports = {
  title: "fourtwentycoins",
  subtitle: "v5.0",
  logo: "logo.svg",

  prefix: "/v5",

  link: "https:/\/420integrated.com/wiki",
  copyright: "The content of this site is licensed under the [Creative Commons License](https:/\/choosealicense.com/licenses/cc-by-4.0/). Generated on &$now;.",

  markdown: {
      "banner": "-----\n\nDocumentation: [html](https://420integrated.com/wiki/)\n\n-----\n\n"
  },

  codeContextify: codeContextify,

  getSourceUrl: getSourceUrl,

  codeRoot: "../",

  externalLinks: {
      "link-alchemy": { name: "Alchemy", url: "https:/\/alchemyapi.io" },
      "link-cloudflare": { name: "Cloudflare", url: "https:/\/developers.cloudflare.com/distributed-web/fourtwenty-gateway/" },
      "link-ens": { name: "ENS", url: "https:/\/ens.domains/" },
      "link-420coin": { name: "420coin", url: "https:/\/420integratedcom" },
      "link-fourtwentyvm": { name: "Fourtwentyvm", url: "https:/\/fourtwentyvm.io" },
      "link-expo": { name: "Expo", url: "https:/\/expo.io" },
      "link-fourtwentyvm-api": "https:/\/fourtwentyvm.io/apis",
      "link-flatworm": { name: "Flatworm", url: "https:/\/github.com/ricmoo/flatworm" },
      "link-g420": { name: "G420", url: "https:/\/420integrated.com/g420" },
      "link-infura": { name: "INFURA", url: "https:/\/infura.io" },
      "link-javascriptcore": { name: "JavaScriptCore", url: "https:/\/developer.apple.com/documentation/javascriptcore?language=objc" },
      "link-ledger": "https:/\/www.ledger.com",
      "link-metamask": { name: "Metamask", url: "https:/\/metamask.io/" },
      "link-otto": "https:/\/github.com/robertkrimen/otto",
      "link-parity": { name: "Parity", url: "https:/\/www.parity.io" },
      "link-react-native": { name: "React Native", url: "https:/\/reactnative.dev" },
      "link-rtd": "https:/\/github.com/readthedocs/sphinx_rtd_theme",
      "link-semver": { name: "semver", url: "https:/\/semver.org" },
      "link-solidity": { name: "Solidity" , url: "https:/\/solidity.readthedocs.io/en/v0.6.2/" },
      "link-sphinx": { name: "Sphinx", url: "https:/\/www.sphinx-doc.org/" },

      "link-alchemy-signup": "https:/\/dashboard.alchemyapi.io/signup?referral=55a35117-028e-4b7c-9e47-e275ad0acc6d",
      "link-fourtwentyvm-signup": "https:/\/fourtwentyvm.io/apis",
      "link-fourtwentyvm-ratelimit": "https:/\/info.fourtwentyvm.com/api-return-errors/",
      "link-infura-signup": "https:/\/infura.io/register",

      "link-json-rpc": "https:/\/github.com/420integrated/go-420coin/wiki/wiki/JSON-RPC",
      "link-web3-send": "https:/\/github.com/420integrated/go-420coin/web3.js/blob/1.x/packages/web3-providers-http/types/index.d.ts#L57",
      "link-parity-trace": "https:/\/openethereum.github.io/wiki/JSONRPC-trace-module",
      "link-parity-rpc": "https:/\/openethereum.github.io/wiki/JSONRPC",
      "link-g420-debug": "https:/\/github.com/420integrated/go-420coin/go-420coin/wiki/Management-APIs#debug",
      "link-g420-rpc": "https:/\/github.com/420integrated/go-420coin/go-420coin/wiki/Management-APIs",

      "link-legacy-docs3": "https:/\/420integrated.com/wiki/v3/",
      "link-legacy-docs4": "https:/\/420integrated.com/wiki/v4/",

      "link-github-ci": "https:/\/github.com/420integrated/fourtwentycoins.js/actions/runs/158006903",
      "link-github-issues": "https:/\/github.com/420integrated/fourtwentycoins.js/issues",

      "link-issue-407": "https:/\/github.com/420integrated/fourtwentycoins.js/issues/407",

      "link-infura-secret": "https:/\/infura.io/docs/gettingStarted/authentication",

      "link-web3": "https:/\/github.com/420integrated/go-420coin/web3.js",
      "link-web3-http": "https:/\/github.com/420integrated/go-420coin/web3.js/tree/1.x/packages/web3-providers-http",
      "link-web3-ipc": "https:/\/github.com/420integrated/go-420coin/web3.js/tree/1.x/packages/web3-providers-ipc",
      "link-web3-ws": "https:/\/github.com/420integrated/go-420coin/web3.js/tree/1.x/packages/web3-providers-ws",

      "link-solc-output": "https:/\/solidity.readthedocs.io/en/v0.6.0/using-the-compiler.html#output-description",
      "link-bip39-wordlists": "https:/\/github.com/bitcoin/bips/blob/master/bip-0039/bip-0039-wordlists.md",

      "link-icap": "https:/\/github.com/420integrated/go-420coin/wiki/wiki/Inter-exchange-Client-Address-Protocol-%28ICAP%29",
      "link-jsonrpc": "https:/\/github.com/420integrated/go-420coin/wiki/wiki/JSON-RPC",
      "link-mit": { name: "MIT License", url: "https:/\/en.m.wikipedia.org/wiki/MIT_License" },
      "link-namehash": { name: "namehash", url: "https:/\/docs.ens.domains/contract-api-reference/name-processing#hashing-names" },
      "link-rlp": { name: "Recursive Length Prefix", url: "https:/\/github.com/420integrated/go-420coin/wiki/wiki/RLP" },

      "link-fourtwentycoins io": "https:/\/fourtwentycoins.io/",
      "link-fourtwentycoins-docs": "https:/\/420integrated.com/wiki/",
      "link-fourtwentycoins-js": "https:/\/cdn.fourtwentycoins.io/lib/fourtwentycoins-5.0.esm.min.js",
      "link-fourtwentycoins-npm": "https:/\/www.npmjs.com/search?q=%40fourtwentycoins project%2F",
      "link-fourtwentycoins-asm-grammar": "https:/\/github.com/420integrated/fourtwentycoins.js/blob/master/packages/asm/grammar.jison",

      "link-eip-155": { name: "EIP-155", url: "https:/\/eips.420integrated.com/EIPS/eip-155" },
      "link-eip-191": { name: "EIP-191", url: "https:/\/eips.420integrated.com/EIPS/eip-191" },
      "link-eip-609": { name: "EIP-609", url: "https:/\/eips.420integrated.com/EIPS/eip-609" },
      "link-eip-1014": { name: "EIP-1014", url: "https:/\/eips.420integrated.com/EIPS/eip-1014" },
      "link-eip-1193": { name: "EIP-1193", url: "https:/\/eips.420integrated.com/EIPS/eip-1193" },
      "link-eip-2098": { name: "EIP-2098", url: "https:/\/eips.420integrated.com/EIPS/eip-2098" },
      "link-bip-39": { name: "BIP-39", url: "https:/\/en.bitcoin.it/wiki/BIP_0039" },
      "link-bip-32": { name: "BIP-32", url: "https:/\/github.com/bitcoin/bips/blob/master/bip-0032.mediawiki" },

      "link-npm-elliptic": { name: "elliptic", url: "https:/\/www.npmjs.com/package/elliptic" },
      "link-npm-fourtwentycoins project-shims": { name: "Shims", url: "https:/\/www.npmjs.com/package/@420integrated/shims" },
      "link-npm-events": { name: "EventEmitter", url: "https:/\/nodejs.org/dist/latest-v13.x/docs/api/events.html#events_class_eventemitter" },
      "link-npm-bnjs": { name: "BN.js", url: "https:/\/www.npmjs.com/package/bn.js" },
      "link-npm-query-bignumber": "https:/\/www.npmjs.com/search?q=bignumber",
      "link-npm-react-native-crypto": { name: "React Native Crypto", url: "https:/\/www.npmjs.com/package/react-native-crypto" },

      "link-js-array": "https:/\/developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array",
      "link-js-bigint": "https:/\/developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt",
      "link-js-normalize": { name: "String.normalize", url: "https:/\/developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize" },
      "link-js-maxsafe": "https:/\/developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER#Description",
      "link-js-proxy": "https:/\/developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy",
      "link-js-typedarray": "https:/\/developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray",

      "link-ricmoo-humanreadableabi": "https:/\/blog.ricmoo.com/human-readable-contract-abis-in-fourtwentycoins-js-141902f4d917",

      "link-wiki-basicauth": { name: "Basic Authentication", url: "https:/\/en.wikipedia.org/wiki/Basic_access_authentication" },
      "link-wiki-backoff": { name: "Exponential Backoff", url: "https:/\/en.wikipedia.org/wiki/Exponential_backoff" },
      "link-wiki-bloomfilter": { name: "Bloom Filter", url: "https:/\/en.wikipedia.org/wiki/Bloom_filter" },
      "link-wiki-bruteforce": "https:/\/en.wikipedia.org/wiki/Brute-force_attack",
      "link-wiki-cryptographichash": "https:/\/en.wikipedia.org/wiki/Cryptographic_hash_function",
      "link-wiki-ecrecover": { name: "ECDSA Public Key Recovery", url: "https:/\/en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm#Public_key_recovery" },
      "link-wiki-homoglyph": "https:/\/en.wikipedia.org/wiki/IDN_homograph_attack",
      "link-wiki-hmac": "https:/\/en.wikipedia.org/wiki/HMAC",
      "link-wiki-iban": "https:/\/en.wikipedia.org/wiki/International_Bank_Account_Number",
      "link-wiki-ieee754": "https:/\/en.wikipedia.org/wiki/Double-precision_floating-point_format",
      "link-wiki-ripemd": "https:/\/en.m.wikipedia.org/wiki/RIPEMD",
      "link-wiki-sha2": "https:/\/en.wikipedia.org/wiki/SHA-2",
      "link-wiki-twoscomplement": "https:/\/en.wikipedia.org/wiki/Two%27s_complement",
      "link-wiki-unicode-equivalence": "https:/\/en.wikipedia.org/wiki/Unicode_equivalence",
      "link-wiki-utf8-overlong": "https:/\/en.wikipedia.org/wiki/UTF-8#Overlong_encodings",
      "link-wiki-utf8-replacement": "https:/\/en.wikipedia.org/wiki/Specials_%28Unicode_block%29#Replacement_character",
      "link-wiki-scrypt": "https:/\/en.wikipedia.org/wiki/Scrypt",
      "link-wiki-sha3": "https:/\/en.wikipedia.org/wiki/SHA-3",
      "link-wiki-shuffle": { name: "Fisher-Yates Shuffle", url: "https:/\/en.wikipedia.org/wiki/Fisher-Yates_shuffle" },
      "link-wiki-overflow": { name: "overflow", url: "https:/\/en.wikipedia.org/wiki/Integer_overflow" },
      "link-wiki-underflow": { name: "arithmetic underflow", url: "https:/\/en.wikipedia.org/wiki/Arithmetic_underflow" },
  },
};
