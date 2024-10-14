import { LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js";
import { ArbBot, SwapToken } from './bot';
import  * as dotenv from "dotenv";

import prompt = require('prompt-sync');









dotenv.config({
    path: ".env",
});

const defaultConfig = {
    solanaEndpoint: clusterApiUrl("mainnet-beta"),
    jupiter: "https://quote-api.jup.ag/v6",
};




  const getTokenInput = () => { 
    // //this is a public method
    //  (like used in AP Comp Sci in HighSchool   
    //     that gets user input then returns that 
    //     value into a parameter for the bot in
    //      the infterface )


    const input = prompt();
    const token : string = input ("✅Please enter a valid token✅")
    
    
    if (!token || token == null || token.length !== 44) {
        
        console.log(Error , "Invalid token ❌")
        throw new Error 
    }


    

    return token
}


export const tokenValue = getTokenInput()

async function main() {



    

    if (!process.env.SECRET_KEY) {
        throw new Error("SECRET_KEY environment variable not set");
    }
    let decodedSecretKey = Uint8Array.from(JSON.parse(process.env.SECRET_KEY));
    getTokenInput()
    const bot = new ArbBot({
        solanaEndpoint: process.env.SOLANA_ENDPOINT ?? defaultConfig.solanaEndpoint,
        metisEndpoint: process.env.METIS_ENDPOINT ?? defaultConfig.jupiter,
        secretKey: decodedSecretKey,
        firstTradePrice: 0.11 * LAMPORTS_PER_SOL,
        targetGainPercentage: 1.5,
        initialInputToken: SwapToken.SOL,
        initialInputAmount: .02,
    });

    await bot.init();

}

main().catch(console.error);