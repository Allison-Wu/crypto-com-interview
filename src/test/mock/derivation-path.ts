import { IDerivationPath, IPathLevel } from '../../stores/derivation-path-store';
import { mockMnemonics } from './mnemonic';

interface IMockDerivationPath {
  strBip32RootKey: string;
  accountPrivateKey: string;
  accountPublicKey: string;
  bip32PrivateKey: string;
  bip32PublicKey: string;
  derivationPath: string;
}

export const mockPathLevel: IPathLevel = {
  purpose: 44,
  coin: 0,
  account: 0,
  change: 0,
};

export const mockDerivationPath: IMockDerivationPath = {
  ...mockPathLevel,
  derivationPath: 'm/44\'/0\'/0\'/0',
  strBip32RootKey: 'xprv9s21ZrQH143K3UvzqPzQZ3hQ93Ui3J2HbXQ9DL49UVh1pCKSvvTLJfgy74z8vVuSsSH28gojxYndfwBkGQmbNHkUxMHzhmmV6KZ2d6x1ueU',
  bip32PrivateKey: 'xprvA2NYicXkRbq5QvuZ94GLTsm3Z3wMiKGUDe2En8xNxDHyMWmurxiZsBPptRQt3GbJtondeBxwGYQ2ZLCCMiaHoSrCpp3WQM4YGV1auJgE59M',
  bip32PublicKey: 'xpub6FMu884eFyPNdQz2F5oLq1hn75mr7mzKarwqaXMzWYpxEK74QW2pQyiJjhvvNHQdMGL3JNMuxn5gv1Je78HRaRcvwq6kK6728rizsh2cRVH',
  accountPrivateKey: 'xprv9xh8YoJTby3jPZCYU1rYXkbSXbZsdF9js218eiJjhbTPH2YZ6ag4ntc2V1VkyfbufmgY5ZTWxM7TYo7CXFfGDJBsAnh3e9HPfYMhBfnwBjH',
  accountPublicKey: 'xpub6BgUxJqMSLc2c3H1a3PYttYB5dQN2hsbEEvjT6iMFvzN9pshe7zKLgvWLH2KKhznMWRJG3dKg59A7kdREQQ3Dcvo5uSEoKHyx4eYE6DKA2W',
};