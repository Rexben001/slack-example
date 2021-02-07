const { createMessageAdapter } = require('@slack/interactive-messages');
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackInteractions = createMessageAdapter(slackSigningSecret);
const freeTime = require('./elements/freeTime.json');
const hobbies = require('./elements/hobbies.json');

module.exports.listenForInteractions = function (app) {
  app.use('/interactions', slackInteractions.requestListener());
};

slackInteractions.action({ type: 'select' }, (payload, respond) => {
  respondToSelectDropdown(payload, respond);
});

function respondToSelectDropdown(payload, respond) {
  const selectedOption = payload.actions[0].selected_options[0].value;

  if (payload.callback_id == 'subjects') {
    hobbies.callback_id = 'hobbies';
    respond({
      text: `Thanks for choosing a free time`,
      attachments: [hobbies],
      replace_original: true,
    });
  }

  if (payload.callback_id == 'free_time') {
    freeTime.callback_id = 'free_time';
    respond({
      text: `Thanks for telling me how you feel`,
      attachments: [freeTime],
      replace_original: true,
    });
  }
  // Return a replacement message
  return { text: 'Processing...' };
}

function nextResponse(text, callbackId, respond) {
  freeTime.callback_id = callbackId;
  respond({
    text: text,
    attachments: [freeTime],
    replace_original: true,
  });
}
