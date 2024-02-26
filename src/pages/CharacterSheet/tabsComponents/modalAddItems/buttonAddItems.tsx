import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import { PaginationParams } from "api/raceApiSlice";
import FilteredTable, { useSpells } from "./filteredTable";
import ModalAddItems from "./modal";


export default function ButtonAddItems({usePaginationHook, defaults, sendToBEHook}: {usePaginationHook: any, defaults: string[], sendToBEHook: any}) {
  const [open, setOpen] = React.useState(false);
  const [pagination, setPagination] = React.useState<PaginationParams>({
    page: 0,
    size: 5,
    query: "",
  });

  const [selected, setSelected] = React.useState<string[]>(defaults);
  const items = usePaginationHook(pagination.page, pagination.size, pagination.query);
  const closeDialog = () => {
    setOpen(false);
    setPagination({ page: 0, size: 5, query: "" });
  };

  const saveSelected = () => {
    console.log(selected);
    sendToBEHook(selected);
    closeDialog();
  };

  return (
    <Box>
      <Button
        variant="outlined"
        onClick={() => {
          setOpen(true);
        }}
        size="small"
      >
        Add Spells
      </Button>

      <ModalAddItems
        openDialog={open}
        closeDialog={() => closeDialog()}
        saveSelected={saveSelected}
      >
        <FilteredTable
          rows={items.data}
          totalElements={items.totalElements}
          setPagination={(pag: PaginationParams) => setPagination({ ...pag })}
          setSelectedIds={(ids: string[]) => setSelected(ids)}
          selectedIds={selected}
        />
      </ModalAddItems>
    </Box>
  );
}
