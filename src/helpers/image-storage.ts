import { diskStorage } from 'multer';

export const saveImageToStorage = {
  storage: diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
      const name = file.originalname.split('.')[0];
      const fileExtension = file.originalname.split('.')[1];
      const newFileName =
        name.split(' ').join('-') + '-' + Date.now() + '.' + fileExtension;
      cb(null, newFileName);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(null, false);
    }
    cb(null, true);
  },
};
