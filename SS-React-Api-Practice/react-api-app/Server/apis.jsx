const express = require('express');
const data = require('./data.json')
const apiRequests = (data) => {




const app = express();
const port = 3000;







app.get('/', (req, res) => {

    res.send(data);
  
})
let name;

const dataName = (data) => {
  
    const name = data.map(item => item.name); 
    return name;
  
};



const dataID = (data) => {

    const ids = data.map(item => item.id);

    return ids;


  }

const dataCategory = (data) => {
    const category = data.map(item => item.category);

    return category
};
const dataOrder = (data) => {

  const order = data.map(item => item.order)
  return order
}


app.get('/id', (req, res) => {

    const name = dataName(data);
    res.send(name);

});


app.get('/name', (req, res) => {

    const name = dataName(data);
    res.send(name);


});

app.get('/category', (req, res) => {

    const category = dataCategory(data); 
    res.send(category); 
 
});


app.get('/order', (req, res) => {

  const order = dataOrder(data); 
  res.send(order); 
  
});
  


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
}


export default apiRequests(data)