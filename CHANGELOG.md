Changelog
=========

This change log is managed by `admin/cmds/update-versions` but may be manually updated.

fourtwentycoins/v5.0.19x (2020-11-03 11:22)
---------------------------------
  - Recalibration of platform for operation as an adjunct library for 420coin blockchain, including chaning denominationary names, gas definition, and links.

fourtwentycoins/v5.0.19 (2020-10-22 21:55)
---------------------------------

  - Allow 0x as a numeric value for 0 in Provider formatter. ([#1104](https://github.com/420integrated/fourtwentycoins.js/issues/1104); [fe17a29](https://github.com/420integrated/fourtwentycoins.js/commit/fe17a295816214d063f3d6bd4f3273e0ce0c3eac))
  - Use POST for long requests in FourtwentyvmProvider. ([#1093](https://github.com/420integrated/fourtwentycoins.js/issues/1093); [28f60d5](https://github.com/420integrated/fourtwentycoins.js/commit/28f60d5ef83665541c8c1b432f8e173d73cb8227))
  - Added verifyTypedData for EIP-712 typed data. ([#687](https://github.com/420integrated/fourtwentycoins.js/issues/687); [550ecf2](https://github.com/420integrated/fourtwentycoins.js/commit/550ecf2f25b90f6d8996583489a218dbf2306ebc), [a21202c](https://github.com/420integrated/fourtwentycoins.js/commit/a21202c66b392ec6f91296d66551dffca742cf0a))

fourtwentycoins/v5.0.18 (2020-10-19 01:26)
---------------------------------

  - Fix signTypedData call for JsonRpcSigner. ([#687](https://github.com/420integrated/fourtwentycoins.js/issues/687); [15a90af](https://github.com/420integrated/fourtwentycoins.js/commit/15a90af5be75806e26f589f0a3f3687c0fb1c672))
  - Added EIP-712 test cases. ([#687](https://github.com/420integrated/fourtwentycoins.js/issues/687); [1589353](https://github.com/420integrated/fourtwentycoins.js/commit/15893537c3d9c92fe8748a3e9617d133d1d5d6a7))
  - Initial Signer support for EIP-712 signed typed data. ([#687](https://github.com/420integrated/fourtwentycoins.js/issues/687); [be4e216](https://github.com/420integrated/fourtwentycoins.js/commit/be4e2164e64dfa0697561763e8079120a485a566))
  - Split hash library files up. ([3e676f2](https://github.com/420integrated/fourtwentycoins.js/commit/3e676f21b00931ed966f4561e4f28792a1f8f154))
  - Added EIP-712 multi-dimensional array support. ([#687](https://github.com/420integrated/fourtwentycoins.js/issues/687); [5a4dd5a](https://github.com/420integrated/fourtwentycoins.js/commit/5a4dd5a70377d3e86823d279d6ff466d03767644))
  - Consolidated TypedDataEncoder methods. ([#687](https://github.com/420integrated/fourtwentycoins.js/issues/687); [345a830](https://github.com/420integrated/fourtwentycoins.js/commit/345a830dc4bc869d5f3edfdc27465797e7663055))
  - Initial EIP-712 utilities. ([#687](https://github.com/420integrated/fourtwentycoins.js/issues/687); [cfa6dec](https://github.com/420integrated/fourtwentycoins.js/commit/cfa6dec29314fe485df283974612d40550bc4179))
  - Added initial PocketProvider. ([#1052](https://github.com/420integrated/fourtwentycoins.js/issues/1052); [a62d20d](https://github.com/420integrated/fourtwentycoins.js/commit/a62d20d86f2d545b9a7bcda5418993790b7db91c))

fourtwentycoins/v5.0.17 (2020-10-07 20:08)
---------------------------------

  - Better error message for parseUnits of non-strings. ([#981](https://github.com/420integrated/fourtwentycoins.js/issues/981); [5abc2f3](https://github.com/420integrated/fourtwentycoins.js/commit/5abc2f36e20eef79a935961f3dd8133b5528d9e5))
  - Add gzip support to AlchemyProivder and InfuraProvider fetching. ([#1085](https://github.com/420integrated/fourtwentycoins.js/issues/1085); [38a068b](https://github.com/420integrated/fourtwentycoins.js/commit/38a068bcea3f251c8f3a349a90fcb077a39d23ad))
  - Add gzip support to getUrl in node. ([#1085](https://github.com/420integrated/fourtwentycoins.js/issues/1085); [65772a8](https://github.com/420integrated/fourtwentycoins.js/commit/65772a8e1a55d663bdb67e3a2b160fecc9f986ef))
  - Added CommunityResourcable to mark Providers as highly throttled. ([a022093](https://github.com/420integrated/fourtwentycoins.js/commit/a022093ce03f55db7ba2cac36e365d1af39ac45b))
  - Added debug event info to WebSocketProvider. ([#1018](https://github.com/420integrated/fourtwentycoins.js/issues/1018); [8e682cc](https://github.com/420integrated/fourtwentycoins.js/commit/8e682cc8481c6051a6f8115b29d78f4996120ccd))

fourtwentycoins/v5.0.16 (2020-10-05 15:44)
---------------------------------

  - ABI encoding performance additions. ([#1012](https://github.com/420integrated/fourtwentycoins.js/issues/1012); [f3e5b0d](https://github.com/420integrated/fourtwentycoins.js/commit/f3e5b0ded1b227a377fd4799507653c95c76e353))
  - Export hexConcat in utils. ([#1079](https://github.com/420integrated/fourtwentycoins.js/issues/1079); [3d051e4](https://github.com/420integrated/fourtwentycoins.js/commit/3d051e454db978f58c7b38ff4484096c3eb85b94))
  - Cache chain ID for WebSocketProvider. ([#1054](https://github.com/420integrated/fourtwentycoins.js/issues/1054); [40264ff](https://github.com/420integrated/fourtwentycoins.js/commit/40264ff9006156ba8441e6101e5a7149a5cf03f6))

fourtwentycoins/v5.0.15 (2020-09-26 03:22)
---------------------------------

  - Add more accurate intrinsic smoke cost to ABI calls with specified smoke property. ([#1058](https://github.com/420integrated/fourtwentycoins.js/issues/1058); [f0a5869](https://github.com/420integrated/fourtwentycoins.js/commit/f0a5869c53475e55a5f47d8651f609fff45dc9a7))
  - Better errors for unconfigured ENS names. ([#1066](https://github.com/420integrated/fourtwentycoins.js/issues/1066); [5cd1668](https://github.com/420integrated/fourtwentycoins.js/commit/5cd1668e0d29099c5b7ce1fdc1d0e8a41af1a249))
  - Updated CLI solc to versin 0.7.1. ([4306b35](https://github.com/420integrated/fourtwentycoins.js/commit/4306b3563a171baa9d7bf4872475a13c3434f834))

fourtwentycoins/v5.0.14 (2020-09-16 02:39)
---------------------------------

  - More robust blockchain error detection ([#1047](https://github.com/420integrated/fourtwentycoins.js/issues/1047); [49f7157](https://github.com/420integrated/fourtwentycoins.js/commit/49f71574f4799d685a5ae8fd24fe1134f752d70a))
  - Forward blockchain errors from Signer during smoke estimation. ([#1047](https://github.com/420integrated/fourtwentycoins.js/issues/1047); [9ee685d](https://github.com/420integrated/fourtwentycoins.js/commit/9ee685df46753c46cbbde12d05d6ea04f2b5ea3f))
  - Improve fetch errors with looser mime-type detection. ([#1047](https://github.com/420integrated/fourtwentycoins.js/issues/1047); [263bfe5](https://github.com/420integrated/fourtwentycoins.js/commit/263bfe5ce632790e0399d06a0ab660a501997998))

fourtwentycoins/v5.0.13 (2020-09-11 02:10)
---------------------------------

  - Force content-length in web fetching. ([be92339](https://github.com/420integrated/fourtwentycoins.js/commit/be923396962ea76bf0fb566dcf8801e58ccf0e7e))
  - Better error forwarding from FallbackProvider. ([#1021](https://github.com/420integrated/fourtwentycoins.js/issues/1021); [bc3eeec](https://github.com/420integrated/fourtwentycoins.js/commit/bc3eeeca39adb734f24019d0e942eff2eac6ad4d))
  - Add clamping functions to FixedNumber. ([#1037](https://github.com/420integrated/fourtwentycoins.js/issues/1037); [042b74e](https://github.com/420integrated/fourtwentycoins.js/commit/042b74e6ee648d4fa37bf674194273d8f4483bfb))

fourtwentycoins/v5.0.12 (2020-09-07 19:54)
---------------------------------

  - Allow events to use compact bytes ABI coded data for Solidity 0.4 external events. ([#891](https://github.com/420integrated/fourtwentycoins.js/issues/891), [#992](https://github.com/420integrated/fourtwentycoins.js/issues/992); [4e394fc](https://github.com/420integrated/fourtwentycoins.js/commit/4e394fc68019445ae4b4e201e41f95d6793dbe92))

fourtwentycoins/v5.0.11 (2020-09-05 23:51)
---------------------------------

  - Synced unorm in shims to most recent version. ([bdccf7b](https://github.com/420integrated/fourtwentycoins.js/commit/bdccf7b8d352ba400317266a0a37e6e290633e3c))
  - Fixed LedgerSigner sendTransaction. ([#936](https://github.com/420integrated/fourtwentycoins.js/issues/936); [cadb28d](https://github.com/420integrated/fourtwentycoins.js/commit/cadb28d6b364e68e43a06f7a9b8a31797afbd920))
  - Added BrainWallet to experimental exports. ([72385c2](https://github.com/420integrated/fourtwentycoins.js/commit/72385c228783a3158511b3cddc5cb4f9ce1dddae))
  - More readable server errors. ([201e5ce](https://github.com/420integrated/fourtwentycoins.js/commit/201e5ced9c38da2de1dd7518ffbf24284d477e80))

fourtwentycoins/v5.0.10 (2020-09-05 01:21)
---------------------------------

  - Added retry logic to provider tests. ([0558bba](https://github.com/420integrated/fourtwentycoins.js/commit/0558bba8eb1b783ef50bb37bcf4c9bae1f86f1e1), [35b64b9](https://github.com/420integrated/fourtwentycoins.js/commit/35b64b9a65e2c09ecb63b0eca712b45a3092c204), [681f2a5](https://github.com/420integrated/fourtwentycoins.js/commit/681f2a50b26d7954795dba5aec55bede4740e494))
  - Fixed link in docs. ([#1028](https://github.com/420integrated/fourtwentycoins.js/issues/1028); [2359a98](https://github.com/420integrated/fourtwentycoins.js/commit/2359a98641d99b26cf88ec892e3601a8a2c81c9c))
  - Added memory-like support and new opcodes to asm. ([6fd3bb6](https://github.com/420integrated/fourtwentycoins.js/commit/6fd3bb62d10eab1563dc4ddbd88732b4f484ec7a))
  - Added basic ENS resolver functions for contenthash, text and multi-coin addresses. ([#1003](https://github.com/420integrated/fourtwentycoins.js/issues/1003); [83db8a6](https://github.com/420integrated/fourtwentycoins.js/commit/83db8a6bd1364458dcfeea544de707df41890b4e))
  - Added support for changing Reporter logging function. ([d01d0c8](https://github.com/420integrated/fourtwentycoins.js/commit/d01d0c8448df40de52253f9e92889ab7e75c6a97))
  - Initial React Native test harness. ([#993](https://github.com/420integrated/fourtwentycoins.js/issues/993); [57eb5b7](https://github.com/420integrated/fourtwentycoins.js/commit/57eb5b777e2c67f1f8d74e41d3413e9f0564528d), [d3b473e](https://github.com/420integrated/fourtwentycoins.js/commit/d3b473e7c738fdfc65b6f1c8f80bcdacf9827d8a))
  - Updating shims for constrained environments. ([#944](https://github.com/420integrated/fourtwentycoins.js/issues/944), [#993](https://github.com/420integrated/fourtwentycoins.js/issues/993); [8abdbbb](https://github.com/420integrated/fourtwentycoins.js/commit/8abdbbbf633f96fde2346c4ae70e538895fd7829), [240aac5](https://github.com/420integrated/fourtwentycoins.js/commit/240aac568303deff14cbb2366b94c8c89cacefc1))

fourtwentycoins/v5.0.9 (2020-08-25 01:45)
--------------------------------

  - Updated docs for all packages on npm pages. ([#1013](https://github.com/420integrated/fourtwentycoins.js/issues/1013); [cb8f4a3](https://github.com/420integrated/fourtwentycoins.js/commit/cb8f4a3a4e378a749c6bbbddf46d8d79d35722cc))
  - Added JSON support to BigNumber. ([#1010](https://github.com/420integrated/fourtwentycoins.js/issues/1010); [8facc1a](https://github.com/420integrated/fourtwentycoins.js/commit/8facc1a5305b1f699aa3afc5a0a692abe7927652))
  - Updated packages for security audit. ([5b5904e](https://github.com/420integrated/fourtwentycoins.js/commit/5b5904ea9977ecf8c079a57593b627553f0126a0))
  - Fix emitted error for ABI code array count mismatch. ([#1004](https://github.com/420integrated/fourtwentycoins.js/issues/1004); [b0c082d](https://github.com/420integrated/fourtwentycoins.js/commit/b0c082d728dc66b0f2a5ec315da44d6295716284))

fourtwentycoins/v5.0.8 (2020-08-04 20:55)
--------------------------------

  - Abstract fetchJson for data. ([e2d6f28](https://github.com/420integrated/fourtwentycoins.js/commit/e2d6f281d5a2bd749bc72549a4e55f2c752a7bd8), [2c49a52](https://github.com/420integrated/fourtwentycoins.js/commit/2c49a52a41a30ae844376561de95f0c851d19f73), [e1bbb06](https://github.com/420integrated/fourtwentycoins.js/commit/e1bbb064a10d0b4bf5563e0a79396665d83935a1))

fourtwentycoins/v5.0.7 (2020-07-20 02:22)
--------------------------------

  - Fix Logger setLogLevel with enum case mismatch. ([#947](https://github.com/420integrated/fourtwentycoins.js/issues/947); [5443363](https://github.com/420integrated/fourtwentycoins.js/commit/5443363de43e92de712e72d55165c3f4d7f652e9), [af10705](https://github.com/420integrated/fourtwentycoins.js/commit/af10705632bc1f8203ea50ea7ed3120b01c67122))
  - Removed UUID dependency from json-wallets. ([#966](https://github.com/420integrated/fourtwentycoins.js/issues/966); [e3f7426](https://github.com/420integrated/fourtwentycoins.js/commit/e3f7426af4d6d7e43db322700d768216b06433e0))
  - Removed unnecessary dependency from BigNumber. ([#951](https://github.com/420integrated/fourtwentycoins.js/issues/951); [78b350b](https://github.com/420integrated/fourtwentycoins.js/commit/78b350bbc5ea73561bf47038743b9e51049496f7))

fourtwentycoins/v5.0.6 (2020-07-16 05:54)
--------------------------------

  - Removed unnecessary dependency from BigNumber. ([#951](https://github.com/420integrated/fourtwentycoins.js/issues/951); [78b350b](https://github.com/420integrated/fourtwentycoins.js/commit/78b350bbc5ea73561bf47038743b9e51049496f7))
  - Longer 420coin throttle slot interval. ([9f20258](https://github.com/420integrated/fourtwentycoins.js/commit/9f20258d5d39cd901d2078275323071eb0f3505b))
  - Fixed ENS overrides for the default provider. ([#959](https://github.com/420integrated/fourtwentycoins.js/issues/959); [63dd3d4](https://github.com/420integrated/fourtwentycoins.js/commit/63dd3d4682b564445948988243fa9139c598587b))
  - Added Retry-After support and adjustable slot interval to fetchJson. ([7d43545](https://github.com/420integrated/fourtwentycoins.js/commit/7d435453039f009b339d835ddee47e35a843711b))
  - Added initial throttling support. ([#139](https://github.com/420integrated/fourtwentycoins.js/issues/139), [#904](https://github.com/420integrated/fourtwentycoins.js/issues/904), [#926](https://github.com/420integrated/fourtwentycoins.js/issues/926); [88c7eae](https://github.com/420integrated/fourtwentycoins.js/commit/88c7eaed061ae9a6798733a97e4e87011d36b8e7))
  - Use status code 1000 on WebSocket hangup for compatibility. ([588f64c](https://github.com/420integrated/fourtwentycoins.js/commit/588f64c760ee49bfb5109bfbaafb4beafe41c52a))
  - Updated WebSocketProvider to use web-style event listener API. ([57fd6f0](https://github.com/420integrated/fourtwentycoins.js/commit/57fd6f06047a1a2a3a46fe8b23ff585293a40062))
  - Normalize formatUnits to simplified decimals. ([79b1da1](https://github.com/420integrated/fourtwentycoins.js/commit/79b1da130be50df80c7e5aeb221edc5669fc211e))
  - Prevent zero-padding on Solidity type lengths. ([e128bfc](https://github.com/420integrated/fourtwentycoins.js/commit/e128bfcd10e006c920532151598700ca33a2127e))
  - Set sensible defaults for INFURA and AlchemyAPI getWebSocketProvider methods. ([e3d3e60](https://github.com/420integrated/fourtwentycoins.js/commit/e3d3e604f299edbafe7d0721c0a3eff5f67c83f4))
  - Added logger assert methods. ([619a888](https://github.com/420integrated/fourtwentycoins.js/commit/619a8888ebe08de9956f60c16703fb3543aeacc4))
  - Added initial code coverage testing. ([0c1d55b](https://github.com/420integrated/fourtwentycoins.js/commit/0c1d55b6dc9c725c86e849d13b911c8bace9821d))
  - Added destroy to WebSocketProvider. ([d0a79c6](https://github.com/420integrated/fourtwentycoins.js/commit/d0a79c6a1362e12f6f102e4af99adfef930092db))
  - Updated packages (security updates). ([c660176](https://github.com/420integrated/fourtwentycoins.js/commit/c6601769ada64832b1ce392680a30cb145c3cab9))

fourtwentycoins/v5.0.5 (2020-07-07 23:18)
--------------------------------

  - Fixed splitSignature when recoveryParam is encoded directly. ([#893](https://github.com/420integrated/fourtwentycoins.js/issues/893), [#933](https://github.com/420integrated/fourtwentycoins.js/issues/933); [bf65ddb](https://github.com/420integrated/fourtwentycoins.js/commit/bf65ddbff0036f6eb8e99c145f30edff157687f5))
  - Fixed BigNumber string validation. ([#935](https://github.com/420integrated/fourtwentycoins.js/issues/935); [7e56f3d](https://github.com/420integrated/fourtwentycoins.js/commit/7e56f3d392e52815c5c859772b99660e0fc38ef5))

fourtwentycoins/v5.0.4 (2020-07-04 23:46)
--------------------------------

  - Prevent negative exponents in BigNumber. ([#925](https://github.com/420integrated/fourtwentycoins.js/issues/925); [84e253f](https://github.com/420integrated/fourtwentycoins.js/commit/84e253f3f9674b52fa2a17b097644e91e6474021))
  - Fixed StaticJsonRpcProvider when auto-detecting network. ([#901](https://github.com/420integrated/fourtwentycoins.js/issues/901); [0fd9aa5](https://github.com/420integrated/fourtwentycoins.js/commit/0fd9aa5cb6f4a3f9c1bea9b4eeee389700db01fa))
  - Added WebSocket static method to Alchemy provider and updated Alchemy URLs. ([4838874](https://github.com/420integrated/fourtwentycoins.js/commit/48388741272df8569315637f21df7c6519f79e2e))

fourtwentycoins/v5.0.3 (2020-06-29 00:50)
--------------------------------

  - Fixed typo in error string. ([7fe702d](https://github.com/420integrated/fourtwentycoins.js/commit/7fe702d59b0b81d2812e407b99a1e98e0e18ba03))
  - Updated elliptic package to address possible malleability issue; which should not affect 420coins. ([9e14345](https://github.com/420integrated/fourtwentycoins.js/commit/9e1434503e2a0280e9918c4eadb4d972b062b3b0))
  - Fixed FixedNumber unguarded constructor and added isZero. ([#898](https://github.com/420integrated/fourtwentycoins.js/issues/898); [08c74e9](https://github.com/420integrated/fourtwentycoins.js/commit/08c74e9a132f37ab8cc3fb5dab3bd1fd708ee702))
  - Added StaticJsonRpcProvider for reducing calls to chainId in certain cases. ([#901](https://github.com/420integrated/fourtwentycoins.js/issues/901); [c53864d](https://github.com/420integrated/fourtwentycoins.js/commit/c53864de0af55dd8ec8ca5681e78da380d85250a))
  - Allow getDefaultProvider to accept a URL as a network. ([8c1ff4c](https://github.com/420integrated/fourtwentycoins.js/commit/8c1ff4c862b8cecb04c98d71910870e0b73867a0))
  - Make network an optional parameter to WebSocketProvider. ([987b535](https://github.com/420integrated/fourtwentycoins.js/commit/987b5354cc18ed41620c43910ac163f358d91b5d))
  - Removed deprecated errors package. ([f9e9347](https://github.com/420integrated/fourtwentycoins.js/commit/f9e9347e69133354c3d65c1f47475ddac8a793cf))
  - Updated badges in docs. ([d00362e](https://github.com/420integrated/fourtwentycoins.js/commit/d00362eb706cfbf9911611e8d934260061cfbbd2))
  - Create security policy. Create security policy. ([88e6849](https://github.com/420integrated/fourtwentycoins.js/commit/88e68495b67d9268ee66362b08c9b691d03ab58a))

fourtwentycoins/v5.0.2 (2020-06-13 21:36)
--------------------------------

  - Allow provider.ready to stall until the network is available. ([#882](https://github.com/420integrated/fourtwentycoins.js/issues/882); [bbb4f40](https://github.com/420integrated/fourtwentycoins.js/commit/bbb4f407b34782c36ff93fa528e3b9f793987d4a))
  - Reduce dependencies to squash security issues. ([738d349](https://github.com/420integrated/fourtwentycoins.js/commit/738d34969d7c2184242b92f78228ba6a8aed1f3a))
  - Updated admin scripts for publishing prod releases. ([e0e0dbe](https://github.com/420integrated/fourtwentycoins.js/commit/e0e0dbef1830572c465670b826a7aa2b403ad2e8))

fourtwentycoins/v5.0.1 (2020-06-12 23:09)
--------------------------------

  - Fixed embedded package version strings. ([5a69e9c](https://github.com/420integrated/fourtwentycoins.js/commit/5a69e9caa882aa5f1b44c4453d67cde43254eafe))

fourtwentycoins/v5.0.0 (2020-06-12 19:58)
--------------------------------

  - Preserve config canary string. ([7157816](https://github.com/420integrated/fourtwentycoins.js/commit/7157816fa53f660d750811b293e3b1d5a2f70bd4))
  - Updated docs. ([9e4c7e6](https://github.com/420integrated/fourtwentycoins.js/commit/9e4c7e609d9eeb5f2a11d6a90bfa9d32ee696431))
