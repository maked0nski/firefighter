import { extname } from "path";

export const imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        req.fileValidationError = "You can upload only image files";
        return cb(null,false, req.fileValidationError);
    }
    cb(null, true)
}

export const pdfFileFilte = (req,file, cb)=>{
    if (file.originalname.match(/\.(pdf)$/)){
        req.fileValidationError = "You can upload only PDF files";
        return cb(null,false, req.fileValidationError);
    }
    cb(null, true)
}

export const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};