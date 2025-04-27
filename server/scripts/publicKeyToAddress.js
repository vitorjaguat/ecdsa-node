const { toHex, hexToBytes } = require('ethereum-cryptography/utils');
const { keccak256 } = require('ethereum-cryptography/keccak');

// generate address from hex public key
function publicKeyToAddress(publicKey) {
  // Convert hex string to Uint8Array
  const publicKeyUint8Array = hexToBytes(publicKey);
  // Remove 0x04 prefix
  const sliced = publicKeyUint8Array.slice(1);
  // Hash the public key using keccak256
  const hash = keccak256(sliced);
  const address = toHex(hash.slice(-20));
  console.log('Address:', address);
  return '0x' + address;
}

module.exports = publicKeyToAddress;

// console.log(
//   publicKeyToAddress(
//     '04e5ba023b6f188fddf7c5310fefc298e2db69308625a35f1986e8c01cbe0f93b1f80515a30e203ee388357141a95d6f083f5a74f43c92a5de47fce4f813211322'
//   )
// );
