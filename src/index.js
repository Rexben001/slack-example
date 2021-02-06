const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use('/', routes);

app.get('/', (req, res) => res.send('Start APp'));

app.listen(4000, () => console.log('Listening to PORT 4000'));
