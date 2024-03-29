/* eslint-disable react/prop-types */
import { useAuthContex } from "../../context/AuthContex"
import { extractTime } from "../../utils/extractFiles";
import useConversation from "../../zustand/useConversation"


const Message = ({message}) => {
  const {authUser}= useAuthContex()
  const {selectedConversation}=useConversation();
  const fromMe = message.sendersId === authUser._id;
  const chatClassName = fromMe? 'chat-end' : 'chat-start';
  const profilePic =fromMe? authUser.profilePic : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe?'bg-blue-500':'';
  const shakeClass = message.shouldShake ? "shake":"";
  return (
    <div className={`chat ${chatClassName}`}>
        <div className="chat-image avatar">
            <div className="w-7 rounded-full">
               <img
                alt="user"
                src={profilePic}
                />
            </div>
        </div>
        <div className={`chat chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
        <div className="chat-footer opacity-50">
             {extractTime(message.createdAt)}
        </div>
    </div>
  )
}

export default Message