import { useState } from 'react';
import server from './server';
import { toHex, hexToBytes, utf8ToBytes } from 'ethereum-cryptography/utils';
import { keccak256 } from 'ethereum-cryptography/keccak';
import * as secp from 'ethereum-cryptography/secp256k1';
// import * as noble from '@noble/secp256k1';

function Transfer({ address, setBalance, privateKey }) {
  const [sendAmount, setSendAmount] = useState('');
  const [recipient, setRecipient] = useState('');

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    // Sign the transaction with the private key
    // Generate the message hash
    const message = `Send ${parseInt(sendAmount)} to ${recipient}`;
    const messageBytes = utf8ToBytes(message);
    const messageHash = keccak256(messageBytes);

    // Convert private key from hex string to Uint8Array
    const privateKeyBytes = hexToBytes(privateKey);

    // Use the correct signature method
    const [signatureUint8Array, recoveryBit] = await secp.sign(
      messageHash,
      privateKeyBytes,
      {
        recovered: true,
      }
    );

    // Convert the signature to hex for transport
    const signature = toHex(signatureUint8Array);
    console.log('Signature Uint:', signatureUint8Array);
    console.log('Signature Hex:', signature);
    console.log('Recovery Bit:', recoveryBit);

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
        signature,
        message: toHex(messageHash),
        recoveryBit,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className='container transfer' onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder='1, 2, 3...'
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder='Type an address, for example: 0x86faf0680702a5177f139183d03a1c9ff98d0b65'
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type='submit' className='button' value='Transfer' />
    </form>
  );
}

export default Transfer;
