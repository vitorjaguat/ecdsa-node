const secp = require('ethereum-cryptography/secp256k1');
const { toHex, hexToBytes } = require('ethereum-cryptography/utils');
const { keccak256 } = require('ethereum-cryptography/keccak');

// generate private keys
const privateKey = secp.utils.randomPrivateKey();
console.log('Private Key:', toHex(privateKey));

// generate public keys
const publicKey = secp.getPublicKey(privateKey);
console.log('Public Key:', publicKey);
