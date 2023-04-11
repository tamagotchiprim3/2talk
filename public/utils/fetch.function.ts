import { API_KEY } from "../constants/api-key.conts";
import { IChatReqBody } from "../interfaces/request-body.interface";
import { IPromptResponse } from "../interfaces/response.interfaces";

const fetchWithKey = async (
  url: string,
  opt?: { method: string; headers?: any; body?: IChatReqBody }
): Promise<IPromptResponse> => {
  const response = await fetch(url, {
    method: opt?.method,
    headers: {
      ...opt?.headers,
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(opt?.body),
  });
  const outputData = await response.json();
  return { ...outputData, statusCode: response.status };
};

export default fetchWithKey;
