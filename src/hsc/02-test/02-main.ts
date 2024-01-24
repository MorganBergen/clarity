import { Client, Wallet, TxResponse, Transaction } from "xrpl";

var xrpl = require('xrpl');

interface cst_result_type {
  contractAddress: string;
  transactionHash: string;
  result: string;
}



async function main() {
   
    const client = new Client('wss://s.altnet.rippletest.net:51233/');

    console.log(`connecting to testnet...`);

    await client.connect();

    if (client.isConnected()) {
        
        console.log(`connected to testnet at port 51233`);

    }
    
    const hot_wallet = (await client.fundWallet()).wallet;
    
    const cold_wallet = (await client.fundWallet()).wallet;
    
    console.log(`issuer account cold wallet`);
    
    console.log(cold_wallet);
    
    console.log(`someone account hot wallet`);
    
    console.log(hot_wallet);

    console.log(`cold wallet transactions settings`);
   
    const cold_settings_tx: xrpl.AccountSet = {
        TransactionType: "AccountSet",
        Account: cold_wallet.address,
        TransferRate: 0,
        TickSize: 5,
        Domain: "6578616D706C652E636F6D", // example.com
        SetFlag: xrpl.AccountSetAsfFlags.asfDefaultRipple,
        Flags: (xrpl.AccountSetTfFlags.tfDisallowXRP |
                xrpl.AccountSetTfFlags.tfRequireDestTag)
    };

    console.log(cold_settings_tx);
    
    // cst stands for cold settings transaction
    const cst_prepared = await client.autofill(cold_settings_tx);
    
    const cst_signed = cold_wallet.sign(cst_prepared);

    console.log(`sending cold address AccountSet transaction...`);

    const cst_result: TxResponse<Transaction> = await client.submitAndWait(cst_signed.tx_blob) as TxResponse<Transaction>;

    client.disconnect();

    return(0);
}

main();
