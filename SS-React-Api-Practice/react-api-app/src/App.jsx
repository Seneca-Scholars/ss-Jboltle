import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { ApiNameFetch } from "./apiComponent";
import { useState } from "react";

function App() {
  const [endPoint, setEndpoint] = useState("");


  const clickHandler = (event, value) => {

    setEndpoint(value); 
    console.log(endPoint)
  //this sets the endpoint to the route path thats passed in to the second parameter option
  };


  return (
    <div>
      <h1 className="title">API FrontEnd</h1>

      <span className="top-nav-bar">
        <a
          className="link"
          onClick={(event) => clickHandler(event, "/name")}
          href="/name"
        >
          Name
        </a>
        <a
          className="link"
          onClick={(event) => clickHandler(event, "/id")}
          href="/id"
        >
          ID
        </a>
        <a
          className="link"
          onClick={(event) => clickHandler(event, "/order")}

          href="/order"
        >
          Order
        </a>
        <a
          className="link"
          onClick={(event) => clickHandler(event, "/category")}
          href="/category"
        >
          Category
        </a>
      </span>

      <BrowserRouter>
        <Routes>



          {/**
           * for example, when the route /category is hit, the stuff inside the element prop is what renders when the route is hit.
           * make a component for each route that fetches the data for that specifif route.
           *
           */}

          {/* figure out how to store whatever route is being clicked into a variable and then pass that 
into the apiComponnet.jsx fetch request parameter so that it fetches based on what api you want to click.  */}





            {/* we passed in the endpoint as endpoint which is like a prop so that this gets used 
            in the component, the two files are using each other which im not sure is best practice, 
            but i figured it out on my own so im happy about it and i dont care.  */}
          <Route path="/category"element={<ApiNameFetch endPoint={endPoint} />} />
          <Route path="/order" element={<ApiNameFetch endPoint={endPoint} />} />
          <Route path="/name" element={<ApiNameFetch endPoint={endPoint} />} />
          <Route path="/id" element={<ApiNameFetch endPoint={endPoint} />} />

          <Route path="/submit" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;