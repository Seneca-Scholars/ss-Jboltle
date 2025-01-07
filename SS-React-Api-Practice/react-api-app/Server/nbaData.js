import axios from 'axios'

export const getNbaData = async () => {


    const url  = `https://api.balldontlie.io/v1/teams`
    const request = await axios.get(url, {
        headers: {
            Authorization: "69dd6f21-83a8-4135-bdbc-032335c72da9",
            Accept: 'application/json'
            
        }
    })
    const data = await request.data
    
return data
} 
