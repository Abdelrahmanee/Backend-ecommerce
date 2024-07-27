import multer from "multer"
import { v4 as uuid4 } from 'uuid'


function general(folderName) {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `uploads/${folderName}`)
        },
        filename: function (req, file, cb) {
            cb(null, uuid4() + file.originalname)
        },

    })
    function fileFilter(req, file, cb) {
        if (file.mimetype.startsWith('image'))
            cb(null, true)
        else
            cb(null, false)
    }
    const upload = multer({ storage, fileFilter })
    return upload
}

export const uploadSinglePhoto = (fieldName ,folderName ) => {
    
    const upload = general(folderName)
    return upload.single(fieldName)
}
export const uploadMultiplePhotos = (arrayOfFields  , folderName) => {
    const upload = general(folderName)
    return upload.fields(arrayOfFields )
}