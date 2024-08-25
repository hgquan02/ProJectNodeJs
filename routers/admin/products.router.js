const express = require('express');
const router = express.Router();

const controller = require("../../controllers/admin/products.controller");
const validate = require("../../validates/admin/product.validate");

router.get('/', controller.index);// đi vào index
router.patch('/change-status/:status/:id', controller.changeStatus);
router.patch('/change-multi', controller.changeMulti);
router.delete('/delete/:id', controller.deleteItem);
router.get('/create', controller.create);
router.post(
  '/create',
    validate.createPost,
   controller.createPost
  );
router.get('/edit/:id', controller.edit);

router.get('/detail/:id', controller.detail);



module.exports = router;