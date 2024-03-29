import { useState } from "react";
import { GrSend } from "react-icons/gr";
import useSendMessage from "../../hooks/useSendMessage";





const MessageInput = () => {
   const [message,setMessage] = useState("");
   const {loading,sendMessage} =useSendMessage();


   const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!message) return;
    await sendMessage(message);
    setMessage("");
     }
     
  return (  
    <form className="px-4 my-2" onSubmit={handleSubmit}>
     <div className="w-full flex flex-row justify-between relative">
        <input type="text" placeholder="send a text msg" value={message} onChange={(e)=>{setMessage(e.target.value)}} className="bordered text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 text-white" />
        <button type="submit" className="absolute insert-y-0 end-0 flex items-center px-3 py-2.5 text-xl">
            {loading?<span className="loading loading-ring"/>:<GrSend />}
        </button>
     </div>
    </form>
  )
}

export default MessageInput