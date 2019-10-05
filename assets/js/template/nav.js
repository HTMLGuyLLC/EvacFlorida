import React from "react";
import {useAuth0} from '../auth/auth0';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    root: {
        textAlign: 'right'
    },
});

export default function Nav(){
    const classes = useStyles();

    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
        <div className={classes.root}>
            {!isAuthenticated && (
                <Button variant="contained" color="primary"
                    onClick={() =>
                        loginWithRedirect({})
                    }
                >
                    Log in
                </Button>
            )}

            {isAuthenticated && user.name + <Button variant="contained" color="primary" onClick={() => logout()}>Log out</Button>}
        </div>
    );
};