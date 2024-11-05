import { InferSchemaType, model, Schema, Types } from "mongoose";

const taskHistorySchema = new Schema({
  taskId: {
    type: Types.ObjectId,
    ref: "Task",
    required: true,
  },
  userId: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  changeType: {
    type: String,
    required: true,
  },
  previousValue: {
    type: Schema.Types.Mixed,
  },
  newValue: {
    type: Schema.Types.Mixed,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

type TaskHistory = InferSchemaType<typeof taskHistorySchema>;

export default model<TaskHistory>("TaskHistory", taskHistorySchema);
