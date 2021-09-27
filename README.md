# Allison crypto.com interview

[The site](https://allison-crypto-com-interview.s3.amazonaws.com/index.html) deployed to AWS S3 + CloudFront for your preview, please check the docs as below:

## The libraries are used in this project
### Front End
**material-ui** - The React UI library

**redux-toolkit** - Redux state management for react, redux toolkit is a set of tools which maintains the states better.

### Data Handling
**bitcoinjs-lib** - A javascript Bitcoin library for node.js and browsers. Used for getting payment address, p2ms and p2sh.

**bip39** - use it for getting the seed from mnemonic words.

**bip32** - use it for getting the root key and calculating the extended key and derived addresses.

## Generate Logic Flow
### Basic
- According to the number of words, generate an entropy (between 128 and 256 bits), which is the source of randomness.

- Convert entropy to Mnemonic.[Hashing the entropy through SHA256 to get checksum and combine it with the entropy to get the corresponding words as mnemonic sentence.]

- Mnemonic to Seed.[put the mnemonic sentence through the PBKDF2 function. This basically hashes the mnemonic (+ optional passphrase) multiple times until it produces a final 64 byte (512 bit) result.]

- Seed to HDWallet, HDWallet to generate the extended public/private key

- Keys to addresses (Propose in BIP32 / BIP44)

### (Bonus) multi-sig
- Public key string to hex and combine as the array.
- Generate the redeem script with the bitcoin-lib p2ms payment method.
- Generate P2SH address with the bitcoin-lib p2sh payment method.

## Is it easy to use
Maybe yes?
The UI built in simple way, yet, the page response is effective because of lazy loading for the derivation address.

## Is it safe for users to use
Yes.
All data is generated on the page and the page does not save any data in cookies and tmp storages.

## Does it follow any practices
The Code implemented in Typescript and checked quality by eslint.

## Are there any test cases coverage
You can run below command to run test
```
  yarn test
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

**if you want to debug with the redux devTools, set `STAGE=dev` in your environment parameters.**

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.