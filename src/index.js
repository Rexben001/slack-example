require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const events = require('./app');
const interactions = require('./interactions');
const app = express();
events.listenForEvents(app);
// events.respondToEvent();
interactions.listenForInteractions(app);

const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use('/', routes);

app.get('/', (req, res) => res.send('API is running!!!'));
app.post('/', (req, res) => res.json({ challenge: req.body.challenge }));

app.listen(PORT, () => console.log(`Listening to PORT ${PORT}`));
