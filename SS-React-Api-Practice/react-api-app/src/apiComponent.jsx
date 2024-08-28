
import { useEffect } from "react"
import { useState } from "react";



//we pass in endpoint as a prop from ./app 
//it auto imports the state variable. 
  export const ApiNameFetch = ({endPoint}) => {
    
    

    
    
   const [apiData, setApiData] = useState([]);
    useEffect( () => {
        const fetchData = async () => {
          console.log(endPoint)
            const response = await fetch(`/api/${endPoint}`)

            let data = await response.json()
                console.log(data)
                setApiData(data)
            }
            fetchData()
               
    }, [endPoint])//the brackets represent the onChange for the use effect, so we pass in the state variable and when the state variable changes, the effect is rendered again
        return (
                <div>

                        <p>


                        {
          JSON.stringify(apiData)
        }
                            </p>
                    

                        

                </div>

        )



}


