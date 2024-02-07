import {
  Card,
  CardContent,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";

interface RowData {
  label: string;
  score: number;
  checked: boolean;
}

interface TableProps {
  name: string;
  description: string;
  tableData: RowData[];
}

export default function SkillTable(props: TableProps) {

  const [tableData, setTableData] = React.useState<TableProps>(props);
  return (
    <Box display="inline-flex">
      <Card>
        <CardContent>
          <Typography variant="h5">{tableData.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {tableData.description}
          </Typography>
        </CardContent>
        <Table size="small">
          <TableBody>
          {tableData.tableData.map((i: RowData, idx) => (
            <TableRow key={idx} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={i.checked}
                  onChange={(e) => {
                    const newData = tableData.tableData.map((j) => {
                      if (j.label === i.label) {
                        return { ...j, checked: e.target.checked };
                      }
                      return j;
                    });
                    setTableData({ ...tableData, tableData: newData });
                  }}
                />
              </TableCell>
              <TableCell>{i.label}</TableCell>
              <TableCell align="right">
                <Typography variant="h6">{i.score}</Typography>
              </TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>
      </Card>
    </Box>
  );
}
