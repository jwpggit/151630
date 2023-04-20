const express = require('express');
const Router = express.Router();
const uploadImage = require('../utils/multer');
const imageController = require('../controller/imageController');

//CREATE
Router.post('/', uploadImage.single('Image'), imageController.create);
Router.get('/', imageController.get);

Router.get('/single/', imageController.getNull);
Router.get('/multiple/', imageController.getNull);

Router.get('/single/:id', imageController.getSingle);
Router.get('/multiple/:id', imageController.getMultiple);




Router.put('/:id', imageController.update);
Router.get('/gallery_item', imageController.detail);

module.exports = Router