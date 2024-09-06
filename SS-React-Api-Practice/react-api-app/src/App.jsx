import "./App.css";
import { Route, Routes } from "react-router-dom";
import React from "react";

import { ThingComponent } from "./thingComponent";
import { GameComponent } from "./gameComponent";
const App = () => {




  return (


    

    <Routes>


  <Route path="/things" element={<ThingComponent/>}/>
  <Route path="/games" element={<GameComponent/>}/>
</Routes>
)

  


}

export default App


