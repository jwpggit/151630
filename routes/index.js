const router = require('express').Router()
const postRouter = require('./posts')
const imageRouter = require('./image')
const path = require('path');

const notFound = require('../middlewares/notFound')
const errorHandler = require('../middlewares/errorHandler')

//router.get('/', function(req, res, next) {res.sendFile(path.join(__dirname, '../public', 'index.html'));});

// Posts
router.use('/posts', postRouter)

// Images
router.use('/images', imageRouter)

// Route not found
router.use(notFound)

// Error handler
router.use(errorHandler)



module.exports = router