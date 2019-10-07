import React, {Fragment, useState} from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {Line} from "react-chartjs-2";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Stat from "../components/stat";
import DepartureForm from "../components/departureForm";
import SampleData from '../sample-data/chart';
import Button from "@material-ui/core/Button";
import PopupState, {bindTrigger, bindPopover} from 'material-ui-popup-state';
import Popover from "@material-ui/core/Popover";
import {ShareLinks} from "../components/shareLinks";
import EvacChecklist from "../components/evacChecklist";
import {Typography} from "@material-ui/core";

const border = '2px solid #f3f3f3';

const useStyles = makeStyles(theme => ({
    header: {
        marginBottom: '.5em',
        borderBottom: border,
        paddingBottom: '.5em',
        marginTop: 0,
    },
    chart: {
        borderBottom: border,
        paddingBottom: '2em',
    },
    mainCol: {
        marginRight: '1em',
    },
    stats: {
        marginBottom: '.5em',
        paddingBottom: '.5em',
        borderBottom: border,
    },
    stat: {
        marginBottom: '1em',
    },
    sidebar: {
        padding: '.5em 2em',
        marginTop: '2em',
        background: '#f3f3f3',
        border: '1px solid #d2d2d2',
        marginBottom: '2em',
    },
    shareWrapper: {
        padding: '1em',
    },
    shareBtn: {
        marginLeft: '.5em'
    },
    shareImg: {
        width: '30px',
        marginRight: '.2em',
    }
}));

Chart.defaults.global.elements.point.borderColor = 'transparent';
Chart.defaults.global.elements.point.radius = 0;

export default function Homepage() {
    const classes = useStyles();

    const [isSubmitted, setSubmitted] = useState(false);
    const [shareMsg, handleShareMsg] = useState('');

    const changePlan = function () {
        setSubmitted(false);
    };

    return (
        <Container>
            <Grid
                className="noPrint"
                container>
                <Grid item xs={12} md={8} lg={9}>
                    <div className={classes.mainCol}>
                        <h1 className={classes.header}>Predicted Evacuation Traffic from Palm Beach County</h1>
                        <div className={classes.stats}>
                            <Grid container>
                                <Grid item xs={6} sm={3} md={3} className={classes.stat}>
                                    {Stat('Palm Beach Pop.', '1.47 million', '')}
                                </Grid>
                                <Grid item xs={6} sm={3} md={3} className={classes.stat}>
                                    {Stat('Respondents', '109,538', '7.45')}
                                </Grid>
                                <Grid item xs={6} sm={3} md={3} className={classes.stat}>
                                    {Stat('Leaving', '86,000', '78.51')}
                                </Grid>
                                <Grid item xs={6} sm={3} md={3} className={classes.stat}>
                                    {Stat('Staying', '23,538', '21.49')}
                                </Grid>
                            </Grid>
                        </div>
                        <div className={classes.chart}>
                            <Line
                                data={SampleData.data}
                                options={SampleData.options}></Line>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <div className={isSubmitted ? 'hidden' : ''}>
                        <div className={classes.sidebar}>
                            {DepartureForm(function (data) {
                                setSubmitted(true);
                                ShareLinks.setShareMsg(data, handleShareMsg);
                            })}
                        </div>
                    </div>
                    <div className={isSubmitted ? '' : 'hidden'}>
                        <Typography variant="h1">Success!</Typography>
                        <Typography>
                            Thank you for contributing to make our service more useful for others!
                        </Typography>
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
                                                        href={ShareLinks.fbShareMsg}
                                                        target="_blank"
                                                        variant="contained"
                                                        color="secondary">
                                                        <img className={classes.shareImg}
                                                             src="/img/icons/fb-icon.png"
                                                             alt="Email Icon"/> Facebook
                                                    </Button>
                                                    <Button
                                                        className={classes.shareBtn}
                                                        target="_blank"
                                                        href={ShareLinks.ttShareMsg}
                                                        variant="contained"
                                                        color="secondary">
                                                        <img className={classes.shareImg}
                                                             src="/img/icons/twitter-icon.png"
                                                             alt="Email Icon"/> Twitter
                                                    </Button>
                                                    <Button
                                                        className={classes.shareBtn}
                                                        href={shareMsg}
                                                        target="_blank"
                                                        variant="contained"
                                                        color="secondary">
                                                        <img className={classes.shareImg}
                                                             src="/img/icons/email-icon.png"
                                                             alt="Email Icon"/> Email
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
            <EvacChecklist/>
        </Container>
    );
}