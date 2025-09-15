import express from "express"
import {
  getGoals,
  setGoal,
  getGoalById,
  updateGoal,
  deleteGoal,
} from "../controllers/goalController.js"

const router = express.Router()

router.route("/").get(getGoals).post(setGoal)
router.route("/:id").get(getGoalById).put(updateGoal).delete(deleteGoal)

export default router
