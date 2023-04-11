import { IMessage } from "../../../../../public/interfaces/message.interface";

interface Props {
  messages: IMessage[] | null;
}

const ChatMessages: React.FC<Props> = ({ messages }) => {
  return (
    <div className="h-3/4 overflow-y-auto flex flex-col justify-end">
      {messages
        ? messages.map((mssg: IMessage) =>
            mssg.from === "Me" ? (
              <div
                key={mssg.id}
                className="self-end bg-teal-500 p-3 my-1 rounded-lg max-w-md break-words "
              >
                <div className="text-teal-100 font-bold text-right">{mssg.from}</div>
                <div>{mssg.message}</div>
              </div>
            ) : (
              <div
                key={mssg.id}
                className="self-start bg-teal-500 p-3 my-1 rounded-lg max-w-md break-words "
              >
                <div className="text-teal-100 font-bold">{mssg.from}</div>
                <div>{mssg.message}</div>
              </div>
            )
          )
        : null}
    </div>
  );
};

export default ChatMessages;
