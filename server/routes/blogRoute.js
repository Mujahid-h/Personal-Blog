import express from "express";
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from "../controllers/blogController.js";

const router = express.Router();

router.route("/").post(createPost).get(getPosts);

router.route("/:id").get(getPostById).put(updatePost).delete(deletePost);

export default router;
