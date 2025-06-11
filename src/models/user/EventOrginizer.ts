import type { User } from "./User";

export interface EventOrganizer {
  id: number;
  userId: number;
  organizationName: string | null;
  organizationLink: string | null;
  user?: User;
}
