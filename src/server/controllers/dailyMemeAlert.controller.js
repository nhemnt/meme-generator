import axios from 'axios';
import { PrismaClient } from '@prisma/client';
import { InternalError, MissingFieldError } from '../errors';
import { getRandomNumberInRange } from '@/utils';

export const dailyMemeAlert = async (req, res) => {
    const { WEBHOOK_URI } = process.env;

    if (WEBHOOK_URI === null) {
        throw new MissingFieldError('Missing webhook URI');
    }
    const prisma = new PrismaClient();

    try {

        const memeEntry = await prisma.meme.findUnique({
            where: {
                id: getRandomNumberInRange(1, 301)
            }
        });

        const blocks = [
            {
                "type": "image",
                "title": {
                    "type": "plain_text",
                    "text": "Live Laugh Love",
                    "emoji": true
                },
                "image_url": memeEntry.url,
                "alt_text": "Live Laugh Love"
            }
        ]

        await axios.post(WEBHOOK_URI, {
            username: `Memes`,
            icon_emoji: ':meme:',
            blocks: blocks,
        });
        return res.status(200).send({ response: 'ok' });
    } catch (_err) {
        // err contains sensitive info
        throw new InternalError();
    }
};
