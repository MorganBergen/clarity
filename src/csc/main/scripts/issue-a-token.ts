import { Client, Wallet } from 'xrpl';

async function main() {
    const client = new Client('wss://s.altnet.rippletest.net:51233');
    console.log("Connecting to Testnet...");
    await client.connect();

    client.disconnect();
}

main();
