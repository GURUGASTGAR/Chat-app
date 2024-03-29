import { useEffect } from "react"
import useConversation from "../../zustand/useConversation"
import MessageInput from "./MessageInput"
import Messages from "./Messages"
import { TiMessages } from "react-icons/ti"
import { useAuthContex } from "../../context/AuthContex"

const MessageContainer = () => {
   const {selectedConversation,setSelectedConversation} =  useConversation();
   ///totally optional but good to have
   useEffect(()=>{
     //function to unmount the container
    return setSelectedConversation(null);
   },[setSelectedConversation])


  return (
    <div className=" md:min-w-[450px] flex flex-col">
        {/* {header} */}
       {!selectedConversation?<NoChatSelected/>:(
        <>
         <div className="bg-slate-500 px-4 py-2 mb-1">
            <span className="label-text">To:</span> <span className="text-gray-900 font-bold font-mono">{selectedConversation.fullName}</span>
        </div>
        <Messages />
        <MessageInput />
        </>
       )}
    </div>
  )
}
const NoChatSelected = () => {
	const { authUser } =  useAuthContex();
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 {authUser.fullName} ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};


export default MessageContainer