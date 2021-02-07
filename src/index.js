require('dotenv').config();
const express = require('express');
const cors = require('cors');

const routes = require('./routes');
const events = require('./app');
const interactions = require('./interactions');
const subjects = require('./elements/subjects.json');

const app = express();
events.listenForEvents(app);
// events.respondToEvent();
interactions.listenForInteractions(app);

const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(cors());
app.use('/', routes);

app.get('/', (req, res) => res.send('API is running!!!'));
app.post('/', (req, res) => res.json({ challenge: req.body.challenge }));

app.post('/commands', (req, res) => {
  const { token, user_id, channel_id } = req.body;
  console.log(
    `Received a slash command from user ${user_id} in channel ${channel_id}`
  );

  if (token !== process.env.SLACK_VERIF_TOKEN) {
    console.log('Invalid token');
    return;
  }

  res.status(200).send({ attachments: [subjects] });
});

app.listen(PORT, () => console.log(`Listening to PORT ${PORT}`));
