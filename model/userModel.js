// ✅ Import required Mongoose functions
import { model, Schema } from "mongoose"

// ✅ Define the schema (blueprint) for Goal documents
const schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "please add name"], // ✅ Custom error message if 'text' is missing
      unique: true, // ✅ Ensures no duplicate 'text' values
    },

    email: {
      type: String,
      required: [true, "please add email"], // ✅ Custom error message if 'text' is missing
      unique: true,
    },
    password: {
      type: String,
      required: [true, "please add pasword"], // ✅ Custom error message if 'text' is missing
      unique: true,
    },
  },
  { timestamps: true } // ✅ Automatically adds 'createdAt' and 'updatedAt' fields
)

// ✅ Create the model from the schema
const userModel = model("User", schema)

/*
A name for the model ("User"),

A schema that defines the structure of documents in that model (schema).

*/
// ✅ Export the model so it can be used in other files (e.g., controllers)
export default userModel
