import type { User } from "../user/User";

export interface AuthResponse {
  user: User;
  token: string;
}
