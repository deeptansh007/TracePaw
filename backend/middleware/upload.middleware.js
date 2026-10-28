import multer from 'multer';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb)=>{
    const allowedType = [
        'image/jpeg',
        'image/png',
        'image/webp'
    ];
    if(allowedType.includes(file.mimetype)){
        cb(null, true);
    }
    else{
        cb(new Error('Only JPEG, PNG and WebP images are allowed'))
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits:{
        fileSize:2* 1024* 1024,
        files:1
    }
});

export default upload;