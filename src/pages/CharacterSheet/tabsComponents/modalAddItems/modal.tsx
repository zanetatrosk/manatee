import { Button, Dialog, DialogTitle, TextField, DialogContent, DialogActions } from "@mui/material";
import React from "react";
import FilteredTable, { useSpells } from "./filteredTable";
import { PaginationParams, useGetSpellsQuery } from "api/raceApiSlice";



export default function ModalAddItems() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const [pagination, setPagination] = React.useState<PaginationParams>({page: 0, size: 5, query: ""});
  
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const spellsInfo = useGetSpellsQuery(pagination).data; 
  const rows = useSpells(pagination.page, pagination.size, query);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <Dialog fullWidth open={open} maxWidth="lg">
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
          <FilteredTable rows={rows} totalElements={spellsInfo?.totalElements || 0} setPagination={(pag: PaginationParams) => setPagination({...pag, query: query})}/>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
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