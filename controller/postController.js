const Post = require('../models/Post')
const Image = require('../models/Image')

exports.index = async (req, res, next) => {
  const posts = await Post.find({})
  res.status(200).json(posts)
};


exports.detail = (req, res, next) => {
    Post.findById(req.params.id,(err, post) => {
        if(err) {
            return next(err);
        }
     res.status(200).json(post);
    });
};


exports.create = async (req, res, next) => {
  console.log ('req.body', req.body)
  try {
    const { photo, subject, date, contents } = req.body;
    const parsedContents = JSON.parse(contents);
    const post = new Post({ photo, subject, date, contents: parsedContents });
    console.log ('post', post)
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

// Update a blog post by ID
exports.update = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const { photo, subject, date, contents } = req.body;

    // Parse the contents array from a string to an actual array
    const parsedContents = JSON.parse(contents);

    // Update the post in the database
    const updatedPost = await Post.findByIdAndUpdate(postId, { photo, subject, date, contents: parsedContents }, { new: true });

    // Check if the post was found and updated
    if (!updatedPost) {
      return res.status(404).send('Post not found');
    }

    // Return the updated post as a JSON response
    res.status(200).json(updatedPost);
  } catch (error) {
    // Pass any errors to the next middleware for handling
    next(error);
  }
};

// Delete a blog post by ID
exports.delete = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).send('Post not found');
    }
    res.status(200).send('Post deleted successfully');
  } catch (error) {
    next(error);
  }
};

