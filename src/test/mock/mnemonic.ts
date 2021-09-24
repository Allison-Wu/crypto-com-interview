import { englishWordList } from '../../libs/english-word-list';

export interface IMockMnemonic {
  numOfWords: number;
  randomValue: Buffer;
  entropy: string;
  checksum: string;
  indexes: number[];
  words: string[],
  wordList: string[];
  rootKey?: string;
  seed?: string;
}

export const mockMnemonics: IMockMnemonic[] = [{
  numOfWords: 3,
  randomValue: Buffer.from([245, 110, 160, 17]),
  entropy: '11110101011011101010000000010001',
  checksum: '0',
  indexes: [1963,936,34],
  words: ['voice', 'insect', 'affair'],
  wordList: englishWordList,
  seed: 'd6d266f839a22e7519c066f0ede35621fe349ce76b8e546bb5fd1ab41fc465d3fbbb60259436e04d135273cd0d7b11fa8d436758a1288059a75723dfba77c0f3',
  rootKey: 'xprv9s21ZrQH143K2WbKbYnWN8mw4keVWNTvHq6PsGZhoXvHBjWA8RLtNMxzXyHRNK3RBiJoArnCudnJHaECjJoMdZPbztDX85YUvi9CLyUjA8Y',
}, {
  numOfWords: 6,
  randomValue: Buffer.from([70, 109, 240, 183, 175, 194, 111, 152]),
  entropy: '0100011001101101111100001011011110101111110000100110111110011000',
  checksum: '11',
  indexes: [563,892,367,764,311,1635],
  words: ['edit','hurdle','combine','garbage','cheap','small',],
  wordList: englishWordList,
  rootKey: 'xprv9s21ZrQH143K2zbKXeM5JUG59puJu9tt2RSVKZCWTmmNDYrw7gLLkRyhiAUndjkr7wj7ew61z9mxW5KuiKrciRfXs6gySPQHQwDMvsaWna6',
  seed: '19b2befac4132cd22652d41c3800bf8b91a8fed1aa38e46675d1a5161d1e5b401880ecd71bcc55aba2e16848e3025b6a0f94d20fc576dd694ec4194fcd870112',
}, {
  numOfWords: 9,
  randomValue: Buffer.from([51, 46, 83, 220, 94, 143, 78, 90, 174, 91, 22, 62]),
  entropy: '001100110010111001010011110111000101111010001111010011100101101010101110010110110001011000111110',
  checksum: '011',
  indexes: [409,916,1976,1512,1959,362,1483,790,499],
  words: ['creek','income','warfare','rug','visual','coil','ride','glare','dinosaur',],
  wordList: englishWordList,
  rootKey: 'xprv9s21ZrQH143K2A2aZgy4pL2vkcUDLug5bY3DMzjQhcyLn7neuYFttuLZXBccyaSD8yBex8MLZcg2QZ53pHkb3tK4rJsYSWFWWmyixMAhaiX',
  seed: '443494110b72b27779d2690496c39c628d4bec1379e23d82134f80dc478a1f3b44c1e19c4239c450452c7bb761afed40faeff9f2cfbf3a83e0e07a97991d5023',
}, {
  numOfWords: 12,
  randomValue: Buffer.from([167, 240, 138, 41, 200, 61, 251, 52, 156, 204, 217, 64, 227, 198, 136, 102]),
  entropy: '10100111111100001000101000101001110010000011110111111011001101001001110011001100110110010100000011100011110001101000100001100110',
  checksum: '0110',
  indexes: [1343,1058,1107,1155,1789,1234,921,1241,519,241,1296,1638],
  words: ['pony','lounge','media','motor','text','olympic','industry','open','domain','bullet','pear','smoke',],
  wordList: englishWordList,
  rootKey: 'xprv9s21ZrQH143K4CUqswWGSAxiy6aGq6NgvsTqopJMLLJ7pfmJ66ASuPG3JwCL4kUH2EAXL8yvrgDVRTTnPhAU7gEsBbYCTbk2ARiKqTpqCm9',
  seed: '40f3f5697a584ce53003d36fa5d77e1c4b222c70778875da17618946ded243676dc975e4afa4908a592f4f4a4186c7f8ddf91ff1e350beeb8628c4f414125edc',
}, {
  numOfWords: 15,
  randomValue: Buffer.from([114, 32, 234, 48, 5, 49, 19, 31, 20, 71, 190, 16, 106, 50, 176, 86, 160, 246, 159, 204]),
  entropy: '0111001000100000111010100011000000000101001100010001001100011111000101000100011110111110000100000110101000110010101100000101011010100000111101101001111111001100',
  checksum: '01110',
  indexes: [913,58,1120,83,137,1148,648,1982,131,652,1376,1386,123,639,398],
  words: ['impulse','also','metal','apology','bachelor','moon','extra','water','away','face','project','pull','author','exit','crack',],
  wordList: englishWordList,
  rootKey: 'xprv9s21ZrQH143K4QkFmG8crmTkveeoYF7iSuJdWZNSxJxCihSQVxnM56ea5w7Ai5CxUDWkqMJE1p8Gs8kGqzaxqdgSwryTCowLw7BM9x7Ssu5',
  seed: '91db8263004e5a3ca5254c33ed9e05961f11175cfc74f7f1488e4d7e5ff4b2b0cacec8da8fe9495985a94af7f6159e45feaae5a0f6b69620ed326b8a27a16bc7',
}, {
  numOfWords: 18,
  randomValue: Buffer.from([73, 168, 232, 10, 113, 164, 139, 121, 246, 0, 9, 195, 15, 113, 200, 106, 192, 178, 208, 119, 127, 107, 154, 203]),
  entropy: '010010011010100011101000000010100111000110100100100010110111100111110110000000000000100111000011000011110111000111001000011010101100000010110010110100000111011101111111011010111001101011001011',
  checksum: '100100',
  indexes: [589,570,20,1818,581,1511,1728,9,1560,988,912,1708,89,833,1775,1899,1238,740],
  words: ['endless','elder','action','today','emerge','rude','submit','abuse','seek','knee','improve','stereo','arctic','habit','target','uniform','onion','frame',],
  wordList: englishWordList,
  rootKey: 'xprv9s21ZrQH143K2z1TqH6KPeNQ1DYndABZyaMtmwV4uf1s4NtzqqmEx9sKSqufZsbR4SgBMVQzNk7vzuxCank5RTtX2Nreoj1rWg54rk5Q9kP',
  seed: '235e9e23f860f94db7e288a9c01d9e3db208e9cf8308a17e4be186b7d04239f49a832b4e96d60519da936fc5110a0c40f69b922d2dae24d356214d3ea63cea06',
}, {
  numOfWords: 21,
  randomValue: Buffer.from([46, 92, 131, 160, 206, 81, 109, 94, 199, 198, 232, 65, 175, 239, 31, 138, 4, 215, 206, 208, 43, 200, 143, 105, 75, 3, 233, 153]),
  entropy: '00101110010111001000001110100000110011100101000101101101010111101100011111000110111010000100000110101111111011110001111110001010000001001101011111001110110100000010101111001000100011110110100101001011000000111110100110011001',
  checksum: '0001000',
  indexes: [370,1824,1857,1253,182,1403,248,1768,525,1019,1599,160,619,1851,517,968,1147,594,1543,1689,1160],
  words: ['comic','tomato','trial','original','bitter','quarter','business','tackle','double','legal','side','beef','estate','trash','doll','jungle','month','engage','science','spring','much',],
  wordList: englishWordList,
  rootKey: 'xprv9s21ZrQH143K3wdfF4Ytk4RaxfPHUXK7UJH4ZbrqktN2Qf7ehPb7n5bkZ9PLBmEgHcQGEMC5BmaX1f1b8mDFbUjDF2A2QAW25WF9LTkjWGQ',
  seed: '4af88d2b976ae22345a71e769411fa5ca9d05bab76035402e12a2587809fb7132876defc80ccb8509752eed14d1be12c1608f3613bef2487ea00a5270b5309fd',
}, {
  numOfWords: 24,
  randomValue: Buffer.from([96, 225, 96, 249, 8, 103, 170, 68, 104, 50, 35, 144, 209, 35, 47, 174, 222, 77, 231, 94, 36, 143, 17, 31, 38, 28, 46, 236, 206, 86, 104, 206]),
  entropy: '0110000011100001011000001111100100001000011001111010101001000100011010000011001000100011100100001101000100100011001011111010111011011110010011011110011101011110001001001000111100010001000111110010011000011100001011101110110011001110010101100110100011001110',
  checksum: '10010110',
  indexes: [775,88,498,134,981,273,1286,547,1158,1096,1631,749,1830,1949,964,1167,136,1993,1080,750,1639,345,1305,1686],
  words: ['genius','arch','dinner','awkward','kingdom','captain','patch','dutch','move','math','slogan','frozen','tooth','victory','joy','music','baby','weird','mandate','fruit','smooth','clinic','permit','spot',],
  wordList: englishWordList,
  seed: 'eb4546168a5287c76537236410917703bfdcf5505c13a305a85b38625dae43efd39898e92cf06ee1460d150dccdf26bbcfd4822fbb002a9832c0628a453496f1',
  rootKey: 'xprv9s21ZrQH143K3TRtSPNoV543UDA8Pub1YQutHNKwgE7RHKzcKy8xmPnYn2oUvB23jKenwSx8ZDjGqnFyyTaq8ztDTjMyLg8Gb6fvGbcVdby',
}];