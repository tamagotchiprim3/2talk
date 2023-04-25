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
  // const renameChat = () => {
  //   onRenameChat(chatId)
  // }
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
    <div className="h-full  flex flex-col ">
      <button
        onClick={() => createChat()}
        className="w-full p-2  bg-teal-700 hover:shadow-inner hover:bg-teal-600 text-white transition-all ease-in-out duration-500"
      >
        <div className=" flex justify-center ">
          <div>Create chat </div>
          <Image src={createIcon} alt="" width={25} height={25} />
        </div>
      </button>
      <div className="flex flex-col flex-1 basis-0 overflow-y-auto scrollbar">
        {chats &&
          chats.map(cht => {
            return (
              <div
                key={cht.id}
                onClick={() => selectChat(cht.id)}
                className="transition-all ease-in-out duration-500 border-y  border-teal-950  bg-teal-900 p-2  flex justify-between items-center text-teal-100  hover:cursor-pointer  hover:bg-teal-800 hover:border-teal-950 hover:shadow-inner"
              >
                <div className="rounded-xl mx-2 flex justify-center items-center h-24">
                  {cht.name}
                </div>
                <button
                  onClick={() => deleteChat(cht.id)}
                  className="h-10 w-10 flex justify-center items-center"
                >
                  <Image src={deleteIcon} alt="" width={25} height={25} />
                </button>
                <button
                  onClick={() => deleteChat(cht.id)}
                  className="h-10 w-10 flex justify-center items-center"
                >
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
