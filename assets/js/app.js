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
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import PrivateRoute from "./components/privateRoute";
import axios from "axios";

//add headers to axios requests so Symfony knows it's an XHR request
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

//set our theme's primary and secondary colors
const theme = createMuiTheme({
    palette: {
        primary: { main: '#3b9e1a' }, //green
        secondary: { main: '#333' }, //dark gray
    },
});

//on Auth0 redirect, handle with JS
const onRedirectCallback = appState => {
    window.history.replaceState(
        {},
        document.title,
        appState && appState.targetUrl
            ? appState.targetUrl
            : window.location.pathname
    );
};

//render our site
ReactDOM.render(
    <ThemeProvider theme={theme}>
        <Auth0Provider
            domain={config.domain}
            client_id={config.clientId}
            redirect_uri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
        >
            <BrowserRouter>
                <header className="header">
                    <Header />
                </header>
                <div className="main-content">
                    <div className="page-content">
                        <Switch>
                            <Route path="/" exact>
                                <Homepage />
                            </Route>
                            <PrivateRoute path="/profile">
                                <Profile />
                            </PrivateRoute>
                        </Switch>
                    </div>
                    <footer className="footer">
                        <Footer />
                    </footer>
                </div>
            </BrowserRouter>
        </Auth0Provider>
    </ThemeProvider>,
    document.querySelector('.flex-wrapper')
);