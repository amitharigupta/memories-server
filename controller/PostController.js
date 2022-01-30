const PostMessage = require("../database/post.model");
const mongoose = require("mongoose");

module.exports = {
  getPosts: async (req, res, next) => {
    try {
      let postMessages = await PostMessage.find();
      res
        .status(200)
        .json({ status: 200, message: "Get All Post", data: postMessages });
    } catch (error) {
      return res.status(404).json({ status: 404, message: error.message });
    }
  },
  createPost: async (req, res, next) => {
    const post = req.body;
    try {
      let postMessage = new PostMessage(post);
      let newPost = await postMessage.save();

      if (newPost)
        return res
          .status(200)
          .json({ status: 200, message: "Get All Post", data: newPost });
    } catch (error) {
      return res.status(409).json({ status: 404, message: error.message });
    }
  },
  updatePost: async (req, res, next) => {
    const id = req.params.id;
    const post = req.body;
    console.log(id, post);
    try {
      if (!mongoose.Types.ObjectId.isValid(id))
        return res
          .status(404)
          .json({ status: 200, message: "No Post with that id" });
      const updatedPost = await PostMessage.findByIdAndUpdate(
        id,
        { ...post, id },
        { new: true }
      );

      if (updatedPost) {
        return res.status(201).json({
          status: 200,
          message: "Post Updated Successfully",
          data: updatedPost,
        });
      }
    } catch (error) {
      return res.status(409).json({ status: 404, message: error.message });
    }
  },
  deletePost: async (req, res, next) => {
    const id = req.params.id;
    try {
      if (!mongoose.Types.ObjectId.isValid(id))
        return res
          .status(404)
          .json({ status: 200, message: "No Post with that id" });

      let deletedPost = await PostMessage.findByIdAndRemove(id);
      if (deletedPost) {
        return res.status(201).json({
          status: 200,
          message: "Post Deleted Successfully",
          data: deletedPost,
        });
      }
    } catch (error) {
      return res.status(409).json({ status: 404, message: error.message });
    }
  },
  likePost: async (req, res, next) => {
    const id = req.params.id;
    try {
      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ status: 200, message: "No Post with that id" });

      const post = await PostMessage.findById(id);
      const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });

      if(updatedPost) {
        return res.status(201).json({
          status: 200,
          message: "Post Updated Successfully",
          data: updatedPost,
        });
      }
    } catch (error) {
      return res.status(409).json({ status: 404, message: error.message });
    }
  }
};
