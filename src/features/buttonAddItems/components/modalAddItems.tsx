import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { CHARACTER_SHEET } from "constants/characterDefinition";
import React from "react";

export default function ModalAddItems({
  openDialog,
  closeDialog,
  children,
  saveSelected,
  titleDialog,
}: {
  openDialog: boolean;
  closeDialog: () => void;
  children?: React.ReactNode;
  saveSelected: () => void;
  titleDialog: string;
}) {
  const handleClose = () => {
    closeDialog();
  };

  return (
    <React.Fragment>
      <Dialog fullWidth open={openDialog} maxWidth="lg">
        <DialogTitle>{titleDialog}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={saveSelected}>
            {CHARACTER_SHEET.MODAL_ADD.ADD}
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            {CHARACTER_SHEET.MODAL_ADD.CLOSE}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
