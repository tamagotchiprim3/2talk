export interface IChatReqBody {
  model: string;
  messages: {
    role: string;
    content: string;
  }[];
  temperature?: number;
}
