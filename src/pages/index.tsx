import Adbar from "./components/adbar/adbar";
import Chat from "./components/chat/chat";
import ChatList from "./components/chats-list/chats-list";

const ChatPage: React.FC<{}> = ({}) => {
  return (
    <div className="w-full h-full bg-teal-950 lg:grid lg:grid-cols-4 xl:grig xl:grid-cols-4">
      <ChatList />
      <Chat />
      <Adbar />
    </div>
  );
};

export default ChatPage;
