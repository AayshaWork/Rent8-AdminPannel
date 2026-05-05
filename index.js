const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.send('Rent8 Backend Server is Running! 🚀');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});