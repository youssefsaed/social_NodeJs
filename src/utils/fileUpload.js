import multer from 'multer'
import { v4 as uuidv4 } from 'uuid';


export const fileValidation = {
    image: ['image/jpeg', 'image/png'],
    pdf: ['application/pdf']
}
export const fileUpload = (customValidation = []) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/')
        },
        filename: (req, file, cb) => {
            cb(null, uuidv4() + '-' + file.originalname)
        }
    })

    function fileFilter(req, file, cb) {
        if (customValidation.includes(file.mimetype)) {
            cb(null, true)
        }
        else {
            cb(new Error(`invalid file formate `), false)
        }

    }

    const upload = multer({ fileFilter,storage })

    return upload




}