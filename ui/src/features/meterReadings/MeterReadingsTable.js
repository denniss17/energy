import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import TableContainer from "@material-ui/core/TableContainer";
import {getAll, selectMeterReadings} from "./meterReadingsSlice";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function MeterReadingsTable() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const meterReadings = useSelector(selectMeterReadings);

    // After first render, apply an effect to load the data
    // It has no dependencies, so it only runs on first render
    useEffect(() => {dispatch(getAll());}, []);

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="Meter readingds">
                <TableHead>
                    <TableRow>
                        <TableCell>Datum</TableCell>
                        <TableCell align="right">Stroom normaal</TableCell>
                        <TableCell align="right">Stroom dal</TableCell>
                        <TableCell align="right">Gas</TableCell>
                        <TableCell align="right">Water</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {meterReadings.map((meterReading) => (
                        <TableRow key={meterReading.id}>
                            <TableCell component="th" scope="row">
                                {meterReading.timestamp}
                            </TableCell>
                            <TableCell align="right">{meterReading.energyHigh}</TableCell>
                            <TableCell align="right">{meterReading.energyLow}</TableCell>
                            <TableCell align="right">{meterReading.gas}</TableCell>
                            <TableCell align="right">{meterReading.water}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
