import { useReducer } from "react";
import { IChat } from "../../public/interfaces/chat.interface";
import Adbar from "./components/adbar/adbar";
import Chat from "./components/chat/chat";
import ChatList from "./components/chats-list/chats-list";

interface IDispatch {
  type: string;
  payload: any;
}

const chatsReducer = (chats: IChat[], action: IDispatch) => {
  switch (action.type) {
    case "delete": {
      return chats.filter(cht => cht.id !== action.payload);
    }
    case "select": {
      return chats.map((cht: IChat) => {
        const chtClone = { ...cht };
        chtClone.isSelected = cht.id === action.payload ? true : false;
        return chtClone;
      });
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

const ChatPage: React.FC<{}> = ({}) => {
  const [chats, dispatch] = useReducer(chatsReducer, []);

  const handleDeleteChat = (chatId: string) => {
    dispatch({
      type: "delete",
      payload: chatId,
    });
  };
  const handleSelectChat = (chatId: string) => {
    dispatch({
      type: "select",
      payload: chatId,
    });
  };

  const handleCreateChat = (chat: IChat) => {
    dispatch({
      type: "create",
      payload: chat,
    });
  };

  const handleUpdateChat = (chat: IChat) => {
    dispatch({
      type: "update",
      payload: chat,
    });
  };
  return (
    <div className="w-full h-full bg-teal-950 lg:grid lg:grid-cols-4 xl:grig xl:grid-cols-4">
      <ChatList chats={chats} onDeleteChat={handleDeleteChat} onSelectChat={handleSelectChat} />
      <Chat
        chat={chats.find(cht => cht.isSelected === true) || null}
        onCreateChat={handleCreateChat}
        onUpdateChat={handleUpdateChat}
      />
      <Adbar />
    </div>
  );
};

export default ChatPage;
