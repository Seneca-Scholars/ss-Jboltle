const express = require('express');
const { apiData } = require('./apis');

const app = express();
const port = 3000;
app.get('/', async (req, response) => {
  try {
    const data = await apiData();
    response.send(data);
  } catch (error) {
    response.status(500).send('Error fetching data');
  }
});

app.listen(port, () => {
  console.log("App listening on port " + port);
});

