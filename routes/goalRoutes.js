import express from "express"
import {
  getGoals,
  setGoal,
  getGoalById,
  updateGoal,
  deleteGoal,
} from "../controllers/goalController.js"

const router = express.Router()

import { protect } from "../middleware/authMiddleware.js"

router.route("/").get(protect, getGoals).post(protect, setGoal)
router
  .route("/:id")
  .get(protect,getGoalById)
  .put(protect,updateGoal)
  .delete(protect, deleteGoal)

export default router
