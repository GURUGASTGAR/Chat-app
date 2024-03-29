  import { BiLogOut } from "react-icons/bi";
  import useLogout from "../../hooks/useLogout";


  const Logout = () => {
  const {loading,logout}= useLogout()
    return (
      <div className="mt-auto p-2 py-3">
        {!loading?  <BiLogOut className="text-2xl text-white cursor-pointer" onClick={logout}/>:<span className="loading loading-spinner" /> }
      </div>
    )
  }

  export default Logout