import Goal from "../model/goalModel.js"

// 📚 Let's look at all the goals we have
export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find() // 🕵️‍♂️ Find all the goals
    res.status(200).json(goals)     // ✅ Send them back to the person who asked
  } catch (error) {
    res.status(500).json({ message: "Oops! Something went wrong." }) // 😢 If there's a problem, tell them
  }
}

// ✍️ Let's make a new goal
export const setGoal = async (req, res) => {
  try {
    const goal = await Goal.create({ text: req.body.text }) // 🧱 Build a new goal with the words they gave
    res.status(201).json(goal) // 🎉 Send back the new goal
  } catch (error) {
    res.status(400).json({ message: "Hmm... couldn't make the goal." }) // 😕 If it didn't work, say so
  }
}

// 🔍 Let's find one goal by its special ID
export const getGoalById = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id) // 🧭 Look for the goal with the magic ID
    if (!goal) {
      return res.status(404).json({ message: "Goal not found" }) // 🚫 If it's not there, say "I can't find it"
    }
    res.status(200).json(goal) // ✅ Found it! Send it back
  } catch (error) {
    res.status(400).json({ message: "That ID looks funny!" }) // 🤔 If the ID is weird, say so
  }
}

// 🛠️ Let's fix a goal
export const updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findByIdAndUpdate(
      req.params.id,
      { text: req.body.text },
      { new: true } // 🆕 Show the new version after fixing
    )
    if (!goal) {
      return res.status(404).json({ message: "Goal not found" }) // 😢 If it's missing, say "No goal here"
    }
    res.status(200).json(goal) // ✅ Yay! We fixed it
  } catch (error) {
    res.status(400).json({ message: "Couldn't fix it. Something's wrong." }) // 😕 If it breaks, tell them
  }
}

// 🗑️ Let's throw away a goal
export const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findByIdAndDelete(req.params.id) // 🧹 Find and delete the goal
    if (!goal) {
      return res.status(404).json({ message: "Goal not found" }) // 🚫 Can't throw away what we don't have
    }
    res.status(200).json({ message: `Deleted goal ${req.params.id}` }) // ✅ Say "We threw it away!"
  } catch (error) {
    res.status(400).json({ message: "Couldn't delete it. Something's wrong." }) // 😕 If it breaks, say so
  }
}
