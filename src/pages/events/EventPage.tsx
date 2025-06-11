import styles from "./EventPage.module.css";
import { useEffect, useState } from "react";
import type { Event, EventParticipant } from "../../models/events/Events";
import { useParams } from "react-router-dom";
import { EventsService } from "../../services/events/EventsService";
import EventCard from "../../components/events/EventCard";
import { Typography } from "@mui/material";
import { useUser } from "../../hooks/useUser";
import UserCard from "../../components/users/UserCard";

const EventPage = () => {
  const { id } = useParams();
  const { user } = useUser();

  const [event, setEvent] = useState<Event>();
  const [eventParticipants, setEventParticipants] = useState<
    EventParticipant[]
  >([]);
  const [filteredParticipants, setFilteredParticipants] = useState<
    EventParticipant[]
  >([]);
  const [registered, setRegistered] = useState<boolean>(false);

  const onRegister = async (eventId: number) => {
    if (user?.participant) {
      await EventsService.registerParticipant(eventId);
      setRegistered(true);
    }
  };

  useEffect(() => {
    const load = async () => {
      if (id) {
        const eventId = Number(id);
        const event = await EventsService.getById(eventId);
        const eventParticipants = await EventsService.eventParticipants(
          eventId
        );

        setEvent(event);
        setEventParticipants(eventParticipants);
      }
    };

    load();
  }, [id, user]);

  useEffect(() => {
    if (
      registered ||
      eventParticipants.find(
        (participant) => participant.participant.userId === user?.id
      )
    ) {
      setRegistered(true);
    } else {
      setRegistered(false);
    }
    setFilteredParticipants(
      eventParticipants.filter(
        (participant) => participant.participant.userId !== user?.id
      )
    );
  }, [eventParticipants, registered, user]);

  return (
    <div>
      {event && (
        <EventCard
          event={event}
          single={true}
          showRegister={!!user?.participant}
          registred={registered}
          onRegister={onRegister}
        />
      )}
      <div className={styles.participantsHeader}>
        <Typography variant="h4">Participants</Typography>
      </div>
      <div className={styles.participantsContainter}>
        {filteredParticipants.map((eventParticipant) => (
          <UserCard
            key={eventParticipant.id}
            participant={eventParticipant.participant}
          />
        ))}
      </div>
    </div>
  );
};

export default EventPage;
