const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      default: "",
    },
    videoUrl: {
      type: String,
      default: false,
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const conversationSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },

    reciever: {
      type: mongoose.Schema.ObjectId,
      required: "true",
      ref: "User",
    },

    message: {
      type: mongoose.Schema.ObjectId,
      ref: "Message",
    },
  },
  {
    timestamps: true,
  }
);

const ConversationModel = mongoose.model("Conversation", conversationSchema);
const MessageModel = mongoose.model("Message", messageSchema);
module.exports = { ConversationModel, MessageModel };
