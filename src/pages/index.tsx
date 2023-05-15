import { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import { chatMock } from "../../public/constants/chat-mock.const";
import { IChat } from "../../public/interfaces/chat.interface";
import { IMessage } from "../../public/interfaces/message.interface";
import Adbar from "./components/adbar/adbar";
import Chat from "./components/chat/chat";
import ChatsList from "./components/chats-list/chats-list";
import ChatModal from "./components/modal/chat-modal";

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
    case "create": {
      return [...chats, chatMock(false, uuidv4())];
    }
    case "back": {
      return chats.map(cht => {
        if (cht.isSelected === true) {
          cht.isSelected = false;
        }
        return cht;
      });
    }
    case "update": {
      return chats.map((cht: IChat) => {
        if (cht.id === action.payload.chatId) {
          const chatCopy: IChat = { ...cht };
          if (!chatCopy.messages.find((msg: IMessage) => msg.id === action.payload.msg.id)) {
            chatCopy.messages.push(action.payload.msg);
          }
          return chatCopy;
        } else {
          return cht;
        }
      });
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

const ChatPage: React.FC<{}> = () => {
  const [chats, dispatch] = useReducer(chatsReducer, [chatMock(true, uuidv4())]);

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

  const handleCreateChat = () => {
    dispatch({
      type: "create",
      payload: null,
    });
  };

  const handleUpdateChat = (chatId: string, msg: IMessage) => {
    dispatch({
      type: "update",
      payload: {
        chatId: chatId,
        msg: msg,
      },
    });
  };

  const handleBackToList = () => {
    dispatch({
      type: "back",
      payload: null,
    });
  };

  const handleCloseModal = () => {};

  const handleChangeName = () => {};

  return (
    <>
      <ChatModal
        name={chats.find(cht => cht.isSelected === true)?.name || null}
        onCloseModal={handleCloseModal}
        onChangeName={handleChangeName}
      />
      <div className="w-full h-full bg-teal-950 lg:grid lg:grid-cols-4 xl:grig xl:grid-cols-4">
        {!chats.find(cht => cht.isSelected === true) ? (
          <div
            className="h-full w-full
        "
          >
            <ChatsList
              chats={chats}
              onDeleteChat={handleDeleteChat}
              onSelectChat={handleSelectChat}
              onCreateChat={handleCreateChat}
            />
          </div>
        ) : (
          <div className="h-full w-full ">
            <Chat
              chat={chats.find(cht => cht.isSelected === true) || null}
              onUpdateChat={handleUpdateChat}
              onBackToList={handleBackToList}
            />
            <Adbar />
          </div>
        )}
      </div>
    </>
  );
};

export default ChatPage;
