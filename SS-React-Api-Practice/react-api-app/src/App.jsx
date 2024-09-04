import "./App.css";
import { Route, Routes, useSearchParams } from "react-router-dom";
import React from "react";

import { ThingComponent } from "./thingComponent";
const App = () => {
  



  return (

    

    <Routes>
  <Route path="/thing" element={<ThingComponent/>}/>
</Routes>
)

  


}

export default App


