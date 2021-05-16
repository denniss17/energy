import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import {
    createMeterReading,
    selectMeterReading,
    selectMeterReadingsError,
    selectIsMeterReadingsSaving
} from "./meterReadingsSlice";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";

const useStyles = makeStyles((theme) => ({}));

export default function MeterReadingForm(props) {
    // State
    const dispatch = useDispatch();
    const isSubmitting = useSelector(selectIsMeterReadingsSaving);
    const error = useSelector(selectMeterReadingsError);
    const [meterReading, setMeterReading] = useState(
        useSelector(selectMeterReading(props.meterReadingId)) ||
        {
            date: moment().format('YYYY-MM-DD')
        });

    // Style
    const classes = useStyles();

    // Methods
    const onSubmit = (event) => {
        event.preventDefault();

        const form = event.target;

        setMeterReading({
            ...meterReading,
            date: form.elements.date.value,
            energyHigh: parseInt(form.elements.energyHigh.value),
            energyLow: parseInt(form.elements.energyLow.value),
            gas: parseInt(form.elements.gas.value),
            water: parseFloat(form.elements.water.value),
        })

        if (meterReading.id) {
            // TODO update existing
        } else {
            dispatch(createMeterReading(meterReading)).then(console.log(isSubmitting, error));
        }
    }

    return (
        <form id="meter-reading-form" className={classes.root} onSubmit={onSubmit}>
            {error && <Alert severity="error">{JSON.stringify(error)}</Alert>}
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField disabled fullWidth id="id" value={meterReading.id} className={classes.textField} label="Id"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="date"
                        name="date"
                        value={meterReading.date}
                        required
                        fullWidth
                        label="Datum"
                        InputLabelProps={{shrink: true}}/>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name="energyHigh"
                        type="number"
                        value={meterReading.energyHigh}
                        required
                        fullWidth
                        label="Stroom normaal"/>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name="energyLow"
                        type="number"
                        value={meterReading.energyLow}
                        required
                        fullWidth
                        label="Stroom dal"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="gas"
                        type="number"
                        value={meterReading.gas}
                        required
                        fullWidth
                        label="Gas"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="water"
                        value={meterReading.water}
                        required
                        fullWidth
                        label="Water"/>
                </Grid>
            </Grid>
        </form>
    );
}
