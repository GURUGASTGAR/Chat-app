import { useState } from "react";
import axios from "axios";
import { useAuthContex } from "../context/AuthContex";
import toast from "react-hot-toast";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContex();

  const logout = async () => {
    setLoading(true);
    console.log("loading true");
    try {
      console.log("inside try");
      const res = await axios.post(
        "http://localhost:8000/api/auth/logout",
        {},
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      console.log("loading:", loading);
      const data = res.data;
      console.log(data);
      if (!data) {
        throw new Error(data.error);
      }
      console.log("after axios");
      localStorage.removeItem("user-data");
      setAuthUser(null);
      //setLoading(false);
      console.log("loading true");
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      console.log("loading stopped");
      setLoading(false);
    }
  };
  return { loading, logout };
};

export default useLogout;
