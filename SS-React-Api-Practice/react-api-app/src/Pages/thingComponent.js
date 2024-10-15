import { useEffect, useState } from "react";

export const ThingComponent = () => {
  const [thing, setThing] = useState([]);

  const getThings = async () => {
    const response = await fetch("/api/things");
    const data = await response.json();
    setThing(data);
  };

  useEffect(() => {
    getThings();

  }, []);

  return (
    <div>
      <h1>Thing Page</h1>
      <div>
        <ol>
        {thing.map((item) => (
                  <li key={item.order}>{JSON.stringify(item)}</li>
                ))}
        </ol>
      </div>
    </div>
  );
};
