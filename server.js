const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

const staticRoot = path.join(__dirname);

app.use(express.static(staticRoot));

app.get('/', (req, res) => {
  res.sendFile(path.join(staticRoot, 'index.html'));
});

app.use((req, res) => {
  res.status(404).send('Resource not found');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
