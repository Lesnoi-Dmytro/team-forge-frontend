import type { Field } from "../field/Field";
import type { Participant } from "../user/Participant";

export interface Event {
  id: number;
  name: string;
  link?: string;
  prize?: number;
  country: String;
  region?: String;
  city: String;
  startDate: string;
  endDate: string;
  endRegistrationDate: string;
  minTeamSize: number;
  maxTeamSize: number;
  maxParticipants?: number;
  online: Boolean;
  createdBy: number;
  eventFields: { field: Field }[];
}

export interface RegisterEvent
  extends Omit<
    Event,
    | "id"
    | "eventFields"
    | "startDate"
    | "endDate"
    | "endRegistrationDate"
    | "createdBy"
  > {
  eventFields: number[];
  startDate: Date;
  endDate: Date;
  endRegistrationDate: Date;
}

export interface EventParticipant {
  id: number;
  eventId: number;
  participantId: number;
  registredAt: string;
  participant: Participant;
}
