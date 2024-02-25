import Web3 from "web3";
let AVAAbi = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "did",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_schemas",
                "type": "string"
            }
        ],
        "name": "createCreSchemas",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "data",
        "outputs": [
            {
                "internalType": "string",
                "name": "data",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "walletAddr",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "dataCredSchemas",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "isRevokeCred",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "credId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "did",
                "type": "string"
            }
        ],
        "name": "revokeStatusCred",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "did",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_data",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "_wallet",
                "type": "address"
            }
        ],
        "name": "setUpDIDIssuer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "usedDID",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "usedWallet",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]


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
