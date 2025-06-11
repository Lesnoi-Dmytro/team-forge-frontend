import { clientApi } from "../../config/axiosConfig";
import type { AuthResponse } from "../../models/auth/AuthResponse";
import type {
  CompleteOrginizerSignUp,
  CompletePartipantSignUp,
  CreateUserRequest,
  SignInRequest,
} from "../../models/auth/AuthRequests";
import type { User } from "../../models/user/User";

export const AUTH_TOKEN_KEY = "jwt";

export const AuthService = {
  async getCurrentUser() {
    const response = await clientApi.get<User>("/auth/user");
    return response.data;
  },
  async signInUser(data: SignInRequest) {
    const response = await clientApi.post<AuthResponse>("/auth/sign-in", data);
    localStorage.setItem(AUTH_TOKEN_KEY, response.data.token);
    return response.data.user;
  },
  async signUpUser(data: CreateUserRequest) {
    const response = await clientApi.post<AuthResponse>("/auth/sign-up", data);
    localStorage.setItem(AUTH_TOKEN_KEY, response.data.token);
    return response.data.user;
  },
  async completeParticipantSignUp(data: CompletePartipantSignUp) {
    const response = await clientApi.post<User>(
      "/auth/sign-up/participant",
      data
    );
    return response.data;
  },
  async completeOrginizerSignUp(data: CompleteOrginizerSignUp) {
    const response = await clientApi.post<User>(
      "/auth/sign-up/orginizer",
      data
    );
    return response.data;
  },
  signOut() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  },
};
