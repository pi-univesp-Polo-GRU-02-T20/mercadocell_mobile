import { postJSON } from "../../lib/helpers/request";
import { ROOT_URL } from "../application/settings";

export const login = async (
    user: string,
    password: string
  ) => {
    const data = { email: user.toLowerCase(), password };
  
    const response = await postJSON(
      `${ROOT_URL}/user/login`,
      data
    );
  
    return response;
};