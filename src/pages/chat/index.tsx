import { useState } from "react";
import { IMessage } from "../../../public/interfaces/message.interface";
import Chat from "./components/chat/chat";
import Leftbar from "./components/leftbar/leftbar";
import Rightbar from "./components/rightbar/rightbar";

const ChatPage: React.FC<{}> = ({}) => {
  const [messages, setMessages] = useState<IMessage[] | null>(null);

  const handleFormSubmit = (data: IMessage) => {
    setMessages(messages ? [...messages, data] : [data]);
  };

  return (
    <div className="w-full h-full grid grid-cols-5 grid-rows-1 bg-teal-950">
      <Leftbar />
      <Chat />
      <Rightbar />
    </div>
  );
};

export default ChatPage;
