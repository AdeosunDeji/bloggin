const { errorResponse, handleError, successResponse } = require("../utils/responses");
const models = require("../models");
const { isEmpty } = require("lodash");
const { calculateReadingTime } = require("../utils/read");

class PostController {
  static async createPost(req, res) {
    try {
      const { _id } = req.user;
      const { title, description, tags, post } = req.body;
      const pst = await models.Post.create({
        title,
        description,
        tags,
        post,
        author: `${req.user.firstName} ${req.user.lastName}`,
        user_id: _id,
        reading_time: calculateReadingTime(post)
      });
      return successResponse(res, 201, "Post created.", pst);
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }

  static async getAllPost(req, res) {
    try {
      let { page, limit } = req.query;
      // eslint-disable-next-line no-mixed-operators
      if (page === undefined || null && limit === undefined || null) {
        page = 1;
        limit = 20;
      }
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const posts = await models.Post.find({})
        .limit(endIndex)
        .skip(startIndex)
        .exec();
      if (isEmpty(posts)) {
        return errorResponse(res, 404, "Content not found..");
      }
      const count = await models.Post.countDocuments();
      let totalPages = Math.ceil(count / limit) - 1;
      if (totalPages === 0) totalPages = 1;
      const total = posts.length;
      return successResponse(
        res,
        200,
        "Posts fetched successfully.",
        {
          total,
          totalPages,
          currentPage: page,
          posts
        }
      );
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }

  static async getPostById(req, res) {
    try {
      const { postId } = req.params;
      const post = await models.Post.findById(postId);
      if (!post) {
        return errorResponse(res, 404, "Post not found.");
      }
      return successResponse(res, 200, "Post fetched successfully.", post, reading_time);
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }

  static async getPublishedPostById(req, res) {
    try {
      const { postId } = req.params;
      const post = await models.Post.findById(postId);

      if (post.state !== "published") {
        return errorResponse(res, 403, "Post is not published");
      }
      post.read_count++;
      await post.save();

      return successResponse(res, 200, "Published Post..", post);
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }

  static async updatePost(req, res) {
    try {
      const { postId } = req.params;
      const { title, description, tags, post } = req.body;
      const pst = await models.Post.findByIdAndUpdate(
        postId,
        {
          title,
          description,
          tags,
          post
        }, { new: true });
      return successResponse(res, 200, "Post updated successfully.", pst);
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }

  static async deletePost(req, res) {
    try {
      const { postId } = req.params;
      const post = await models.Post.findByIdAndDelete(postId);
      return successResponse(res, 200, "Post deleted successfully.", post);
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }

  static async changeState(req, res) {
    try {
      const { type } = req.query;
      const { postId } = req.params;
      const post = await models.Post.findById(postId);
      if (!post) return errorResponse(res, 404, "Post not found..");
      let value;
      type === "draft" ? value = "draft" : value = "published";
      const state = await models.Post.findByIdAndUpdate(postId, { state: value }, { new: true });
      return successResponse(res, 200, "User state updated.", state);
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }

  static async search(req, res) {
    try {
      const { type } = req.query;
      const { author, tags, title } = req.params;
      const user = await models.Post.find(author, tags, title);
      if(type !== user.author || user.tags || user.title) {
        return errorResponse(res, 404, "Not found..");
      }
      return successResponse(res, 200, "Result : ", user);
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }


}

module.exports = PostController;