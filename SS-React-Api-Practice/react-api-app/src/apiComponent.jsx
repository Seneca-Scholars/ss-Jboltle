import { useState, useEffect } from 'react';

export const ApiNameFetch = ({ endPoint }) => {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    let isMounted = true;

    console.log('useEffect triggered with endPoint:', endPoint);

    const fetchData = async () => {
      if (!endPoint) {
        console.log('No endPoint provided, clearing data.');
        setApiData(null); // Clear data if no endpoint
        return;
      }
      console.log('Fetching data for endPoint:', endPoint);
      try {
        const response = await fetch(`http://localhost:3001/api${endPoint}`);
        const data = await response.json();
        if (isMounted) {
          console.log('Data fetched:', data);
          setApiData(data);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();

    return () => {
      console.log('Cleanup for endPoint:', endPoint);
      isMounted = false;
    };
  }, [endPoint]);

  return (
    <div>
      <p>{apiData ? JSON.stringify(apiData) : 'No data available'}</p>
    </div>
  );
};
