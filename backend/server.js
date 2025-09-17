import express from "express"
import connectDB from "./lib/db.js"
import dotenv from "dotenv"
import goalRoutes from "./routes/goalRoutes.js"
import userRoutes from "./routes/userRoutes.js"
dotenv.config()

const port = process.env.PORT || 5000
const app = express()
app.use(express.json())

app.use("/api/goals", goalRoutes)
app.use("/api/users", userRoutes)
connectDB()

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`)
})
