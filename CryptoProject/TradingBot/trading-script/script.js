"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var web3_js_1 = require("@solana/web3.js");
var cross_fetch_1 = require("cross-fetch");
var anchor_1 = require("@project-serum/anchor");
var bs58_1 = require("bs58");
var prompt_sync_1 = require("prompt-sync");
var getTokenInput = function () {
    // //this is a public method
    //  (like used in AP Comp Sci in HighSchool   
    //     that gets user input then returns that 
    //     value into a parameter for the bot in
    //      the infterface )
    var input = (0, prompt_sync_1.default)();
    var token = input("💰💰Please enter the token you want to trade💰💰");
    if (!token) {
        throw new Error("Invalid token  (Not Token)");
    }
    else if (token.length !== 44) {
        throw new Error("Invalid Token Length");
    }
    return token;
};
var inputToken = getTokenInput();
// It is recommended that you use your own RPC endpoint.
// This RPC endpoint is only for demonstration purposes so that this example will run.
var connection = new web3_js_1.Connection('https://frequent-soft-thunder.solana-mainnet.quiknode.pro/f0fc862dbf5b61aa9b7be9aa0e046710c7b53c5b');
var wallet = new anchor_1.Wallet(web3_js_1.Keypair.fromSecretKey(bs58_1.default.decode(process.env.SECRET_KEY | undefined)));
console.log(process.env.SECRET_KEY);
// Swapping SOL to USDC with input 0.1 SOL and 0.5% slippage
var quoteResponse = await (await (0, cross_fetch_1.default)("https://quote-api.jup.ag/v6/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=".concat(inputToken, "&amount=10000000&slippageBps=50"))).json();
// console.log({ quoteResponse })
// get serialized transactions for the swap
var swapTransaction = (await (await (0, cross_fetch_1.default)('https://quote-api.jup.ag/v6/swap', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        // quoteResponse from /quote api
        quoteResponse: quoteResponse,
        // user public key to be used for the swap
        userPublicKey: wallet.publicKey.toString(),
        // auto wrap and unwrap SOL. default is true
        wrapAndUnwrapSol: true,
        // feeAccount is optional. Use if you want to charge a fee.  feeBps must have been passed in /quote API.
        // feeAccount: "fee_account_public_key"
    })
})).json()).swapTransaction;
// deserialize the transaction
var swapTransactionBuf = Buffer.from(swapTransaction, 'base64');
var transaction = web3_js_1.VersionedTransaction.deserialize(swapTransactionBuf);
console.log(transaction);
// sign the transaction
transaction.sign([wallet.payer]);
// Execute the transaction
var rawTransaction = transaction.serialize();
var txid = await connection.sendRawTransaction(rawTransaction, {
    skipPreflight: true,
    maxRetries: 2
});
await connection.confirmTransaction(txid);
console.log("https://solscan.io/tx/".concat(txid));
