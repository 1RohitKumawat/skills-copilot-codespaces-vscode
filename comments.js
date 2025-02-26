// create a server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// create a fake database
const comments = [
  {id: 1, author: 'John', text: 'Hello World'},
  {id: 2, author: 'Jane', text: 'React is awesome'}
];

// get all comments
app.get('/comments', (req, res) => {
  res.send(comments);
});

// add a comment
app.post('/comments', (req, res) => {
  const newComment = req.body;
  newComment.id = comments.length + 1;
  comments.push(newComment);
  res.send(newComment);
});

// start the server
app.listen(3001, () => {
  console.log('Server started on http://localhost:3001');
});