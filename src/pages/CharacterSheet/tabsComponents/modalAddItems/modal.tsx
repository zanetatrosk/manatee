import { Button, Dialog, DialogTitle, TextField, DialogContent, DialogActions } from "@mui/material";
import React from "react";
import FilteredTable, { useSpells } from "./filteredTable";
import { PaginationParams, useGetSpellsQuery } from "api/raceApiSlice";



export default function ModalAddItems({openDialog, closeDialog}: {openDialog: boolean, closeDialog: () => void}) {
  const [query, setQuery] = React.useState("");

  const [pagination, setPagination] = React.useState<PaginationParams>({page: 0, size: 5, query: ""});
  
  const [selected, setSelected] = React.useState<string[]>([]);
  const spellsInfo = useGetSpellsQuery(pagination).data; 
  const rows = useSpells(pagination.page, pagination.size, query);

  const handleClose = () => {
    closeDialog();
  };

  return (
    <React.Fragment>
      <Dialog fullWidth open={openDialog} maxWidth="lg">
        <DialogTitle>
          Add a spell
          <TextField
            variant="outlined"
            label="Search"
            fullWidth
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{ mt: 3 }}
            size="small"
          />
        </DialogTitle>
        <DialogContent>
          <FilteredTable rows={rows} totalElements={spellsInfo?.totalElements || 0} setPagination={(pag: PaginationParams) => setPagination({...pag, query: query})} setSelectedIds={(ids: string[]) => setSelected(ids)}/>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Add Selected {selected.length}
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}