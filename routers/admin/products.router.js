const express = require('express');
const router = express.Router();
const multer = require("multer");
// const storageMulter = require("../../helpers/storageMulter");
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
//Cloudinary
cloudinary.config({ 
  cloud_name: 'sadasdsada', 
  api_key: '113413533757737', 
  api_secret: "-1btOMa7SqX1G1I9h60TAxHdNRM" 
});
//Cloundinary

const controller = require("../../controllers/admin/products.controller");
const validate = require("../../validates/admin/product.validate");
const upload = multer();

router.get('/', controller.index);// đi vào index
router.patch('/change-status/:status/:id', controller.changeStatus);
router.patch('/change-multi', controller.changeMulti);
router.delete('/delete/:id', controller.deleteItem);
router.get('/create', controller.create);
router.post('/create',
  upload.single("thumbnail"),
  function (req, res, next) {
    let streamUpload = (req) => {
        return new Promise((resolve, reject) => {
            let stream = cloudinary.uploader.upload_stream(
              (error, result) => {
                if (result) {
                  resolve(result);
                } else {
                  reject(error);
                }
              }
            );
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
    };

    async function upload(req) {
        let result = await streamUpload(req);
        console.log(result.secure_url);
        req.body[req.file.filename] = result.secure_url;
        
    }
    upload(req);
    next();
},
  validate.createPost,
  controller.createPost
);
router.post(
  '/create',
    validate.createPost,
   controller.createPost
  );
router.get('/edit/:id', controller.edit);

router.get('/detail/:id', controller.detail);



module.exports = router;