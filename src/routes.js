const router = require('express').Router();
const Axios = require('axios');

router.get('/alert', async (req, res) => {
  try {
    const val = 'Me';
    const { resp } = await Axios.post(
      'https://hooks.slack.com/services/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',
      {
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `Alert! Alert! *${val} is thanks. <https://www.benjaminajewole.com| View my website>`,
            },
          },
        ],
      }
    );
    console.log('resp>>>', resp);
    res.json({ date: new Date().toISOString() });
  } catch (error) {
    console.error('err>>', error);
  }
});

module.exports = router;
