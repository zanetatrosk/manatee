import { Box, Button, Modal, Typography } from "@mui/material";
import ModalAddItems from "./CharacterSheet/tabsComponents/modalAddItems/modal";
import React from "react";
import { PaginationParams } from "api/raceApiSlice";
import FilteredTable, {
  useSpells,
} from "./CharacterSheet/tabsComponents/modalAddItems/filteredTable";

export default function HomePage() {
  const [open, setOpen] = React.useState(false);
  const [pagination, setPagination] = React.useState<PaginationParams>({
    page: 0,
    size: 5,
    query: "",
  });

  const [selected, setSelected] = React.useState<string[]>([]);
  const spells = useSpells(pagination.page, pagination.size, pagination.query);

  const closeDialog = () => {
    setOpen(false);
    setPagination({ page: 0, size: 5, query: "" });
  };

  const saveSelected = () => {
    console.log(selected);
    //logic for saving todo
    closeDialog();
  };

  return (
    <Box>
      <Typography variant="h4">Welcome to D&D App</Typography>
      <Button
        variant="outlined"
        onClick={() => {
          setOpen(true);
        }}
      >
        Future Open dialog
      </Button>

      <ModalAddItems
        openDialog={open}
        closeDialog={() => closeDialog()}
        saveSelected={saveSelected}
      >
        <FilteredTable
          rows={spells.data}
          totalElements={spells.totalElements}
          setPagination={(pag: PaginationParams) => setPagination({ ...pag })}
          setSelectedIds={(ids: string[]) => setSelected(ids)}
          selectedIds={selected}
        />
      </ModalAddItems>
    </Box>
  );
}
