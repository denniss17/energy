import React from 'react';
import {useDispatch} from 'react-redux';
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import moment from "moment";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({}));

export default function MeterReadingForm() {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <form className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField disabled fullWidth id="id" className={classes.textField} label="Id"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField required fullWidth id="date" label="Datum" type="date"
                               defaultValue={moment().format("YYYY-MM-DD")} className={classes.textField}
                               InputLabelProps={{shrink: true}}/>
                </Grid>
                <Grid item xs={6}>
                    <TextField required fullWidth id="energyHigh" type="number" className={classes.textField}
                               label="Stroom normaal"/>
                </Grid>
                <Grid item xs={6}>
                    <TextField required fullWidth id="energeyLow" type="number" className={classes.textField}
                               label="Stroom dal"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField required fullWidth id="gas" type="number"
                               className={classes.textField}
                               label="Gas"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField required fullWidth id="water" className={classes.textField}
                               label="Water"/>
                </Grid>
            </Grid>
        </form>
    );
}
