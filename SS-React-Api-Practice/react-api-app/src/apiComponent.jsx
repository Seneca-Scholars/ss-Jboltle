import { useState, useEffect } from 'react';

export const ApiNameFetch = ({ endPoint }) => {
  const [apiData, setApiData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (!endPoint) return; // Don't run if endPoint is not set
      console.log(endPoint);
      try {
        const response = await fetch(`http://localhost:3001/api${endPoint}`);
        const data = await response.json();
        console.log(data);
        setApiData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [endPoint]); // Dependency array, useEffect runs when endPoint changes

  return (
    <div>
      <p>{JSON.stringify(apiData)}</p>
    </div>
  );
};

