import { clientApi } from "../../config/axiosConfig";
import type {
  Event,
  EventParticipant,
  RegisterEvent,
} from "../../models/events/Events";

export const EventsService = {
  async get() {
    const response = await clientApi.get<Event[]>("/events");
    return response.data;
  },
  async getById(id: number) {
    const response = await clientApi.get<Event>(`/events/${id}`);
    return response.data;
  },
  async register(data: RegisterEvent) {
    const response = await clientApi.post<Event>("/events", data);
    return response.data;
  },
  async registerParticipant(id: number) {
    const response = await clientApi.post<EventParticipant>(
      `/events/${id}/participants`,
      {}
    );
    return response.data;
  },
  async eventParticipants(id: number) {
    const response = await clientApi.get<EventParticipant[]>(
      `/events/${id}/participants`
    );
    return response.data;
  },
};
