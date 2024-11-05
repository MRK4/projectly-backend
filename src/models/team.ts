import { InferSchemaType, model, Schema, Types } from "mongoose";

const teamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  members: {
    type: Array,
    ref: "User",
    default: [],
  },
  projects: {
    type: [Types.ObjectId],
    ref: "Project",
    default: [],
  },
});

type Team = InferSchemaType<typeof teamSchema>;

export default model<Team>("Team", teamSchema);
