
import  axios from 'axios';
import * as dotenv from "dotenv";

import fs from 'fs';

dotenv.config({
    path: ".env",
  });


  const getSolanaQuote = async () => {


        try {
              const response = await axios.get('https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=SOL', {
                  headers: {
                      'X-CMC_PRO_API_KEY': process.env.SOLANA_PRICE_API_KEY,
                    },
                });
            
                // console.log(response.data.sol[1].quote.usd.price)

                const data = response.data
                const USD_QUOTE = data.data.SOL[0].quote.USD.price
                


return USD_QUOTE
            
            } 
            
            
            catch(error) {
            console.log("Data request failed")
    }

}

getSolanaQuote()