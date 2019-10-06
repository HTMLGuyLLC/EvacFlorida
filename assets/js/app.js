import '../sass/app.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import {Auth0Provider} from "./auth/auth0";
import config from "./auth/config.json";
import Header from "./template/header";
import Footer from "./template/footer";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Profile from "./pages/profile";
import Homepage from "./pages/homepage";

import axios from "axios";
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import PrivateRoute from "./components/privateRoute";
const theme = createMuiTheme({
    palette: {
        primary: { main: '#3b9e1a' },
        secondary: { main: '#333' },
    },
});

const onRedirectCallback = appState => {
    window.history.replaceState(
        {},
        document.title,
        appState && appState.targetUrl
            ? appState.targetUrl
            : window.location.pathname
    );
};

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <Auth0Provider
            domain={config.domain}
            client_id={config.clientId}
            redirect_uri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
        >
            <header className="header">
                <Header />
            </header>
            <div className="main-content">
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact>
                            <Homepage />
                        </Route>
                        <PrivateRoute path="/profile">
                            <Profile />
                        </PrivateRoute>
                    </Switch>
                </BrowserRouter>
            </div>
            <footer className="footer">
                <Footer />
            </footer>
        </Auth0Provider>
    </ThemeProvider>,
    document.querySelector('.flex-wrapper')
);