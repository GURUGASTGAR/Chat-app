import { useState } from "react";
import { useAuthContex } from "../context/AuthContex";
import axios from "axios";
import toast from "react-hot-toast";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContex();

  const login = async ({ userName, password }) => {
    const success = handleInputErrors({ userName, password });
    if (!success) {
      return;
    }
    try {
      setLoading(true);
      console.log("loading");
      const res = await axios.post(
        "http://localhost:8000/api/auth/login",
        { userName, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = res.data;

      localStorage.setItem("user-data", JSON.stringify(data));
      setAuthUser(data);
      if (data.error) {
        console.log("inside data.error check");
        console.log(data.error);
        throw new Error(data.error);
      }
    } catch (error) {
      const msg = error.response.data
        ? error.response.data
        : "unexpected error occured";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};
function handleInputErrors({ userName, password }) {
  if (!userName || !password) {
    toast.error("fill all feilds");
    return false;
  }
  if (password.length < 7) {
    toast.error("password must be atleast 7 char long");
    return false;
  }
  return true;
}
export default useLogin;
