import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect, createContext } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import Routes from "./Routes";
import Nav from "./components/Nav";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { createStore, applyMiddleware, compose } from "redux";
import { reducers } from "./redux/reducers";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

export const UserContext = createContext({});

function App() {
  const [loading, setLoading] = useState(true);
  const [userSession, setUserSession] = useState(true);
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    reducers,
    {},
    composeEnhancers(applyMiddleware(thunk))
  );

  useEffect(() => {
    const fetchUserAuth = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/isAuth");
        if (!res.ok) return setLoading(false);
        setUserSession(await res.json());
        console.log(userSession);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("There was an error fetching", error);
        return;
      }
    };
    fetchUserAuth();
  }, []);
  return (
    <UserContext.Provider value={userSession}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GoogleOAuthProvider clientId="389927153738-9n3bpvcsb4barloiflhdec28s7o7q2mr.apps.googleusercontent.com">
            <CssBaseline />
            <Nav />
            <br />
            {loading ? <>loading...</> : <Routes />}
          </GoogleOAuthProvider>
        </ThemeProvider>
      </Provider>
    </UserContext.Provider>
  );
}

export default App;
