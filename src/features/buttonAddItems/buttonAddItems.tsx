import { Box, Button } from "@mui/material";
import { PaginationParams } from "api/generalContentApiSlice";
import React from "react";
import FilteredTable from "./components/filteredTable";
import ModalAddItems from "./components/modalAddItems";

export default function ButtonAddItems({
  usePaginationHook,
  defaults,
  sendToBEHook,
  singleChoice,
  headers,
  buttonText,
}: {
  usePaginationHook: any;
  defaults: string[];
  sendToBEHook: any;
  singleChoice?: boolean;
  headers: string[];
  buttonText: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [pagination, setPagination] = React.useState<PaginationParams>({
    page: 0,
    size: 5,
    query: "",
  });

  const [selected, setSelected] = React.useState<string[]>(defaults);
  const items = usePaginationHook(
    pagination.page,
    pagination.size,
    pagination.query,
  );
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
        {buttonText}
      </Button>

      <ModalAddItems
        openDialog={open}
        closeDialog={() => closeDialog()}
        saveSelected={saveSelected}
        titleDialog={buttonText}
      >
        <FilteredTable
          rows={items.data}
          totalElements={items.totalElements}
          setPagination={(pag: PaginationParams) => setPagination({ ...pag })}
          setSelectedIds={(ids: string[]) => {
            setSelected(ids);
          }}
          selectedIds={selected}
          singleChoice={singleChoice}
          headers={headers}
        />
      </ModalAddItems>
    </Box>
  );
}
