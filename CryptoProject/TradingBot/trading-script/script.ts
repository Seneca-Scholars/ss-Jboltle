import { Connection, Keypair, VersionedTransaction } from '@solana/web3.js';
import fetch from 'cross-fetch';
import { Wallet } from '@project-serum/anchor';
import bs58 from 'bs58';
import  prompt  from "prompt-sync";
import fs from 'fs';
import axios from 'axios';
import * as dotenv from 'dotenv'
const getTokenInput = () => { 
    // //this is a public method
    //  (like used in AP Comp Sci in HighSchool   
    //     that gets user input then returns that 
    //     value into a parameter for the bot in
    //      the infterface )

    const input = prompt()


    const token =  input("💰💰Please enter the token you want to trade💰💰")

    if (!token )
     {

        throw new Error ("Invalid token  (Not Token)" )

    }
    else if (token.length !== 44) {

      throw new Error ("Invalid Token Length")
    }

    return token
}




const inputToken = getTokenInput()









// It is recommended that you use your own RPC endpoint.
// This RPC endpoint is only for demonstration purposes so that this example will run.
const connection = new Connection('https://frequent-soft-thunder.solana-mainnet.quiknode.pro/f0fc862dbf5b61aa9b7be9aa0e046710c7b53c5b');

const wallet = new Wallet(Keypair.fromSecretKey(bs58.decode(process.env.SECRET_KEY | undefined )));
console.log(process.env.SECRET_KEY)

// Swapping SOL to USDC with input 0.1 SOL and 0.5% slippage
const quoteResponse = await (
  await fetch(`https://quote-api.jup.ag/v6/quote?inputMint=So11111111111111111111111111111111111111112\
&outputMint=${inputToken}\
&amount=10000000\
&slippageBps=50`
  )
).json();
// console.log({ quoteResponse })

// get serialized transactions for the swap
const { swapTransaction } = await (
  await fetch('https://quote-api.jup.ag/v6/swap', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      // quoteResponse from /quote api
      quoteResponse,
      // user public key to be used for the swap
      userPublicKey: wallet.publicKey.toString(),
      // auto wrap and unwrap SOL. default is true
      wrapAndUnwrapSol: true,
      // feeAccount is optional. Use if you want to charge a fee.  feeBps must have been passed in /quote API.
      // feeAccount: "fee_account_public_key"
    })
  })
).json();

// deserialize the transaction
const swapTransactionBuf = Buffer.from(swapTransaction, 'base64');
var transaction = VersionedTransaction.deserialize(swapTransactionBuf);
console.log(transaction);

// sign the transaction
transaction.sign([wallet.payer]);

// Execute the transaction
const rawTransaction = transaction.serialize()
const txid = await connection.sendRawTransaction(rawTransaction, {
  skipPreflight: true,
  maxRetries: 2
});
await connection.confirmTransaction(txid);
console.log(`https://solscan.io/tx/${txid}`);