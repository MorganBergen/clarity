if (typeof module !== "undefined")
    var xrpl = require('xrpl')
}

async function main() {

    const client = new xrpl.Client('wss://s.altnet.rippletest.net:51233');
    console.log(`connecting to testnet...`);
    await client.connect();

    console.log(`requesting addresses from the testnet facuet`);
    const hot_wallet = (await client.fundWallet()).wallet;
    const cold_wallet = (await client.fundWallet()).wallet;
    console.log(`hot address ${hot_wallet.address} and cold address ${cold_wallet.address}`);

    const cold_settings_tx = {
    
    }

    const cst_prepared = await client.autofill(cold_settings_tx);
    const cst_signed = cold_wallet.sign(cst_prepared);

    console.log(`sending cold address accountset transaction...`);
    const cst_result = await client.submitAndWait(cst_signed.tx_blob);

    if (cst_result.result.meta.TransationResult == "tesSUCCESS") {
        console.log(`transaction succeeded: https://testnet.xrpl.org.transaction/${cst_signed.hash}`) 
    } else {
        throw (`error sending transaction: ${cst_result}`);
    }

    const hot_settings_tx = {

    }

    const hst_prepared = await client.autofill(hot_settings_tx);
    const hst_signed = hot_wallet.sign(hst_prepared);

    console.log(`sending hot address AccountSet transaction...`);

    const hst_result = await client.submitAndWait(hst_signed.tx_blob);
    
    if (hst_result.result.meta.TransactionResult == "tesSUCCESS") {
        console.log(`transaction succeeded:  https://testnet.xrpl.org/transactions/${hst_signed.hash}`);
    } else {
        throw (`Error sending transaction 






























