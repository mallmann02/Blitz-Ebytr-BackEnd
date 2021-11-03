const express = require('express');
const bodyparser = require('body-parser');

const app = express();

app.use(bodyparser.json());

const PORT = 3001;

app.listen(PORT, () => console.log('Ouvindo na porta: ', PORT))
