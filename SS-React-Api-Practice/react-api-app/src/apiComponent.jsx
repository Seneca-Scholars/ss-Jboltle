
import { useEffect } from "react"
import { useState } from "react";
  export const ApiNameFetch = () => {
    
    
    
    
    
   const [apiData, setApiData] = useState([]);
    useEffect( () => {
        const fetchData = () => {

            fetch('/api')
            .then(response => response.json())
            .then(data => {
              console.log(data);
              setApiData(data)
              // Set the fetched user object
            })
            .catch(error => {
              console.error('Error fetching data:', error);
            });
            }
            fetchData()
               
    }, [])
        return (
                <div>

                        <p>


                        {
          // Example of displaying data
          apiData.map((item, index) => (
            <div key={index}>{JSON.stringify(item)}</div>
          ))
        }
                            </p>
                    

                        

                </div>

        )



}


