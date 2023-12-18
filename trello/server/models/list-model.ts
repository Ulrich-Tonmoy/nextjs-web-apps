import mongoose from "mongoose";

const ListSchema = new mongoose.Schema(
  {
    id: String,
    title: String,
    boardId: String,
    TaskIds: [String],
  },
  {
    timestamps: true,
  },
);

const ListModel = mongoose.model("Lists", ListSchema);
export default ListModel;
