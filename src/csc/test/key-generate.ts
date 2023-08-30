/**
 * @file        key-generate.ts
 * @date        august 30 2023
 * @author      morgan bergen
 * @brief       generate keys for testing
 */

import { Client, Wallet, TrustSet, AccountSet, AccountSetAsfFlags, TrustSetFlags } from "xrpl";

async function main() {
    console.log("generating keys");
}

async function generateKeys() {
    const client = new Client('wss://s.altnet.rippletest.net:51233');
    const wallet = await client.fundWallet();
}

main();