import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthRoutes />}>
          <Route path="/" element={<div>Hui</div>} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
