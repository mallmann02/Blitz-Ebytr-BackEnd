const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const TaskRouter = require('./Routes/tasksRouter');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(bodyparser.json());

app.use('/tasks', TaskRouter);

const PORT = 3001;

app.listen(PORT, () => console.log('Ouvindo na porta: ', PORT))
