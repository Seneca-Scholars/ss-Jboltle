import "./App.css";
import { Route, Routes } from "react-router-dom";
import React from "react";
import {GoogleMaps} from "./Pages/MapApi"
import { ThingComponent } from "./Pages/thingComponent";
import { GameComponent } from "./Pages/gameComponent";
const App = () => {




  return (


    

    <Routes>


  <Route path="/things" element={<ThingComponent/>}/>
  <Route path="/games" element={<GameComponent/>}/>
  <Route path="/map" element={<GoogleMaps/>} />

</Routes>
)

  


}

export default App


