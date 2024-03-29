import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    const GetConversations = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "http://localhost:8000/api/users",
          {
            headers: { "Content-Type": "application/json" },
          },
          {
            withCredentials: true,
          }
        );
        const data = res.data;
        console.log("after axios");
        if (!data) {
          throw new Error(data.error);
        }
        setConversation(data);
      } catch (error) {
        let errorMessage = "An error occurred";
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          errorMessage = error.response.data.error || "An error occur";
        }
        toast.error(errorMessage);
        //console.log(error.response.data);
      } finally {
        setLoading(false);
      }
    };
    GetConversations();
  }, []);

  return { loading, conversation };
};

export default useGetConversations;
