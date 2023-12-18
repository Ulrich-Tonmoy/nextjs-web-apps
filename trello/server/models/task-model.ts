import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    content: String,
    id: String,
    listId: String,
    priority: String,
  },
  {
    timestamps: true,
  },
);

const TaskModel = mongoose.model("Tasks", TaskSchema);
export default TaskModel;
