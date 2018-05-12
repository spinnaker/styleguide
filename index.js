const express = require('express');
const app = express()
const path = require('path')

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/styleguide.html'))
})

app.listen(7101, function () {
  console.log('Styleguide will be served on port 7101');
});

app.use('/public', express.static(path.join(__dirname, '/public')))
app.use('/src', express.static(path.join(__dirname, '/src')))
