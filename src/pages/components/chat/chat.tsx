import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { IMessage } from "../../../../public/interfaces/message.interface";
import { IChatReqBody } from "../../../../public/interfaces/request-body.interface";
import { IPromptResponse } from "../../../../public/interfaces/response.interfaces";
import ChatForm from "./chat-form";
import ChatMessages from "./chat-messages";

const Chat: React.FC<{}> = ({}) => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const handleFormSubmit = async (data: IMessage) => {
    console.log(process.env.REACT_APP_API_KEY);
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
    let responseData: IPromptResponse | null = null;
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Bearer ${process.env.NOW_GITHUB_COMMIT_SHA}`,
        },
        body: JSON.stringify(requestBody),
      });
      responseData = await res.json();
    } catch (error) {
      console.error("Error:", error);
    }

    if (responseData && responseData?.choices?.length > 0) {
      const assistantMessage: IMessage = {
        from: "Assistant",
        message: responseData?.choices[0]?.message?.content,
        id: uuidv4(),
      };
      setMessages(messages => [...messages, assistantMessage]);
    }
  };

  return (
    <div className="h-full flex flex-col col-start-2 col-end-3 py-14">
      <ChatMessages messages={messages} />
      <ChatForm onPromptSubmit={handleFormSubmit} />
    </div>
  );
};
export default Chat;
