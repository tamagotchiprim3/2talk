import { useEffect, useRef } from "react";
import { IMessage } from "../../../../public/interfaces/message.interface";

interface Props {
  messages: IMessage[] | null;
  reqStatus: string;
}

const ChatMessages: React.FC<Props> = ({ messages, reqStatus }) => {
  const listRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="overflow-y-auto overflow-x-hidden flex-1 flex flex-col justify-end rounded-lg ">
      <div
        ref={listRef}
        className="overflow-y-auto overflow-x-hidden flex flex-col rounded-lg px-2 scrollbar"
      >
        {messages
          ? messages.map((mssg: IMessage) =>
              mssg.role === "user" ? (
                <div
                  key={mssg.id}
                  className="self-end flex-1 bg-teal-500 p-3 my-1 rounded-3xl max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm 2xl:max-w-md break-words animate-completionPopup"
                >
                  <div className="text-teal-100 font-bold text-right">User</div>
                  <div className="text-justify">{mssg.content}</div>
                </div>
              ) : (
                <div
                  key={mssg.id}
                  className="self-start flex-1 text-white bg-teal-700 p-3 my-1 rounded-3xl max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm 2xl:max-w-md break-words animate-replyPopup"
                >
                  <div className="text-teal-300 font-bold">Assistant</div>
                  <div className="text-justify">{mssg.content}</div>
                </div>
              )
            )
          : null}
        {reqStatus === "pending" && (
          <div className="flex gap-1 bg-teal-700 p-3 rounded-full w-min animate-replyPopup">
            <div className="animate-bounce">
              <svg height="20" width="20">
                <circle cx="10" cy="10" r="10" fill="rgb(20 184 166)" />
              </svg>{" "}
            </div>
            <div className="animate-[bounce_1s_infinite_100ms] ">
              <svg height="20" width="20">
                <circle cx="10" cy="10" r="10" fill="rgb(20 184 166)" />
              </svg>{" "}
            </div>
            <div className="animate-[bounce_1s_infinite_200ms]">
              <svg height="20" width="20">
                <circle cx="10" cy="10" r="10" fill="rgb(20 184 166)" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessages;
