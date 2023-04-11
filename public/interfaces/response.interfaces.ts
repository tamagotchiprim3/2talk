export interface IPromptResponse {
  id: string;
  object: string;
  model: string;
  created: number | Date;
  choices: {
    finish_reason: string;
    index: number;
    message: {
      role: string;
      content: string;
    };
  }[];
  usage: {
    completion_tokens: number;
    prompt_tokens: number;
    total_tokens: number;
  };
  statusCode: number;
}
