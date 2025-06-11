import type { EventOrganizer } from "./EventOrginizer";
import type { Participant } from "./Participant";

export enum UserType {
  ORGINIZER = "ORGINIZER",
  PARTICIPANT = "PARTICIPANT",
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  image: string | null;
  userType: UserType;
  participant?: Participant;
  organizer: EventOrganizer;
}
