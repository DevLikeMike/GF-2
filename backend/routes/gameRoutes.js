import express from "express";
const router = express.Router();
import {
  getGames,
  getGameById,
  createNewReview,
  updateUsersGame,
  deleteUsersGame,
} from "../controllers/gameController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(getGames).post(protect, createNewReview);
router
  .route("/:id")
  .get(getGameById)
  .put(protect, updateUsersGame)
  .delete(protect, deleteUsersGame);

export default router;
