import axios from 'axios';
import { BadRequestError, InternalError, MissingFieldError } from '../errors';

export const announcement = async (req, res) => {
  const { WEBHOOK_URI, TEST_WEBHOOK_URI } = process.env;

  if (WEBHOOK_URI === null) {
    throw new MissingFieldError('Missing webhook URI');
  }
  const blocks = req?.body?.blocks || [];

  try {
    if (Array.isArray(blocks) && blocks.length) {
      await axios.post(TEST_WEBHOOK_URI, {
        username: `Memes`,
        icon_emoji: ':meme:',
        blocks: blocks,
      });
      return res.status(200).send({ response: 'ok' });
    }
    throw new BadRequestError();
  } catch (_err) {
    // err contains sensitive info
    throw new InternalError();
  }
};
