const { createMessageAdapter } = require('@slack/interactive-messages');
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackInteractions = createMessageAdapter(slackSigningSecret);
const articleOrBookButton = require('./elements/articleOrBookButton.json');
const freeTime = require('./elements/freeTime.json');

module.exports.listenForInteractions = function (app) {
  app.use('/interactions', slackInteractions.requestListener());
};

slackInteractions.action({ type: 'select' }, (payload, respond) => {
  respondToSelectDropdown(payload, respond);
});

function respondToSelectDropdown(payload, respond) {
  const selectedOption = payload.actions[0].selected_options[0].value;

  if (payload.callback_id == 'subjects') {
    switch (selectedOption) {
      case 'well':
        text = 'You doing well.';
        callbackId = 'well_response';
        respondWithArticleOrBookNoButton(text, callbackId, respond);
        break;
      case 'neutral':
        text = 'You selected neutral.';
        callbackId = 'neutral_response';
        respondWithArticleOrBookNoButton(text, callbackId, respond);
        break;
      case 'lucky':
        text = 'You selected felling lucky.';
        callbackId = 'lucky_response';
        respondWithArticleOrBookNoButton(text, callbackId, respond);
    }
  }
  // Return a replacement message
  return { text: 'Processing...' };
}

function respondWithArticleOrBookNoButton(text, callbackId, respond) {
  articleOrBookButton.callback_id = callbackId;
  respond({
    text: text,
    attachments: [freeTime],
    replace_original: true,
  });
}
