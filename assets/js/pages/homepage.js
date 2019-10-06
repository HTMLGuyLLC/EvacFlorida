import React, {Fragment, useState} from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {Line} from "react-chartjs-2";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Stat from "../components/stat";
import DepartureForm from "../components/departureForm";
import {Checkbox} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import SampleData from '../sample-data/chart';
import Button from "@material-ui/core/Button";
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Popover from "@material-ui/core/Popover";

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
    shareWrapper: {
        padding: '1em',
    },
    shareBtn: {
        marginLeft: '.5em'
    }
}));

Chart.defaults.global.elements.point.borderColor = 'transparent';
Chart.defaults.global.elements.point.radius = 0;

const shareMsg = 'I used EvacFlorida to plan my trip around traffic, you should too! http://evac.localhost';
const fbShareMsg = "https://www.facebook.com/dialog/feed?&app_id=432677524272813&link=http%3A%2F%2Fevac.localhost&display=popup&quote="+shareMsg+"&hashtag=#EvacuationPLanning";
const ttShareMsg = "https://twitter.com/intent/tweet?url=http%3A%2F%2Fevac.localhost&via=EvacFlorida&text="+shareMsg+" #EvacuationPlanning";

export default function Homepage() {
    const classes = useStyles();

    const [isSubmitted, setSubmitted] = useState(false);
    const [shareMsg, handleShareMsg] = useState('');

    const changePlan = function(){
        setSubmitted(false);
    };

    const setShareMsg = (data) => {
        if( data.date ){
            let date = data.date.substr(0, 10);
            let time = data.date.substr(-5);
            handleShareMsg("mailto:?subject=Don't worry, I'll be ok!&body=I'm evacuating for the hurricane. My plan is to leave on " + date + ' at ' + time + '. '+shareMsg);
        }else{
            handleShareMsg('mailto?subject=I\'m not leave for the hurricane&body=I don\'t plan on leaving, how about you? Share your plans anonymously on http://evac.localhost.');
        }
    };

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
                    <div className={isSubmitted ? 'hidden': ''}>
                        <div className={classes.sidebar}>
                            { DepartureForm(function(data){
                                setSubmitted(true);
                                setShareMsg(data);
                            })}
                        </div>
                    </div>
                    <div className={isSubmitted ? '' : 'hidden'}>
                        <h1>Success!</h1>
                        <p>
                            Thank you for contributing to make our service more useful for others!
                        </p>
                        <div>
                            <Button
                                onClick={changePlan}
                                variant="contained"
                                color="secondary">
                                Edit
                            </Button>
                            <PopupState
                                variant="popover">
                                {
                                    popupState => (
                                        <Fragment>
                                            <Button
                                                className={classes.shareBtn}
                                                variant="contained"
                                                color="primary"
                                                {...bindTrigger(popupState)}>
                                                Share
                                            </Button>
                                            <Popover
                                                {...bindPopover(popupState)}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'center',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'center',
                                                }}
                                            >
                                                <div className={classes.shareWrapper}>
                                                    <Button
                                                        href={fbShareMsg}
                                                        target="_blank"
                                                        variant="contained"
                                                        color="secondary">
                                                        Facebook
                                                    </Button>
                                                    <Button
                                                        className={classes.shareBtn}
                                                        target="_blank"
                                                        href={ttShareMsg}
                                                        variant="contained"
                                                        color="secondary">
                                                        Twitter
                                                    </Button>
                                                    <Button
                                                        className={classes.shareBtn}
                                                        href={shareMsg}
                                                        target="_blank"
                                                        variant="contained"
                                                        color="secondary">
                                                        Email
                                                    </Button>
                                                </div>
                                            </Popover>
                                        </Fragment>
                                    )
                                }
                            </PopupState>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
}