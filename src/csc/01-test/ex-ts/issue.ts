import { Client, AccountSetAsfFlags, AccountSetTfFlags } from 'xrpl';

async function main() {

    // 1.  connect
    const client = new Client('wss://s.altnet.rippletest.net:51233');
    console.log(`connecting to testnet...`);
    await client.connect();

    // 2.  get credentials from the testnet faucet
    consol.warn(`getting credentials from faucet...`);
    h
