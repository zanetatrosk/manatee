import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CHARACTERS } from 'constants/characterDefinition';

export default function ConfirmationDialog({ title, description, openDialog, confirmAction, closeDialog }: { title: string, description: string, openDialog: boolean, confirmAction: () => void, closeDialog: () => void }) {

  const closeDialogPrevent = (e: any) => {
    e.stopPropagation();
    closeDialog();
  }

  const handleCloseConfirm = (e: any) => {
    e.stopPropagation();
    confirmAction();
  }

  return (
    <React.Fragment>
      <Dialog
        open={openDialog}
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialogPrevent}>{CHARACTERS.DELETE_CHARACTER.CANCEL}</Button>
          <Button onClick={handleCloseConfirm} >
            {CHARACTERS.DELETE_CHARACTER.DELETE}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
