import { IChat } from "../interfaces/chat.interface";

export const chatMock = (isSelected: boolean, id: string): IChat => {
  return {
    id: id,
    name: "New chat",
    messages: [],
    isSelected: isSelected,
  };
};
