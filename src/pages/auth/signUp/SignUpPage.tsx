import {
  Alert,
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import styles from "./SignUpPage.module.css";
import { useContext, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { UserType } from "../../../models/user/User";
import { UserContext } from "../../../states/UserContext";
import { AuthService } from "../../../services/auth/AuthService";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [userType, setUserType] = useState<UserType>(UserType.PARTICIPANT);
  const [password, setPassword] = useState<string>("");
  const [signUpError, setSignUpError] = useState<boolean>(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const user = await AuthService.signUpUser({
        email,
        firstName,
        lastName,
        userType,
        password,
      });
      setUser(user);
      navigate("/events");
    } catch (e) {
      setSignUpError(true);
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <form className={styles.form} onSubmit={onSubmit}>
          <h3 className={styles.header}>Sign Up</h3>
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
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </FormControl>
          <FormControl className={styles.input}>
            <TextField
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </FormControl>
          <FormControl className={styles.input}>
            <InputLabel className={styles.label}>Account Type *</InputLabel>
            <Select
              label="Account Type"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              required
            >
              <MenuItem value={UserType.PARTICIPANT}>Participant</MenuItem>
              <MenuItem value={UserType.ORGINIZER}>Orginizer</MenuItem>
            </Select>
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
            Sign Up
          </Button>
          <Button variant="text" onClick={() => navigate("/auth/sign-in")}>
            Already have an account?
          </Button>
        </form>
      </Card>
      <Snackbar
        open={signUpError}
        autoHideDuration={3000}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        onClose={() => setSignUpError(false)}
      >
        <Alert
          onClose={() => setSignUpError(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Error creating user account
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SignUpPage;
