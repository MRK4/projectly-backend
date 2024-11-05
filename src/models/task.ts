import { InferSchemaType, model, Schema, Types } from "mongoose";

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["TO_DO", "IN_PROGRESS", "DONE", "PAUSED"],
    default: "TO_DO",
  },
  priority: {
    type: String,
    enum: ["LOW", "MEDIUM", "HIGH"],
    default: "MEDIUM",
  },
  assignedTo: {
    type: Types.ObjectId,
    ref: "User",
    default: null,
  },
  projectId: {
    type: Types.ObjectId,
    ref: "Project",
    required: true,
  },
  dueDate: {
    type: Date,
    default: null,
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

type Task = InferSchemaType<typeof taskSchema>;

export default model<Task>("Task", taskSchema);
