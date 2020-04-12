import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import * as React from "react";
import MeterReadingForm from "./MeterReadingForm";

export default function MeterReadingDialog(props) {
    return (
        <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Meterstand toevoegen</DialogTitle>
            <DialogContent>
                <MeterReadingForm/>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>
                    Annuleren
                </Button>
                <Button variant="contained" onClick={props.onClose} color="primary">
                    Opslaan
                </Button>
            </DialogActions>
        </Dialog>
    );
}