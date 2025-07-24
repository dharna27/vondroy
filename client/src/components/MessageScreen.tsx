import { MutableRefObject, useContext, useEffect, useRef } from "react";
import useGetMessages from "../hooks/useGetmessages";
import { AuthContext, AuthContextType } from "../context/AuthContext";
import { ConversationContext, ConversationContextType } from "../context/ConversationContext";
import useListenMessages from "../hooks/useListenMessages";
import { Loader } from "lucide-react";

const MessageScreen = (): React.JSX.Element => {

  const { loading, messages } = useGetMessages();
  useListenMessages();
  const {  auth } = useContext<AuthContextType | null>(AuthContext)!;
  const { selectedConversation } = useContext<ConversationContextType | null>(ConversationContext)!;
  const lastMessageRef : MutableRefObject<HTMLDivElement | null> = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({behavior : "smooth"})
    }, 100);
  }, [messages])
  
  return (
    <div className="messages flex flex-col gap-3 flex-grow p-3 overflow-y-scroll">
      {!loading &&
      messages != undefined && 
      messages?.length > 0
       && messages?.map((message) => {
        const fromMe = auth?.id === message.senderId
        const chatClassname = fromMe ? 'flex-row-reverse' : 'flex-row';
        const borderClassname = fromMe ? 'rounded-l-md rounded-br-md' : 'rounded-r-md rounded-bl-md';
        const profilePic = fromMe ? auth.profile : selectedConversation?.profilePic;

        return (
          <div key={message?.messageId} ref={lastMessageRef} className={`${chatClassname} message flex justify-start gap-2`}>
          <img
            className="w-8 h-8 border border-gray-400 rounded-full box-border"
            src={profilePic}
            alt="avatar"
          />
          <div className={`${borderClassname} bg-gray-100 mt-2 w-fit max-w-[70%] h-auto text-sm p-2 flex justify-center items-center flex-wrap`}>
            {message.body}
          </div>
        </div>
        );
       })}

       {loading && <div className="w-full h-full flex items-center justify-center"><Loader className="animate-spin" /></div>}
       {!loading && (messages?.length == 0 || messages == undefined) && (
        <p className="text-gray-600 text-sm text-center">Send a message to start conversation</p>
       )}
    </div>
  );
};

export default MessageScreen;
