import { IMessage } from "./message.interface";

export interface IChat {
  id: string;
  name: string;
  messages: IMessage[];
  isSelected: boolean;
}
