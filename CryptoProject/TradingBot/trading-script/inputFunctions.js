import PromptSync from 'prompt-sync';
import prompt from 'prompt-sync';



export const getTokenInput = () => {
const prompt = PromptSync()
  let validToken = false
  while (!validToken) {

    const token = prompt("💰💰 Please enter the token you want to trade 💰💰: ");
    
    if (!token) {
      console.log("Invalid token (No Token Entered)");
    } 
    else if (token.length !== 44) {
       console.log("Invalid Token Length");
    }

    else {
    
      validToken = true 
    
      return token
        
    
    }


  
  
  }

  
  };
 export const getTradeAmount = () => {
const prompt = PromptSync()
let isValidNumber = false
while (!isValidNumber) {


  const tradeAmount = prompt("💰💰Please enter the USDC you want to trade💰💰: ")
  
  if (Number.isInteger(parseInt(tradeAmount)))
    
    {
      isValidNumber = true
      return tradeAmount
      
    }
    
    else {
      console.log(`Integer Expected, recieved ${typeof tradeAmount}`)
      
    }
  }

}
