import React, {useState} from "react";
import MomentUtils from '@date-io/moment';
import {MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker} from "@material-ui/pickers";
import {HighwayDropdown} from "./highwayDropdown";
import Grid from "@material-ui/core/Grid";
import {TextField} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import moment from "moment";
import axios from "axios";

const useStyles = makeStyles(theme => ({
    header: {
        marginBottom: 0
    },
    button: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    }
}));

function round(date, duration, method) {
    return moment(Math[method]((+date) / (+duration)) * (+duration));
}

export default function DepartureForm(onSuccess) {
    const classes = useStyles();

    const [selectedDate, handleDateChange] = useState(round(new Date(), moment.duration(30, "minutes"), 'ceil'));
    const [selectedTime, handleTimeChange] = useState(round(new Date(), moment.duration(30, "minutes"), 'ceil'));
    const [is_leaving, setIsLeaving] = useState(true);
    const [highway, setHighway] = useState('2-N');
    const [email, setEmail] = useState('');

    const handleLeavingChange = event => {
        setIsLeaving(event.target.value);
    };

    const handleHighwayChange = val => {
        setHighway(val);
    };

    const handleSetEmail = val => {
        setEmail(val);
    };

    const handleSubmit = event => {
        event.preventDefault();

        /** @Todo: Validate submitted data */
        if (is_leaving) {
            /** @Todo: Validate data related to leaving */
        }

        let [highway_id, dir] = highway.split('-');

        const data = {
            is_leaving: is_leaving,
            date: selectedDate.format("YYYY-MM-DD") + ' ' + selectedTime.format("HH:mm"),
            highway: highway_id,
            direction: dir,
            email: email
        };

        axios({
            url: '/departures',
            method: 'post',
            data: data,
        }).then(res => {
            onSuccess(data);
        });

        return false;
    };

    const submitForm = event => {
        handleSubmit(event);
    };

    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <h2 className={classes.header}>What's your Evacuation Plan?</h2>

            <form onSubmit={handleSubmit}>
                <Grid container
                      direction="column">
                    <TextField
                        select
                        required
                        margin="normal"
                        value={is_leaving}
                        onChange={handleLeavingChange}
                        inputProps={{
                            name: 'is_leaving',
                        }}
                    >
                        <MenuItem key={0} value={false}>I'm planning on staying</MenuItem>
                        <MenuItem key={1} value={true}>I'm evacuting</MenuItem>
                    </TextField>
                    <Grid container
                          className={is_leaving ? '' : 'hidden'}
                          direction="column"
                          alignItems="stretch">
                        <KeyboardDatePicker
                            required
                            disableToolbar
                            margin="normal"
                            variant="inline"
                            format="MM/DD/YYYY"
                            label="Departure Date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <KeyboardTimePicker
                            required
                            label="Departure Time"
                            margin="normal"
                            value={selectedTime}
                            views={['hours', 'minutes']}
                            minutesStep={30}
                            onChange={handleTimeChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                        />
                        <HighwayDropdown highway={highway} onChange={handleHighwayChange}/>
                    </Grid>
                    <Grid container
                          direction="column"
                          alignItems="stretch">
                        <TextField
                            required
                            type="email"
                            value={email}
                            onChange={handleSetEmail}
                            label="Email"
                            margin="normal"
                            inputProps={{
                                name: 'email',
                            }}
                        />
                    </Grid>
                    <div>
                        <Button
                            onClick={submitForm}
                            className={classes.button}
                            variant="contained"
                            color="primary">Submit</Button>
                    </div>
                </Grid>
            </form>
        </MuiPickersUtilsProvider>
    );
}