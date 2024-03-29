import { json } from "express";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiversId, io } from "../socket/socket.js";
import { Socket } from "socket.io";
//import User from "../models/user.model";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiversId } = req.params;
    const sendersId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [sendersId, receiversId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [sendersId, receiversId],
      });
    }

    const newMessage = await Message({
      sendersId,
      receiversId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    // await conversation.save();
    // await newMessage.save();

    //this will run in parellel
    await Promise.all([conversation.save(), newMessage.save()]);

    //SOCKET IO FUNCTIONALLLATY GO HERE
    const receiversSocketId = getReceiversId(receiversId);
    if (receiversSocketId) {
      // io.to(<socket_id>).emit() used to send event to specific client;
      io.to(receiversSocketId).emit("newMessage", newMessage);
    }

    res.status(200).json({ newMessage });
  } catch (error) {
    res.status(500).json({
      error: "internal server error",
    });
    console.log(error.message);
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatWith } = req.params;
    const sendersId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [sendersId, userToChatWith] },
    }).populate("messages"); ///not refrence actual message
    if (!conversation) return res.status(200).json([]);
    const messages = conversation.messages;
    if (!messages) return res.status(200).json([]);
    res.status(200).json(messages);
  } catch (error) {
    console.log(error.res);
    res.status(500).json({
      error: "internal server error",
    });
    console.log(error.message);
  }
};
