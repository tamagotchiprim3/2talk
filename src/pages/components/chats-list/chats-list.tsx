import { IChat } from "../../../../public/interfaces/chat.interface";

const ChatsList: React.FC<{ chats: IChat[]; onDeleteChat: any; onSelectChat: any }> = ({
  chats,
  onDeleteChat,
  onSelectChat,
}) => {
  const deleteChat = (chatId: string) => {
    onDeleteChat(chatId);
  };

  const selectChat = (chatId: string) => {
    onSelectChat(chatId);
  };

  return (
    <>
      {chats &&
        chats.map(cht => {
          return (
            <div key={cht.id} onClick={() => selectChat(cht.id)}>
              <div>{cht.name}</div>
              <button onClick={() => deleteChat(cht.id)}>delete</button>
            </div>
          );
        })}
    </>
  );
};

export default ChatsList;
