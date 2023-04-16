import Chat from "./components/chat/chat";
import Leftbar from "./components/leftbar/leftbar";
import Rightbar from "./components/rightbar/rightbar";

const ChatPage: React.FC<{}> = ({}) => {
  return (
    <div className="w-full h-full grid grid-cols-4 grid-rows-1 bg-teal-950">
      <Leftbar />
      <Chat key={""} />
      <Rightbar />
    </div>
  );
};

export default ChatPage;
