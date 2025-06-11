import { createContext, useEffect, useState } from "react";
import { AuthService } from "../services/auth/AuthService";
import type { User } from "../models/user/User";

export const UserContext = createContext<{
  user: User | null;
  setUser: (value: User | null) => void;
  loading: boolean;
  loadUser: () => Promise<void>;
}>({ user: null, setUser: () => {}, loading: true, loadUser: async () => {} });

interface Props {
  children: React.ReactNode;
}

export function UserContextOutlet({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [firstLoad, setFirstLoad] = useState<boolean>(true);

  const loadUser = async () => {
    if (!firstLoad && loading) {
      return;
    }

    setFirstLoad(true);
    setLoading(true);
    try {
      const user = await AuthService.getCurrentUser();
      setUser(user);
    } catch (e) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading, loadUser }}>
      {children}
    </UserContext.Provider>
  );
}
