import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import axios from "axios";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `http://localhost:8000/api/message/send/${selectedConversation._id}`,
        {
          message,
        },
        {
          headers: { "content-type": "application/json" },
        }
      );

      const data = res.data;
      if (!data) throw new Error(data.error);
      setMessages([...messages, data]);
    } catch (error) {
      console.log(error);
      toast.error(error || "error");
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;
