import React, { useState } from "react";
import MomentUtils from '@date-io/moment';
import {MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker} from "@material-ui/pickers";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles(theme => ({
    field: {
        width: '400px',
        maxWidth: '100%'
    }
}));

//get highways and populate the dropdown
axios.get('/highways').then(function(data){
    data.data.highways.forEach(function(highway){
        let option = document.createElement("option");
        option.value = highway.id;
        option.text = highway.name;
        document.querySelector('.highway-dd').innerHTML += option.outerHTML;
    });
}).catch(function(error){
    alert(error);
});

export default function DepartureForm(){
    const classes = useStyles();

    const [selectedDate, handleDateChange] = useState(new Date());
    const [selectedHighway, handleHighwayChange] = useState(new Date());

    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <Grid container justify="space-between">
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/DD/YYYY"
                    margin="normal"
                    id="date-picker-inline"
                    label="Departure Date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
                <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label="Departure Time"
                    value={selectedDate}
                    views={['hours','minutes']}
                    minutesStep={30}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change time',
                    }}
                    />
                <Select
                    className="highway-dd"
                    value={selectedHighway}
                    onChange={handleHighwayChange}
                    label="Highway you plan on Taking"
                    inputProps={{
                        name: 'highway',
                        id: 'highway_id',
                    }}
                >
                </Select>
            </Grid>
        </MuiPickersUtilsProvider>
    );
}