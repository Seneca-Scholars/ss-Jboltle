import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
import React from 'react'
import { ApiNameFetch } from './apiComponent';

function App() {
  return (


<div>


<h1 className='title'>
  API FrontEnd
</h1>

<span className='top-nav-bar'>

  
<a className='link' href='/name'>Name</a>

</span>



<BrowserRouter>


<Routes>

{/**
 * for example, when the route /category is hit, the stuff inside the element prop is what renders when the route is hit. 
 * make a component for each route that fetches the data for that specifif route. 
 * 
 */}


<Route path='/category'/>

<Route path='/order'/>


<Route element={<ApiNameFetch/>} path='/name'/>

<Route path='/id'/>

<Route path='/submit'/>



</Routes>

</BrowserRouter>


</div>


  )
}

export default App;
