import { InferSchemaType, model, Schema, Types } from "mongoose";

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  taskId: {
    type: Types.ObjectId,
    ref: "Task",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

type Comment = InferSchemaType<typeof commentSchema>;

export default model<Comment>("Comment", commentSchema);
