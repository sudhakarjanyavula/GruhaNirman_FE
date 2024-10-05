import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import AppRoutes from "./routes/AppRoutes";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';


const theme = createTheme({
  palette: {
    primary: {
      main: '#333165',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppRoutes />
      </Router>
    </ThemeProvider>
  );
}

export default App;