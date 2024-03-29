import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthContex } from "../context/AuthContex";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContex();
  const signup = async ({
    userName,
    fullName,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleInputErrors({
      fullName,
      userName,
      password,
      confirmPassword,
      gender,
    });
    if (!success) return;
    setLoading(true);
    console.log("outside try");
    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/signup",
        {
          fullName,
          userName,
          password,
          confirmPassword,
          gender,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("user-data", JSON.stringify(res.data));
      setAuthUser(res.data);
      if (res.data.error) {
        throw new Error(res.data.error);
      }
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };
  return { signup, loading };
};

function handleInputErrors({
  fullName,
  userName,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !password || !userName || !confirmPassword || !gender) {
    toast.error("fill all fields");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("password do not match");
    return false;
  }
  if (password.length < 7) {
    toast.error("password must be at least 7 characters");
    return false;
  }
  return true;
}

export default useSignup;
