import React from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {Line} from "react-chartjs-2";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Stat from "../components/stat";
import DepartureForm from "../components/departureForm";

const useStyles = makeStyles(theme => ({
    header: {
      marginBottom: '.5em',
      borderBottom: '2px solid #f3f3f3',
      paddingBottom: '.5em',
      marginRight: '.5em',
    },
    mainCol: {
        marginRight: '1em',
    },
    sidebar: {
        padding: '.5em 2em', 
        background: '#f3f3f3',
        border: '1px solid #d2d2d2',
    },
}));

Chart.defaults.global.elements.point.borderColor = 'transparent';
Chart.defaults.global.elements.point.radius = 0;

let options = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
};

const colors = [
    '#3b9e1a',
    '#ad1313',
    '#1cd7e1',
    '#1334ad',
    '#6217ad',
];

let data = {
    labels: ['4pm', '5pm', '6pm', '7pm', '8pm', '9pm'],
    datasets: [{
        label: '75-N',
        data: [3740, 3460, 7430, 9650, 2350, 160],
        borderColor: colors[0],
        backgroundColor: colors[0],
        fill: false,
        borderWidth: 3
    },
    {
        label: '75-S',
        data: [2350, 1630, 1780, 1440, 970, 320],
        borderColor: colors[1],
        backgroundColor: colors[1],
        fill: false,
        borderWidth: 3
    },
    {
        label: 'Turnpike-N',
        data: [3530, 3160, 8430, 6330, 1670, 350],
        borderColor: colors[2],
        backgroundColor: colors[2],
        fill: false,
        borderWidth: 3
    },
    {
        label: 'Turnpike-S',
        data: [1530, 630, 740, 260, 160, 30],
        borderColor: colors[3],
        backgroundColor: colors[3],
        fill: false,
        borderWidth: 3
    },
    {
        label: '75-W',
        data: [4360, 2360, 5670, 7570, 2360, 1580],
        borderColor: colors[4],
        backgroundColor: colors[4],
        fill: false,
        borderWidth: 3
    },]
};

export default function Homepage() {
    const classes = useStyles();

    /* Demo numbers + 23,538 (staying) */
    return (
        <Container>
            <Grid container>
                <Grid item xs={9}>
                    <div className={classes.mainCol}>
                        <h1 className={classes.header}>Predicted Evacuation Traffic from Palm Beach County</h1>
                        { Stat('Palm Beach Pop.', '1.47 million', '') }
                        { Stat('Respondents', '109,538', '7.45') }
                        { Stat('Leaving', '86,000', '78.51') }
                        { Stat('Staying', '23,538', '21.49') }
                        <Line data={data} options={options}></Line>
                    </div>
                    <div>
                        <DepartureForm />
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <div className={classes.sidebar}>
                        <h1>Weather</h1>

                        <h1>Mandatory Evac</h1>

                        <h1>Flood Zones</h1>

                        <h1>Gas Availability</h1>

                        <h1>Checklist</h1>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
}