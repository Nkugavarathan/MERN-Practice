// ✅ Import required Mongoose functions
import { model, Schema } from "mongoose"

// ✅ Define the schema (blueprint) for Goal documents
const schema = new Schema(
  {
    user: {
      type: mongoose.SchemaType.SchemaType.ObjectId,
      require: true,
      ref: user,
    },
    text: {
      type: String,
      required: [true, "please add a text value"], // ✅ Custom error message if 'text' is missing
      unique: true, // ✅ Ensures no duplicate 'text' values
    },
  },
  { timestamps: true } // ✅ Automatically adds 'createdAt' and 'updatedAt' fields
)

// ✅ Create the model from the schema
const goalModel = model("Goal", schema)

// ✅ Export the model so it can be used in other files (e.g., controllers)
export default goalModel
