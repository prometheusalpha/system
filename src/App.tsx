import Signup from "./components/Signup";
import { AuthProvider } from "./context/AuthContext";
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ChatBox from "./components/ChatBox";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "./firebase";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: [
      'SF Pro Text',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      color: "#fff",
    },
    h2: {
      color: "#fff",
    }
  }
});

function App() {
  const [user] = useAuthState(auth);

  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <AuthProvider >
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/" element={user ? <ChatBox /> : <Navigate to="/login" />} />
            <Route path="/*" element={user ? <Navigate to="/" /> : <Navigate to="/login" />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
