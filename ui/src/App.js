import React from 'react';
import './App.css';
import {CssBaseline} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from '@material-ui/icons/Menu';
import {makeStyles} from "@material-ui/core/styles";
import MeterReadingsTable from "./features/meterReadings/MeterReadingsTable";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

function App() {
    const classes = useStyles();
    const state = useSelector(state => state);

    const logState = () => {
        console.log(state);
    };

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>

                    <Typography variant="h6" className={classes.title}>
                        Energy
                    </Typography>

                    <Button color="inherit" aria-label="debug" onClick={logState}>
                        Log state
                    </Button>
                </Toolbar>
            </AppBar>

            <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                    <MeterReadingsTable/>
                </Grid>
                <Grid item xs={12} md={6}>
                    Graphs
                </Grid>
            </Grid>
        </div>
    );
}

export default App;
