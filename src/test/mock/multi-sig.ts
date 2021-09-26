export const publicKeys: string[] = [
  '026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01',
  '02c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b9',
  '03c6103b3b83e4a24a0e33a4df246ef11772f9992663db0c35759a5e2ebf68d8e9',
];

export interface IMockMultiSIg {
  publicKeys: string[];
  bitcoinAddress: string;
  redeemScript: string;
  numOfApprove: number;
}

export const mockMultiSig: IMockMultiSIg[] = [{
  publicKeys: publicKeys,
  bitcoinAddress: '35S6KvPkBrbgCEAUDPopKopJpJtHfJ1T7k',
  redeemScript: '5121026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e012102c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b92103c6103b3b83e4a24a0e33a4df246ef11772f9992663db0c35759a5e2ebf68d8e953ae',
  numOfApprove: 1,
}, {
  publicKeys: publicKeys,
  bitcoinAddress: '36NUkt6FWUi3LAWBqWRdDmdTWbt91Yvfu7',
  redeemScript: '5221026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e012102c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b92103c6103b3b83e4a24a0e33a4df246ef11772f9992663db0c35759a5e2ebf68d8e953ae',
  numOfApprove: 2,
}, {
  publicKeys: publicKeys.slice(-2),
  bitcoinAddress: '3NR48jRYdSQkgmmxff26yWbk97fBfQxmqW',
  redeemScript: '522102c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b92103c6103b3b83e4a24a0e33a4df246ef11772f9992663db0c35759a5e2ebf68d8e952ae',
  numOfApprove: 2,
}];