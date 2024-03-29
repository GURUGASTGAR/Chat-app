import { Link } from "react-router-dom"
import InputBox from "../../components/subComponents/InputBox"
import GenderCheckbox from "./GenderCheckbox"
import { useState } from "react"
import useSignup from "../../hooks/useSignup"


const SignUp = () => {
  const [userName ,setUserName] = useState('');
  const [fullName ,setFullName] = useState('');
  const [password ,setPassword] = useState('');
  const [confirmPassword ,setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');

  const handleCheckboxChange = (gender)=>{
    setGender(gender)
  }
  const {loading,signup} = useSignup()
  const handleSubmit = async (e)=>{
    e.preventDefault();
    await signup({userName,fullName,password,confirmPassword,gender});
  }


  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-900 backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">Signup
             <span className="text-blue-500 font-mono">  Textup</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <InputBox onChange={(e)=>(setUserName(e.target.value))} label={"Username"} placeholder={"xyz@email.com"} />
          <InputBox onChange={(e)=>(setPassword(e.target.value))} type={"password"} label={"Password"} placeholder={"123456"} />
          <InputBox onChange={(e)=>(setConfirmPassword(e.target.value))} type={"password"} label={"Confirm Password"} placeholder={"123456"} />
          <InputBox onChange={(e)=>(setFullName(e.target.value))} label={"Full Name"} placeholder={"Jon Doe"} />
          <GenderCheckbox handleCheckboxChange={handleCheckboxChange} selectedGender={gender} />
          <Link to="/login" className="text-sm  mt-2 hover:text-blue-500 hover:underline inline-block">
             Already have an account
          </Link>
          <div>
            <button disabled={loading} className="btn btn-block btn-sm mt-2">{loading?<span className="loading loading-spinner"></span>:"Sign Up"}</button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default SignUp