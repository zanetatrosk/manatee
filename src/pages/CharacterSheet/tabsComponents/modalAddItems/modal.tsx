import { Button, Dialog, DialogTitle, TextField, DialogContent, DialogActions } from "@mui/material";
import React from "react";
import FilteredTable, { useSpells } from "./filteredTable";
import { PaginationParams, useGetSpellsQuery } from "api/raceApiSlice";



export default function ModalAddItems(
  {openDialog, closeDialog, children, saveSelected}
  : {openDialog: boolean, closeDialog: () => void, children?: React.ReactNode, saveSelected: () => void}) {

  

  const handleClose = () => {
    closeDialog();
  };

  return (
    <React.Fragment>
      <Dialog fullWidth open={openDialog} maxWidth="lg">
        <DialogTitle>
          Add a spell
          
        </DialogTitle>
        <DialogContent>
        
          {children}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={saveSelected}>
            Add Selected
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}