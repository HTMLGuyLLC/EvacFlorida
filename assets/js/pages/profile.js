import React from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {useAuth0} from "../auth/auth0";
import Loading from "../components/loading";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles(theme => ({
    button: {
        marginTop: theme.spacing(2),
    },
    field: {
        width: '400px',
        maxWidth: '100%'
    },
    lightText: {
        color: '#6f6f6f',
        fontSize: '.8em',
        marginBottom: '1.5em',
    }
}));

export default function Profile(){
    const { loading, user } = useAuth0();
    const classes = useStyles();

    if (loading || !user) {
        return Loading();
    }

    return (
        <Container>
            <Grid container>
                <Grid item xs={6}>
                    <h1>Profile</h1>
                    <div>
                        <TextField
                            className={classes.field}
                            label="Name"
                            value={user.name}
                            margin="normal"
                        />
                    </div>
                    <div>
                        <TextField
                            className={classes.field}
                            label="Email"
                            value={user.email}
                            margin="normal"
                        />
                    </div>
                    <Button className={classes.button}
                            variant="contained"
                            color="primary">Save</Button>
                </Grid>
                <Grid item xs={6}>
                    <h1>Alerts</h1>
                    <div>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    inputProps={{
                                        'aria-label': 'primary checkbox',
                                    }}
                                    value="1" />
                            }
                            label="Warn me if my planned evac time grows significantly in popularity."
                        />
                        <p className={classes.lightText}>
                            If enabled, we will send you an email 6 hours and 3 hours prior to your departure time if 25% more people indicate they plan on leaving at the same time.
                        </p>
                    </div>
                    <div>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    inputProps={{
                                        'aria-label': 'primary checkbox',
                                    }}
                                    value="1" />
                            }
                            label="Remind me periodically to update my evac time"
                        />
                        <p className={classes.lightText}>
                            If enabled, we will send you an email every few hours to make sure you stil plan on leaving. Up until an hour prior to your departure.
                        </p>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
}