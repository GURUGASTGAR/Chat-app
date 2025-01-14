import Message from "./Message"
import useGetMessages from "../../hooks/useGetMessages"
import MessageSkeleton from "../skeletons/MessageSkeleton";
import { useEffect, useRef } from "react";
import useListenMessages from "../../hooks/useListenMessages";
const Messages = () => {
  const {messages,loading} = useGetMessages();
  useListenMessages();
  const lastMessage = useRef();
  useEffect(()=>{
    setTimeout(()=>{
      lastMessage.current?.scrollIntoView({behavior:'smooth'})
    },100)
  },[messages])
  return (
      <div className="px-4 flex-1 overflow-auto">
        {!loading && messages.length>0 && messages.map((message,idx)=>{
          return <div key={idx} ref={lastMessage}>
            <Message message={message}/>
            </div>
        })}
        {loading&&[...Array(3)].map((_,idx)=><MessageSkeleton key={idx}/>)}  
        {!loading && messages.length === 0 && (
          <p className="text-center font-mono">Start Conversation</p>
        )}    
      </div>
  )
}

export default Messages