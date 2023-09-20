import { Client, Wallet } from 'xrpl';

async function connect() {
    const client = new Client('wss://s.altnet.rippletest.net:51233');
    console.log("Connecting to Testnet...");
    await client.connect();

    client.disconnect();
}
function main() {
    connect();
}

main();
