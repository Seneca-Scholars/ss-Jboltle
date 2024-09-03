import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { ApiNameFetch } from "./apiComponent";

function AppContent() {
  const [endPoint, setEndpoint] = useState("");
  const location = useLocation();

  useEffect(() => {
    setEndpoint(location.pathname); 
//basically the location react hook returns an object that has a bunch of stuff lilke query pramereters, and other stuff but we use it here for the path name which looks like "/abc"


  }, [location]);//we pass location as a dependency becauser it can change based on what we click.
                //before we used endpoint as a dependency and set the endpoint based on a click but somehting was fricking wrong with it and idk wy

  return (
    <div>
      <h1 className="title">API FrontEnd</h1>

      <span className="top-nav-bar">
        <a
          className="link"
          href="/name"
        >
          Name
        </a>
        <a
          className="link"
          href="/id"
        >
          ID
        </a>
        <a
          className="link"
          href="/order"
        >
          Order
        </a>
        <a
          className="link"
          href="/category"
        >
          Category
        </a>
      </span>

      <Routes>
        <Route path="/category" element={<ApiNameFetch endPoint={endPoint} />} />
        <Route path="/order" element={<ApiNameFetch endPoint={endPoint} />} />
        <Route path="/name" element={<ApiNameFetch endPoint={endPoint} />} />
        <Route path="/id" element={<ApiNameFetch endPoint={endPoint} />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
