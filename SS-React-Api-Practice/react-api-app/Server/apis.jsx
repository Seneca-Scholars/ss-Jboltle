const sqlite3 = require('sqlite3');
const express = require('express');


const app = express();
const port = 3000;

const apiURL = 'https://jsonplaceholder.typicode.com/photos';

let data;

const fetchData = async () => {

    const response = await fetch(apiURL);
    data = await response.json(); 
    console.log('Data fetched and cached.', data);
  } 

fetchData(); 


app.get('/', (req, res) => {

    res.send(data);
  
})

const apiTitle = (data) => {
  
    const titles = data.map(item => item.title);
    titles.forEach(title => console.log(title));
    return titles;

    console.error('Error fetching titles:', error);
  
};

const apiID = (data) => {

    const ids = data.map(item => item.id);
    ids.forEach(id => console.log(id));
    return ids;


  }


const apiImageURL = (data) => {
    const urls = data.map(item => item.url);
    return urls
};
const apiImageURLID = () => {

  const urlEndPath = '/600/'; 
  return data.map(item => {
    const url = item.url;
    const startIndex = url.indexOf(urlEndPath) + urlEndPath.length; 
    return url.slice(startIndex); 
  })
}


app.get('/title', (req, res) => {

    const titles = apiTitle(data);
    res.send(titles);

});


app.get('/id', (req, res) => {

    const ids = apiID(data);
    res.send(ids);


});

app.get('/image-url', (req, res) => {

    const urls = apiImageURL(data); 
    res.send(urls); 
 
});


app.get('/image-url/ids', (req, res) => {

    const ids = apiImageURLID(data); 
    res.send(ids); 
  
});
  


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
