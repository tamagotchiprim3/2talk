import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { API_KEY } from "../../../../../public/constants/api-key.conts";
import { IMessage } from "../../../../../public/interfaces/message.interface";
import { IChatReqBody } from "../../../../../public/interfaces/request-body.interface";
import { IPromptResponse } from "../../../../../public/interfaces/response.interfaces";
import ChatForm from "./chat-form";
import ChatMessages from "./chat-messages";

const Chat: React.FC<{}> = ({}) => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const handleFormSubmit = async (data: IMessage) => {
    // Update the messages state with the user message
    const userMessage: IMessage = {
      from: "Me",
      message: data.message,
      id: uuidv4(),
    };
    setMessages(messages => [...messages, userMessage]);

    // Call the API to get the response from the assistant
    const requestBody: IChatReqBody = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: data.message,
        },
      ],
    };
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(requestBody),
    });

    const responseData: IPromptResponse = await response.json();
    console.log("responseData: ", responseData);

    // Update the messages state with the assistant message
    const assistantMessage: IMessage = {
      from: "Assistant",
      message: responseData?.choices[0]?.message?.content,
      id: uuidv4(),
    };
    setMessages(messages => [...messages, assistantMessage]);
  };
  return (
    <div className="col-start-2 col-end-5 py-14">
      <ChatMessages messages={messages} />
      <ChatForm onPromptSubmit={handleFormSubmit} />
    </div>
  );
};

export default Chat;
