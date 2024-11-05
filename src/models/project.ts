import { InferSchemaType, model, Schema, Types } from "mongoose";

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  teamId: {
    type: Types.ObjectId,
    ref: "Team",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

type Project = InferSchemaType<typeof projectSchema>;

export default model<Project>("Project", projectSchema);
