import Jimp from 'jimp';
import { PrismaClient } from '@prisma/client';
import { BadRequestError, InternalError, } from '../errors';
import { getRandomNumberInRange } from '../../utils';


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
