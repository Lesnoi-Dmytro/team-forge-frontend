import { Button, Card, FormControl, TextField } from "@mui/material";
import styles from "./OrginizerSignUpPage.module.css";
import { useContext, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../../services/auth/AuthService";
import { UserContext } from "../../../states/UserContext";

const OrginizerSignUpPage = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [organizationName, setOrganizationName] = useState<string>("");
  const [organizationLink, setOrganizationLink] = useState<string>("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const user = await AuthService.completeOrginizerSignUp({
        organizationName,
        organizationLink,
      });
      setUser(user);
      navigate("/events");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <form className={styles.form} onSubmit={onSubmit}>
          <h3 className={styles.header}>Complete Organizer Sign Up</h3>
          <FormControl className={styles.input}>
            <TextField
              label="Orgaization Name"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
              required
            />
          </FormControl>
          <FormControl className={styles.input}>
            <TextField
              label="Organization Link"
              value={organizationLink}
              type="link"
              onChange={(e) => setOrganizationLink(e.target.value)}
            />
          </FormControl>
          <Button type="submit" variant="contained">
            Complete Sign Up
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default OrginizerSignUpPage;
