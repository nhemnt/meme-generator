import Jimp from 'jimp';
import { PrismaClient } from '@prisma/client';
import { BadRequestError, InternalError, } from '../errors';

function getRandomNumberInRange(x, y) {
    // Check if x and y are valid numbers
    if (typeof x !== 'number' || typeof y !== 'number' || x >= y) {
        throw new Error('Invalid range');
    }

    // Generate a random number between 0 and 1
    const random = Math.random();

    // Scale the random number to fit the specified range
    const randomNumberInRange = Math.floor(random * (y - x + 1)) + x;

    return randomNumberInRange;
}
export const meme = async (req, res) => {
    const prisma = new PrismaClient();
    try {

        const memeEntry = await prisma.meme.findUnique({
            where: {
                id: getRandomNumberInRange(1,301)
            }
        });
        if (memeEntry) {
            const imagePath = memeEntry.url;
            const image = await Jimp.read(imagePath);
            const imageBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);
            res.setHeader('Content-Type', 'image/jpeg');

            res.end(imageBuffer);
        } else {
            throw new BadRequestError()
        }



    } catch (_err) {
        throw new InternalError(_err);
    }
};
