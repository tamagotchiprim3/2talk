import Image from "next/image";
import createIcon from "../../../../public/icons/create-icon.svg";
import deleteIcon from "../../../../public/icons/delete-icon.svg";
import { IChat } from "../../../../public/interfaces/chat.interface";
const ChatsList: React.FC<{
  chats: IChat[];
  onDeleteChat: any;
  onSelectChat: any;
  onCreateChat: any;
}> = ({ chats, onDeleteChat, onSelectChat, onCreateChat }) => {
  const deleteChat = (chatId: string) => {
    onDeleteChat(chatId);
  };

  const selectChat = (chatId: string) => {
    onSelectChat(chatId);
  };

  const createChat = () => {
    onCreateChat();
  };

  return (
    <div className="h-full">
      <button onClick={() => createChat()}>
        <div className="transition-all ease-in-out duration-500 h-fit w-full  bg-teal-950  p-2 rounded-xl flex justify-center hover:shadow-inner hover:bg-teal-700 text-white ">
          Create chat
          <Image src={createIcon} alt="" width={25} height={25} />
        </div>
      </button>
      <div className="flex flex-col gap-2 p-2 ">
        {chats &&
          chats.map(cht => {
            return (
              <div
                key={cht.id}
                onClick={() => selectChat(cht.id)}
                className="transition-all ease-in-out duration-500 h-fit w-full bg-teal-900 border-teal-100 border-2 p-2 rounded-xl flex justify-between text-teal-100 hover:text-teal-950 hover:bg-teal-500 hover:border-teal-950 hover:shadow-inner"
              >
                <div className="rounded-xl mx-2">{cht.name}</div>
                <button onClick={() => deleteChat(cht.id)} className="rounded-xl">
                  <Image src={deleteIcon} alt="" width={25} height={25} />
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ChatsList;
