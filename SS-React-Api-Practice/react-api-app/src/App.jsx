import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
import React from 'react'
function App() {
  return (


<div>


<h1 className='title'>
  API FrontEnd
</h1>

<span className='top-nav-bar'>
<a className='image-url-page' href='/image-url'>Image Url</a>

<a className='image-url-id-page' href='/image-url/ids'>URL ID</a>
<a className='api-title-page' href='/image-url'> Title</a>
<a className='home-page' href='/'>Home</a>
<a className='submit-data-page' href='/submit'>Submit Data</a>
</span>



<BrowserRouter>
<Routes>


<Route path='/submit'>


    
    </Route>


</Routes>

</BrowserRouter>


</div>


  )
}

export default App;
