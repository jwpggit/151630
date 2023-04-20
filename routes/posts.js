const express = require('express');
const Router = express.Router();
const uploadImage = require('../utils/multer');
const postController = require('../controller/postController');

//READ
Router.get('/', postController.index);
Router.get('/:id', postController.detail);

//CREATE
Router.post('/', uploadImage.single('image'), postController.create);

//UPDATE
Router.put('/:id', uploadImage.single('image'), postController.update);

//DELETE
Router.delete('/:id', postController.delete);

module.exports = Router