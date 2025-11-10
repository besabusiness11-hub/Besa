const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 8080;

// Serve static files from the dist/public directory
app.use(express.static(path.join(__dirname, '../dist/public')));

// For any other route, serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});