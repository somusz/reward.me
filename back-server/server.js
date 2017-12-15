const express = require('express');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const app = express();

app.get('/api', (req, res) => {
  var hello = {data: 'hello'}

  res.send(JSON.stringify(hello));
})


app.listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));
