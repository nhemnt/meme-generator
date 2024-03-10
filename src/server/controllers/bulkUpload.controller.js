import {  InternalError } from '../errors';
import { uploadImage } from "../services/cloudinary";
import { PrismaClient } from '@prisma/client';
import Jimp from 'jimp';
import fs from 'fs';

export const bulkUpload = async (req, res) => {
    const prisma = new PrismaClient();

    const directoryPath = process.cwd() + '/memes/coding/';
    const files = fs.readdirSync(directoryPath);

    try {
        for (const file of files) {
            const imagePath = directoryPath + file;

            const image = await Jimp.read(imagePath);

            const text = await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);
            const message = "@coderalchemy"; //todo: move to db config

            const x = image.bitmap.width - 135;
            const y = image.bitmap.height - 15;

            const textBackground = new Jimp(140, 20, 0x000000FF); // Width, height, black background

            textBackground.print(text, 10, 0, { // Adjust the x-position for padding
                text: message,
                alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT, // Align text to the left
                alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE // Align text to the middle vertically
            });

            image.composite(textBackground, x - 8, y - 8); // Adjust the position for padding

            // Convert the modified image to buffer
            const modifiedImageData = await image.getBufferAsync(Jimp.MIME_JPEG);

            const result = await uploadImage(modifiedImageData, file);
            const meme = await prisma.meme.create({
                data: {
                    url: result.url,
                    channelId: 1, //todo: hardcode for now
                    approved: true,
                },
            });
            console.log(`Image ${file} uploaded and inserted into database`);
        }

        res.status(200).json({ message: 'All images uploaded and inserted successfully' });
    } catch (_error) {
        throw new InternalError();
    } finally {
        await prisma.$disconnect();
    }
};
