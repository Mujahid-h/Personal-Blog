import express from "express";
import {
  createComment,
  getCommentsByPostId,
} from "../controllers/commentController.js";

const router = express.Router();

router.route("/").post(createComment);
router.route("/:postId").get(getCommentsByPostId);

export default router;
