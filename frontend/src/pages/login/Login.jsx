import { useState } from "react"
import { Link } from "react-router-dom"
import useLogin from "../../hooks/useLogin";


const Login = () => {
   const [userName,setUserName] = useState("");
   const [password,setPassword]=useState("");
   const {loading,login}=useLogin();
   const handleSubmit = async (e)=>{
    e.preventDefault();
    await login({userName,password});
   }
  
   
  return (
      <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-900 backdrop-filter backdrop-blur-lg bg-opacity-0">
            <h1 className="text-3xl font-semibold text-center text-gray-300">Login
             <span className="text-blue-500 font-mono">  Textup</span>
            </h1>
    
            <form onSubmit={handleSubmit}>
              <div>
                <label className="label p-2">
                 <span className="text-base label-text">Username</span>
                </label>
                <input onChange={(e)=>{setUserName(e.target.value)}} type="text" placeholder="xyz@email.com" className="w-full input input-bordered h-10"></input>
              </div>
              <div>
                <label className="label p-2">
                 <span className="text-base label-text">Password</span>
                </label>
                <input onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="12345" className="w-full input input-bordered h-10"></input>
              </div>
              <Link to={"/signup"} className="text-sm  mt-2 hover:text-blue-500 hover:underline inline-block">
                {"Don't"} have an account
              </Link>
              <div>
                <button disabled={loading} className="btn btn-block btn-sm mt-2">{loading?<span className="loading loading-dots"></span>:"Login"}</button>
              </div>
            </form>
        </div>


      </div>
  )
}

export default Login



// ///
// const Login = () => {
//   return (
//       <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
//         <div className="w-full p-6 rounded-lg shadow-md bg-gray-900 backdrop-filter backdrop-blur-lg bg-opacity-0">
//             <h1 className="text-3xl font-semibold text-center text-gray-300">Login
//              <span className="text-blue-500 font-mono">  Textup</span>
//             </h1>

//             <form>
//               <div>
//                 <label className="label p-2">
//                  <span className="text-base label-text">Username</span>
//                 </label>
//                 <input type="text" placeholder="xyz@email.com" className="w-full input input-bordered h-10"></input>
//               </div>
//               <div>
//                 <label className="label p-2">
//                  <span className="text-base label-text">Password</span>
//                 </label>
//                 <input type="text" placeholder="12345" className="w-full input input-bordered h-10"></input>
//               </div>
//               <a href="" className="text-sm  mt-2 hover:text-blue-500 hover:underline inline-block">
//                 {"Don't"} have an account
//               </a>
//               <div>
//                 <button className="btn btn-block btn-sm mt-2">Login</button>
//               </div>
//             </form>
//         </div>


//       </div>
//   )
// }

// export default Login