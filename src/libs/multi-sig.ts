import * as bitcoin from 'bitcoinjs-lib';

export class MultiSig {
  static getP2ms(publicKeys: string[], numOfApprove: number) {
    if (!numOfApprove || numOfApprove > publicKeys.length) {
      throw new Error (`Invalid numOfApprove[${numOfApprove}]!`);
    }
    const pubKeys = publicKeys.map(s => Buffer.from(s, 'hex'));
    return bitcoin.payments.p2ms({m: numOfApprove, pubkeys: pubKeys});
  }

  static getP2sh(p2ms: bitcoin.payments.Payment) {
    return bitcoin.payments.p2sh({ redeem: p2ms });
  }

  static calcP2sh(publicKeys: string[], numOfApprove: number) {
    const p2ms = this.getP2ms(publicKeys, numOfApprove);
    return {
      p2ms,
      p2sh: this.getP2sh(p2ms),
    };
  }
}