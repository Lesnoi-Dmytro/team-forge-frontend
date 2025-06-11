import { useContext } from "react";
import { UserContext } from "../states/UserContext";
import type { User } from "../models/user/User";

export function useUser(): { user: User | null; loading: boolean } {
  const userContext = useContext(UserContext);
  return { user: userContext.user, loading: userContext.loading };
}
