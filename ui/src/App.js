import React, {useEffect} from 'react';
import './App.css';
import {CssBaseline} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import AddIcon from '@material-ui/icons/Add';
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from '@material-ui/icons/Menu';
import {makeStyles} from "@material-ui/core/styles";
import MeterReadingsTable from "./features/meterReadings/MeterReadingsTable";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import Fab from "@material-ui/core/Fab";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import {
    closeMeterReadingDialog,
    getAllMeterReadings,
    openMeterReadingDialog, selectMeterReadingDialogOpen
} from "./features/meterReadings/meterReadingsSlice";
import MeterReadingDialog from "./features/meterReadings/MeterReadingDialog";
import CardTitle from "./common/CardTitle";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },

    // Appbar
    menuButton: {
        marginRight: theme.spacing(2),
    },
    menuTitle: {
        flexGrow: 1,
    },

    // Main common
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    fixedHeight: {
        height: 240,
    },
}));

function App() {
    // State
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const meterReadingDialogOpen = useSelector(selectMeterReadingDialogOpen);

    // Styling
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    // Methods
    const logState = () => {
        console.log(state);
    };

    const openNewMeterReadingForm = () => {
        dispatch(openMeterReadingDialog());
    };

    const closeMeterReadingForm = () => {
        dispatch(closeMeterReadingDialog());
    };

    // After first render, apply an effect to load the data
    // It has no dependencies, so it only runs on first render
    useEffect(() => {
        dispatch(getAllMeterReadings());
    }, []);

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>

                    <Typography variant="h6" className={classes.menuTitle}>
                        Energy {meterReadingDialogOpen ? 'open' : 'closed'}
                    </Typography>

                    <Button color="inherit" aria-label="debug" onClick={logState}>
                        Log state
                    </Button>
                </Toolbar>
            </AppBar>

            <Grid container spacing={3} className={classes.container}>
                <Grid item xs={12} md={8} lg={9}>
                    <Paper className={fixedHeightPaper}>
                        <CardTitle>Chart</CardTitle>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <Paper className={fixedHeightPaper}>
                        <CardTitle>Ding</CardTitle>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <CardTitle>Meterstanden</CardTitle>
                        <MeterReadingsTable/>
                        <MeterReadingDialog open={meterReadingDialogOpen} onClose={closeMeterReadingForm}/>
                    </Paper>
                </Grid>
            </Grid>
            <Fab color="primary" className={classes.fab} onClick={openNewMeterReadingForm}><AddIcon/></Fab>
        </div>
    );
}

export default App;
