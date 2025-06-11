import {
  Alert,
  Button,
  Card,
  FormControl,
  Snackbar,
  TextField,
} from "@mui/material";
import styles from "./SignInPage.module.css";
import { useContext, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../../services/auth/AuthService";
import { UserContext } from "../../../states/UserContext";

const SignInPage = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [authError, setAuthError] = useState<boolean>(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const user = await AuthService.signInUser({ email, password });
      setUser(user);
      navigate("/events");
    } catch (e) {
      setAuthError(true);
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <form className={styles.form} onSubmit={onSubmit}>
          <h3 className={styles.header}>Sign In</h3>
          <FormControl className={styles.input}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>
          <FormControl className={styles.input}>
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormControl>
          <Button type="submit" variant="contained">
            Sign In
          </Button>
          <Button variant="text" onClick={() => navigate("/auth/sign-up")}>
            Create Account
          </Button>
        </form>
      </Card>
      <Snackbar
        open={authError}
        autoHideDuration={3000}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        onClose={() => setAuthError(false)}
      >
        <Alert
          onClose={() => setAuthError(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Invalid Creadentials
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SignInPage;
