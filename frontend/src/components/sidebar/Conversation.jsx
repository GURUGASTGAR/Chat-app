/* eslint-disable react/prop-types */

import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation"


const Conversation = ({emoji,conversation,lastIdx}) => {
  const {selectedConversation,setSelectedConversation}=useConversation()
  const isSelected = selectedConversation?._id ===conversation._id;
  const {onlineUsers}  = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);
  return (
    <>
    <div className ={ `flex gap-2 items-center hover:bg-sky-500 rounded px-2 py-1 cursor-pointer 
    ${isSelected?"bg-sky-500":""}`} onClick={()=>(setSelectedConversation(conversation))}>
      <div className={`avatar ${isOnline?'online':""}`}>
        <div className="w-12 rounded-full">
          <img src={conversation.profilePic} alt="user" />
        </div>
      </div>
      <div className="flex flex-col flex-1">
         <div className="flex gap-3 justify-between">
            <p className="text-gray-300 font-bold font-mono">{conversation.fullName}</p>
            <span className="text-xl">{emoji}</span>
         </div>
      </div>
    </div>
    {!lastIdx && <div className="divider py-0 my-0 h-1" />}
    </>
  )
}

export default Conversation