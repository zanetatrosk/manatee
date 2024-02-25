import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import { PaginationParams } from "api/raceApiSlice";
import FilteredTable, { useSpells } from "./filteredTable";
import ModalAddItems from "./modal";


export default function ButtonAddItems() {
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
    setSelected([]);
  };

  const saveSelected = () => {
    console.log(selected);
    //logic for saving todo
    closeDialog();
  };

  return (
    <Box>
      <Button
        variant="outlined"
        onClick={() => {
          setOpen(true);
        }}
      >
        Add Items
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
