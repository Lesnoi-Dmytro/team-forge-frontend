import { Navigate, Route, Routes } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import SignUpPage from "./pages/auth/signUp/SignUpPage";
import OrginizerSignUpPage from "./pages/signIn/orginizer/OrginizerSignUpPage";
import SignInPage from "./pages/auth/signIn/SignInPage";
import ParticipantSignUpPage from "./pages/signIn/participant/ParticipantSignUpPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/auth">
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
      </Route>

      <Route element={<AuthRoutes />}>
        <Route
          path="/sign-up/participant"
          element={<ParticipantSignUpPage />}
        />
        <Route path="/sign-up/orginizer" element={<OrginizerSignUpPage />} />
        <Route path="/events" element={<div>Test</div>} />
      </Route>

      <Route path="*" element={<Navigate to="/events" />} />
    </Routes>
  );
}

export default AppRoutes;
