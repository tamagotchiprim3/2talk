import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { IChat } from "../../../../public/interfaces/chat.interface";
import { IMessage } from "../../../../public/interfaces/message.interface";
import { IChatReqBody } from "../../../../public/interfaces/request-body.interface";
import { IPromptResponse } from "../../../../public/interfaces/response.interfaces";
import ChatForm from "./chat-form";
import ChatMessages from "./chat-messages";
import MobileChatHeader from "./mobile-chat-header";

const Chat: React.FC<{ chat: IChat | null; onUpdateChat: any; onBackToList: any }> = ({
  chat,
  onUpdateChat,
  onBackToList,
}) => {
  const [reqStatus, setReqStatus] = useState<string>("");

  // useEffect(() => {
  //   const localMessages = localStorage.getItem("messages");
  //   if (localMessages) {
  //     setMessages(JSON.parse(localMessages));
  //   }
  // }, []);

  // useEffect(() => {
  //   if (messages.length !== 0) localStorage.setItem("messages", JSON.stringify(messages));
  // }, [messages]);

  const handleFormSubmit = async (data: IMessage) => {
    // Update the messages state with the user message
    const userMessage: IMessage = {
      role: data.role,
      content: data.content,
      id: uuidv4(),
    };

    localStorage.setItem("messages", JSON.stringify([...(chat?.messages || []), userMessage]));
    onUpdateChat(chat?.id, userMessage);
    setReqStatus("pending");

    // Call the API to get the response from the assistant
    const requestBody: IChatReqBody = {
      model: "gpt-3.5-turbo",
      messages: [...(chat?.messages || []), userMessage].map(
        (msg: { role: string; content: string }) => {
          return {
            role: msg.role,
            content: msg.content,
          };
        }
      ),
    };
    let responseData: IPromptResponse | null = null;
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_REACT_APP_API_KEY}`,
        },
        body: JSON.stringify(requestBody),
      });
      setReqStatus("success");
      responseData = await res.json();
    } catch (error) {
      console.error("Error:", error);
    }

    if (responseData && responseData?.choices?.length > 0) {
      const assistantMessage: IMessage = {
        role: "assistant",
        content: responseData?.choices[0]?.message?.content,
        id: uuidv4(),
      };
      localStorage.setItem(
        "messages",
        JSON.stringify([...(chat?.messages || []), assistantMessage])
      );
      onUpdateChat(chat?.id, assistantMessage);
    }
  };

  const handleBackToList: any = () => {
    onBackToList();
  };

  return (
    <div className="h-full w-full flex flex-col overflow-hidden bg-teal-950  lg:col-start-1 lg:col-end-4 xl:col-start-2 xl:col-end-4">
      <MobileChatHeader name={chat?.name || ""} onBackToList={handleBackToList} />
      <ChatMessages messages={chat?.messages} reqStatus={reqStatus} />
      <ChatForm onPromptSubmit={handleFormSubmit} />
    </div>
  );
};
export default Chat;
