import "./App.css";
import { BrowserRouter } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { MaterialThemeProvider } from "./config/MaterialConfig";
import AppRoutes from "./AppRoutes";
import { UserContextOutlet } from "./states/UserContext";

function App() {
  return (
    <MaterialThemeProvider>
      <BrowserRouter>
        <UserContextOutlet>
          <AppRoutes />
        </UserContextOutlet>
      </BrowserRouter>
    </MaterialThemeProvider>
  );
}

export default App;
