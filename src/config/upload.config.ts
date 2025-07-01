import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';

export const taskImageStorage = diskStorage({
  destination: './uploads/tasks',
  filename: (_req, file, cb) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
    const id = uuid();
    const ext = extname(file.originalname);
    cb(null, `${id}${ext.toLowerCase()}`);
  },
});
