import React, {Component} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
    stat: {
        display: 'inline-block',
        margin: '0 2em 3em 0'
    },
    label: {
        color: '#444',
    },
    value: {
        fontWeight: 'bold',
        fontSize: '.8em'
    },
    percent: {
        fontWeight: 'bold',
        fontSize: '.8em'
    }
}));

export default function Stat(label, value, percent) {
    const classes = useStyles();
    return (
        <div className={classes.stat}>
            <div className={classes.label}>{ label }</div>
            <span className={classes.value}>{ value }</span>
            {percent > 0 && <span className={classes.percent}>, { percent }%</span>}
        </div>
    );
}