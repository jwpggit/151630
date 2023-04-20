const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require("multer-s3-transform"); // multer-s3이 아닌 multer-s3-transform을 임포트
const path = require('path')
const sharp = require("sharp");


AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2',
});

const s3 = new AWS.S3()

const extensionMap = {
  'image/png': '.png',
  'image/jpeg': '.jpg',
  'image/bmp': '.bmp',
  'image/svg': '.svg',
  'image/webp': '.webp',
  'video/mp4': '.mp4',
  'audio/wav': '.wav',
  'audio/mp3': '.mp3',
  'audio/mpeg': '.mp3',
}


const uploadImage = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'jwpg-bucket',
    key: function (req, file, callback) {
      let extension = extensionMap[file.mimetype];
      console.log ('aws s3 file uploading...', file)
      if (!extension) {
        extension = '.jpg';
      }
      callback(null, Date.now().toString() + extension);
    },
    acl: 'public-read-write'
  }),
})
module.exports = uploadImage;
