import { User } from "../classes/user";

export interface LoginResponse {
  token: string;
  user: User;
}
