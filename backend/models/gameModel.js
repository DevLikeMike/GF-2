import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const GameSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  author: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  comments: [commentSchema],
  rating: {
    type: String,
    default: "5",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    default: "Unassigned",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Game = mongoose.model("Game", GameSchema);
export default Game;
