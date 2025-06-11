import { useEffect, useState } from "react";
import { EventsService } from "../../services/events/EventsService";
import EventCard from "../../components/events/EventCard";
import type { Event } from "../../models/events/Events";
import { Box } from "@mui/material";

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const load = async () => {
      const events = await EventsService.get();
      setEvents(events);
    };

    load();
  }, []);

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </Box>
  );
};

export default EventsPage;
