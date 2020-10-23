const express = require('express');
const app = express();

const PORT = 5000;

app.use(express.static('server/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MODULARIZING ROUTES
let todoRouter = require('./routes/todo.router');
app.use('/todo', todoRouter);

app.listen(PORT, () => {
  console.log('Server is running on port: ', PORT);
});
