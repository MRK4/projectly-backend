import { InferSchemaType, model, Schema, Types } from "mongoose";

const projectHistorySchema = new Schema({
  projectId: {
    type: Types.ObjectId,
    ref: "Project",
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
    type: Schema.Types.Mixed, // Flexible type for previous values
  },
  newValue: {
    type: Schema.Types.Mixed, // Flexible type for new values
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

type ProjectHistory = InferSchemaType<typeof projectHistorySchema>;

export default model<ProjectHistory>("ProjectHistory", projectHistorySchema);
