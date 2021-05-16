import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import TableContainer from "@material-ui/core/TableContainer";
import {
    openMeterReadingDialog,
    selectMeterReadings,
    selectMeterReadingsError,
    selectIsMeterReadingsLoading
} from "./meterReadingsSlice";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Tooltip from '@material-ui/core/Tooltip';
import {makeStyles} from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from "moment";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import Alert from "@material-ui/lab/Alert";
import {selectMeters, selectIsMetersError, selectIsMetersLoading} from "../meters/metersSlice";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    progress: {
        alignSelf: "center",
    },
});

export default function MeterReadingsTable() {
    // Style
    const classes = useStyles();

    // State
    const dispatch = useDispatch();
    const isLoading = useSelector(state => selectIsMetersLoading(state) || selectIsMeterReadingsLoading(state));
    const error = useSelector(state => selectIsMetersError(state) || selectMeterReadingsError(state));
    const meters = useSelector(selectMeters);
    const meterReadings = useSelector(selectMeterReadings);
    const [meterReadingMenuAnchorElement, setMeterReadingMenuAnchorElement] = React.useState(null);

    // Methods
    const openMeterReadingMenu = (event) => {
        setMeterReadingMenuAnchorElement(event.currentTarget);
    };

    const closeMeterReadingMenu = () => {
        setMeterReadingMenuAnchorElement(null);
    };

    const editMeterReading = (meterReadingId) => (event) => {
        dispatch(openMeterReadingDialog(meterReadingId));
    };

    const deleteMeterReading = (meterReadingId) => (event) => {

    };

    return (
        <div>
            {isLoading && <CircularProgress className={classes.progress}/>}
            {error && <Alert severity="error">{JSON.stringify(error)}</Alert>}
            {!isLoading && <TableContainer>
                <Table size="small" className={classes.table} aria-label="Meter readings">
                    <TableHead>
                        <TableRow>
                            <TableCell>Datum</TableCell>
                            {meters.map((meter) => <TableCell key={meter.id} align="right">{meter.name}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {meterReadings.map((meterReading) => (
                            <TableRow key={meterReading.id}>
                                <TableCell component="th" scope="row">
                                    {meterReading.id}
                                    <Tooltip title={meterReading.timestamp}>
                                        <span>{moment(meterReading.timestamp).format("YYYY-MM-DD")}</span>
                                    </Tooltip>
                                </TableCell>
                                {meters.map((meter) => (
                                    //meterReading.meterReadingValues
                                    <TableCell align="right">{meter.name}</TableCell>
                                ))}
                                {/*<TableCell align="right">{meterReading.energyHigh}</TableCell>*/}
                                {/*<TableCell align="right">{meterReading.energyLow}</TableCell>*/}
                                {/*<TableCell align="right">{meterReading.gas}</TableCell>*/}
                                {/*<TableCell align="right">{meterReading.water}</TableCell>*/}
                                <TableCell align="right" padding="none">
                                    <IconButton
                                        aria-label="more"
                                        aria-controls={'meter-reading-menu-' + meterReading.id}
                                        aria-haspopup="true"
                                        size="small"
                                        onClick={openMeterReadingMenu}>
                                        <MoreVertIcon/>
                                    </IconButton>
                                    <Menu id={'meter-reading-menu-' + meterReading.id} anchorEl={meterReadingMenuAnchorElement} keepMounted
                                          open={Boolean(meterReadingMenuAnchorElement)}
                                          onClose={closeMeterReadingMenu}>
                                        <MenuItem onClick={editMeterReading(meterReading.id.slice(0))}>Edit {meterReading.id.slice(0)}</MenuItem>
                                        <MenuItem onClick={deleteMeterReading(meterReading.id)}>Delete</MenuItem>
                                    </Menu></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>}
        </div>
    );
}
