import styles from "./EventCard.module.css";
import { Button, Card, Chip, Typography } from "@mui/material";
import type { Event } from "../../models/events/Events";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { formatDate } from "../../utils/date";
import { Link } from "react-router-dom";

interface Props {
  event: Event;
  single?: boolean;
  showRegister?: boolean;
  registred?: boolean;
  onRegister?: (eventId: number) => void;
}

const EventCard = ({
  event,
  single = false,
  showRegister = false,
  registred = false,
  onRegister,
}: Props) => {
  return (
    <Card className={styles.card}>
      <Typography variant="h3">{event.name}</Typography>
      <Typography>
        {event.country}, {event.city}, {formatDate(event.startDate)}—
        {formatDate(event.endDate)} {`(${event.online ? "Online" : "On Site"})`}
      </Typography>
      <div className={styles.row}>
        {event.eventFields.map((field) => (
          <Chip key={field.field.id} label={field.field.name} />
        ))}
      </div>
      <div className={styles.rowBetween}>
        <Typography>{event.prize ? `${event.prize}$` : "No Prize"}</Typography>
        {single && showRegister && (
          <Button
            variant="outlined"
            onClick={() => {
              if (onRegister) {
                onRegister(event.id);
              }
            }}
            disabled={registred}
          >
            <Typography>{registred ? "Registered" : "Register"}</Typography>
          </Button>
        )}
        {!single && (
          <Link to={`/events/${event.id}`} className={styles.goButton}>
            <Button variant="outlined">
              <Typography>Go</Typography>
              <ChevronRightIcon />
            </Button>
          </Link>
        )}
      </div>
    </Card>
  );
};

export default EventCard;
