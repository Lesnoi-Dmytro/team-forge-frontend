import styles from "./AuthedLayout.module.css";
import LogoutIcon from "@mui/icons-material/Logout";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import IconButton from "@mui/material/IconButton";
import { useContext } from "react";
import { UserContext } from "../../states/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../../services/auth/AuthService";
import { useUser } from "../../hooks/useUser";

interface Props {
  children: React.ReactNode;
}

const AuthedLayout = ({ children }: Props) => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const { user } = useUser();

  const onSignOut = () => {
    AuthService.signOut();
    setUser(null);
    navigate("/auth/sign-in");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to="/" className={styles.link}>
          <img src="/logo.svg" height={32} width={32} />
          <h3>TeamForge</h3>
        </Link>
        <div className={styles.actionButtons}>
          {user?.organizer && (
            <Link to="/events/register">
              <IconButton>
                <AppRegistrationIcon />
              </IconButton>
            </Link>
          )}
          <IconButton onClick={onSignOut}>
            <LogoutIcon />
          </IconButton>
        </div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default AuthedLayout;
