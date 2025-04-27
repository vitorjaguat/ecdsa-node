import server from './server';
// import { privateKeyToAddress } from '../../server/scripts/privateKeyToAddress';

import { toHex } from 'ethereum-cryptography/utils';
import { keccak256 } from 'ethereum-cryptography/keccak';
import secp from 'ethereum-cryptography/secp256k1';

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
function Wallet({
  address,
  setAddress,
  balance,
  setBalance,
  privateKey,
  setPrivateKey,
}) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    const addressFromPrivateKey = privateKeyToAddress(privateKey);
    setAddress(addressFromPrivateKey);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${addressFromPrivateKey}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className='container wallet'>
      <h1>Wallet</h1>
      <label>
        Your Private Key (this won't leave the client-side, we promise!)
        <input
          placeholder='Type your private key, to sign transactions'
          value={privateKey}
          onChange={onChange}
        ></input>
      </label>

      <label>Your Address: {address}</label>

      <div className='balance'>Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
