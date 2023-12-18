import mongoose from "mongoose";

const BoardSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  {
    timestamps: true,
  },
);

const BoardModel = mongoose.model("Boards", BoardSchema);
export default BoardModel;
