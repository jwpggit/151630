const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  subject: String,
  date: String,
  photo: String,
  contents: [
    {
      headlight: String,
      image: Array,
      title: String,
      detail: String,
    },
  ],
});


postSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;

    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Post', postSchema);
