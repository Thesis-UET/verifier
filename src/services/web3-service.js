import Web3 from "web3";
const AVAAbi = require('../assets/abis/AvaDID.json')

const ava = "0x18d9090e91dC5b71c9e9FeD5611e3a4711DAA170";
const web3 = new Web3("https://rpc.ankr.com/avalanche_fuji");
const contract = new web3.eth.Contract(AVAAbi, ava);

export async function isRevoke(did, credId) {
    const txData = await contract.methods
        .isRevokeCred(
            did, // did
            credId
        )
        .call();
    console.log(txData);
}
export async function getSchemas(did) {
    const txData = await contract.methods
        .dataCredSchemas(
            did // did
        )
        .call();
    console.log(txData);
    return txData;
}

export async function getDid(did) {
    const txData = await contract.methods
        .data(
            did // did
        )
        .call();
    console.log(txData.data);
    return txData.data;
}

getSchemas("did:avax:zDnaeWzcHdM7gTqVhGY2n8TSf9UKDWoh9rT2YdoWGpsycr9DJ");
