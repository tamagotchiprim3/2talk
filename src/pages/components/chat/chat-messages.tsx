import { IMessage } from "../../../../public/interfaces/message.interface";

interface Props {
  messages: IMessage[] | null;
}

const ChatMessages: React.FC<Props> = ({ messages }) => {
  return (
    <div className="h-3/4  flex flex-col justify-end ">
      <div className="overflow-auto flex flex-col scrollbar">
        {messages
          ? messages.map((mssg: IMessage) =>
              mssg.from === "Me" ? (
                <div
                  key={mssg.id}
                  className="self-end basis-3 flex-1 bg-teal-500 p-3 my-1 rounded-lg max-w-md break-words "
                >
                  <div className="text-teal-100 font-bold text-right">{mssg.from}</div>
                  <div className="text-right">{mssg.message}</div>
                </div>
              ) : (
                <div
                  key={mssg.id}
                  className="self-start flex-1 bg-teal-500 p-3 my-1 rounded-lg max-w-md break-words "
                >
                  <div className="text-teal-100 font-bold">{mssg.from}</div>
                  <div className="text-left">{mssg.message}</div>
                </div>
              )
            )
          : null}
      </div>
    </div>
  );
};

export default ChatMessages;
