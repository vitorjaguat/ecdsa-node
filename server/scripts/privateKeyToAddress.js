const { toHex, hexToBytes } = require('ethereum-cryptography/utils');
const { keccak256 } = require('ethereum-cryptography/keccak');
const secp = require('ethereum-cryptography/secp256k1');

// generate address from hex private key
function privateKeyToAddress(privateKey) {
  // Get public key from private key
  const publicKey = secp.getPublicKey(privateKey);
  // Remove 0x04 prefix
  const sliced = publicKey.slice(1);
  // Hash the public key using keccak256
  const hash = keccak256(sliced);
  // Convert the last 20 bytes of the hash to hex
  const address = toHex(hash.slice(-20));
  // Add 0x prefix and return
  return '0x' + address;
}

module.exports = privateKeyToAddress;

console.log(
  privateKeyToAddress(
    'e9762928df7eef0756d56b1a1182d83d1dd36ecb65670be0929984ab8cd8aadf'
  )
);
