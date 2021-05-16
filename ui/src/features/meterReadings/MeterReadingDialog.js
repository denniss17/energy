import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import React from "react";
import MeterReadingForm from "./MeterReadingForm";
import {useSelector} from "react-redux";
import {selectIsMeterReadingsSaving} from "./meterReadingsSlice";

export default function MeterReadingDialog(props) {
    const isSubmitting = useSelector(selectIsMeterReadingsSaving);

    return (
        <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Meterstand toevoegen</DialogTitle>
            <DialogContent>
                <MeterReadingForm meterReadingId={props.meterReadingId} onFinish={props.onClose}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>
                    Annuleren
                </Button>
                <Button form="meter-reading-form" type="submit" variant="contained" color="primary"
                        disabled={isSubmitting}>
                    Opslaan
                </Button>
            </DialogActions>
        </Dialog>
    );
}