import { Client, Wallet } from 'xrpl';

async function connect() {
    const client = new Client('wss://s.altnet.rippletest.net:51233');
    console.log("Connecting to Testnet...");
    await client.connect();
    const { wallet } = await creat_account(); 

    client.disconnect();
}

async function creat_account() {
    const client = new Client('wss://s.altnet.rippletest.net:51233');
    await client.connect();
    const wallet = await client.fundWallet();
    console.log("wallet info:\n", wallet, "\n\n");

    const message = await client.request({
        "id": 2,
        "command": "account_info",
        "account": wallet.wallet.classicAddress,
        "strict": true,
        "ledger_index": "validated",
        "api_version": 1
    });
    
    console.log(`account info response:\n ${wallet.wallet.classicAddress}`);
    console.log(message);
    client.disconnect();
    return(wallet);
}

function main() {
        
    connect();
}

main();
