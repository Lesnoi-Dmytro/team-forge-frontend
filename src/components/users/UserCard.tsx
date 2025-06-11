import styles from "./UserCard.module.css";
import { Card, Chip, Typography } from "@mui/material";
import type { Participant } from "../../models/user/Participant";

interface Props {
  participant: Participant;
}

const UserCard = ({ participant }: Props) => {
  return (
    <Card className={styles.card}>
      <Typography variant="h4">
        {participant.user?.firstName} {participant.user?.lastName}
      </Typography>
      <Typography>
        {participant.country}, {participant.city}
      </Typography>
      <div className={styles.row}>
        {participant.userFields.map(({ field }) => (
          <Chip key={field.id} label={field.name} />
        ))}
      </div>
    </Card>
  );
};

export default UserCard;
