const express = require('express');
const routes = require('./routes');

const app = express();

const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use('/', routes);

app.get('/', (req, res) => res.send('API is running!!!'));

app.listen(PORT, () => console.log(`Listening to PORT ${PORT}`));
