import React from "react";
import {useAuth0} from '../auth/auth0';
import {makeStyles} from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Loading from "../components/loading";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Homepage from "../pages/homepage";
import PrivateRoute from "../components/privateRoute";
import Profile from "../pages/profile";

const useStyles = makeStyles(theme => ({
    root: {
        textAlign: 'right',
        marginTop: '2em',
        [theme.breakpoints.down('xs')]: {
            marginBottom: '.5em',
            marginTop: '.5em',
            textAlign: 'center',
        },
    },
    button: {
        marginLeft: '.25rem'
    },
}));

export default function Nav() {
    const classes = useStyles();
    const {isAuthenticated, loginWithRedirect, loading, logout, user} = useAuth0();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    if (isAuthenticated && (loading || !user)) {
        return Loading();
    }

    return (
        <div className={classes.root}>
            <Button component={Link} to="/" className={classes.button} variant="contained" color="secondary">Home</Button>
            {!isAuthenticated && (
                <Button className={classes.button} variant="contained" color="primary"
                        onClick={() =>
                            loginWithRedirect({})
                        }
                >
                    Log in
                </Button>
            )}

            {isAuthenticated &&
            (
                <span>
                        <Button className={classes.button}
                                variant="contained"
                                color="primary"
                                aria-controls="simple-menu"
                                aria-haspopup="true"
                                onClick={handleClick}>
                            {(user.name.split(' '))[0]}
                          </Button>
                          <Menu
                              id="simple-menu"
                              anchorEl={anchorEl}
                              keepMounted
                              open={Boolean(anchorEl)}
                              onClose={handleClose}
                          >
                            <MenuItem component={Link} to="/profile" onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={() => logout()}>Logout</MenuItem>
                          </Menu>
                    </span>
            )
            }
        </div>
    );
};