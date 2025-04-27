const express = require('express');
const app = express();
const cors = require('cors');
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  '0x9045921e896f837fcca1ddcdc42377217b2f3fbd': 100, // ALASKA
  '0x86faf0680702a5177f139183d03a1c9ff98d0b65': 50, // LA PROHIBIDA
  '0xed1dfec14b98306478e2af7400f28f26c4b0b295': 75, // JAVIERA
};

app.get('/balance/:address', (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post('/send', (req, res) => {
  // TODO: get a signature from the client
  // recover the public address from the signature
  // that address should be the sender

  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: 'Not enough funds!' });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
