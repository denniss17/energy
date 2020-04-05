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
            <Table className={classes.table} aria-label="simple table">
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
                        <TableRow key={meterReading.name}>
                            <TableCell component="th" scope="row">
                                {meterReading.name}
                            </TableCell>
                            <TableCell align="right">{meterReading.calories}</TableCell>
                            <TableCell align="right">{meterReading.fat}</TableCell>
                            <TableCell align="right">{meterReading.carbs}</TableCell>
                            <TableCell align="right">{meterReading.protein}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
