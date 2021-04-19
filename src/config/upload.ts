import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const filePath = path.resolve(__dirname, '..', '..', 'tmp');

export default {
    directory: filePath,
    storage: multer.diskStorage({
        destination: filePath,
        filename(req, file, callback) {
            const filehash = crypto.randomBytes(10).toString('hex');
            const fileName = `${filehash}-${file.originalname}`;

            return callback(null, fileName);
        }
    }),
};