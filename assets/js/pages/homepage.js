import React from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {Line} from "react-chartjs-2";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Stat from "../components/stat";
import DepartureForm from "../components/departureForm";
import {Checkbox} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import SampleData from '../sample-data/chart';

const border = '2px solid #f3f3f3';

const useStyles = makeStyles(theme => ({
    header: {
      marginBottom: '.5em',
      borderBottom: border,
      paddingBottom: '.5em',
      marginTop: 0,
      marginRight: '1em',
    },
    chart: {
        borderBottom: border,
        paddingBottom: '2em',
        marginBottom: '2em',
    },
    mainCol: {
        marginRight: '1em',
    },
    stats: {
      marginBottom: '.5em',
      paddingBottom: '.5em',
      borderBottom: border,
    },
    sidebar: {
        padding: '.5em 2em',
        marginTop: '2em',
        background: '#f3f3f3',
        border: '1px solid #d2d2d2',
    },
}));

Chart.defaults.global.elements.point.borderColor = 'transparent';
Chart.defaults.global.elements.point.radius = 0;

export default function Homepage() {
    const classes = useStyles();

    return (
        <Container>
            <Grid container>
                <Grid item xs={9}>
                    <div className={classes.mainCol}>
                        <h1 className={classes.header}>Predicted Evacuation Traffic from Palm Beach County</h1>
                        <div className={classes.stats}>
                            { Stat('Palm Beach Pop.', '1.47 million', '') }
                            { Stat('Respondents', '109,538', '7.45') }
                            { Stat('Leaving', '86,000', '78.51') }
                            { Stat('Staying', '23,538', '21.49') }
                        </div>
                        <div className={classes.chart}>
                            <Line
                                data={SampleData.data}
                                options={SampleData.options}></Line>
                        </div>
                    </div>
                    <h2>Leaving? Are you Prepared?</h2>
                    <p>
                        Things to bring with you when you evacuate:
                    </p>
                    <div>
                        <FormControlLabel
                            control={
                                <Checkbox />
                            }
                            label="Pets / Pet Food & Supplies"
                        />
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <div className={classes.sidebar}>
                        <DepartureForm />
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
}