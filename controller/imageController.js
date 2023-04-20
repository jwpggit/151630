const Image = require('../models/Image')

exports.detail = async (req, res) => {
  const ids = req.params.id.split(","); // Split comma-separated IDs into an array
  console.log(ids)

  try {
    const images = await Image.find({ _id: { $in: ids }, url: { $nin: ["`", null] } }); // Use $in operator to search for any matching IDs
    const urls = ids.map(id => images.find(img => img._id.toString() === id)?.url).filter(url => url != null);
    console.log(urls)
    res.send(urls);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
}
exports.getNull = async (req, res) => {
  console.log('getNull')
}

exports.getSingle = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id).exec();
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    const url = image.url; // extract the url property from the image object
    res.status(200).json( url );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.getMultiple = async (req, res) => {
  const ids = req.params.id.split(","); // Split comma-separated IDs into an array
  console.log(ids)

  try {
    const images = await Image.find({ _id: { $in: ids }, url: { $nin: ["`", null] } }); // Use $in operator to search for any matching IDs
    const urls = ids.map(id => images.find(img => img._id.toString() === id)?.url).filter(url => url != null);
    console.log(urls)
    res.send(urls);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
}

// CREATE
exports.create = (req, res) => {
  // Validate request
  if (!req.file) {
    return res.status(400).send({
      message: "Image file is required."
    });
  }

  // Create a new image object
  const image = new Image({
    fileName: req.file.key,
    url: req.file.location,
    using: false
  });

  // Save the image to the database
  image.save()
    .then(data => {
      res.send(data.url);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Image."
      });
    });
};

exports.get = (req, res) => {
  console.log('이미지 업로드 완료'); // logs the value of the req parameter
};




exports.update = (req, res, next) => {
  Image.findByIdAndUpdate(req.params.id,(err, image) => {
  
   res.status(200).json(image);
  });
};

