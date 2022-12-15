const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';
const merkleTree = new MerkleTree(niceList);

const [name] = process.argv.slice(2)

async function main() {
  if (!name) {
    console.log('Pass name argument to client script please!');
    return;
  }

  const index = niceList.findIndex(n => n === name);
  const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof: JSON.stringify(proof),
    name,
  });

  console.log({ gift });
}

main();