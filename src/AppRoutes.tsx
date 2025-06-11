import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import SignUpPage from "./pages/auth/signUp/SignUpPage";
import OrginizerSignUpPage from "./pages/signIn/orginizer/OrginizerSignUpPage";
import SignInPage from "./pages/auth/signIn/SignInPage";
import ParticipantSignUpPage from "./pages/signIn/participant/ParticipantSignUpPage";
import AuthedLayout from "./components/authed/AuthedLayout";
import EventsPage from "./pages/events/EventsPage";
import RegisterEventPage from "./pages/events/register/RegisterEventPage";
import EventPage from "./pages/events/EventPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/auth">
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
      </Route>

      <Route element={<AuthRoutes />}>
        <Route
          element={
            <AuthedLayout>
              <Outlet />
            </AuthedLayout>
          }
        >
          <Route
            path="/sign-up/participant"
            element={<ParticipantSignUpPage />}
          />
          <Route path="/sign-up/orginizer" element={<OrginizerSignUpPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventPage />} />
          <Route path="/events/register" element={<RegisterEventPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/events" />} />
    </Routes>
  );
}

export default AppRoutes;
