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
import { table } from "console";
import React from "react";

export interface RowSkillData {
  id: string;
  label: string;
  score: number;
  checked: boolean;
}

interface TableProps {
  name: string;
  description?: string;
  tableData: RowSkillData[];
  disabled?: boolean;
  sendData?: any;
}

export default function SkillTable({ name, description, tableData, disabled, sendData }: {
  name: string;
  description?: string;
  tableData: RowSkillData[];
  disabled?: boolean;
  sendData?: any;
}) {

  const [data, setTableData] = React.useState<RowSkillData[]>(tableData);
  if( tableData !== data ) setTableData(tableData);
  return (
    <Box display="flex">
      <Card sx={{ width: "100%"}}>
        <CardContent>
          <Typography variant="h5">{name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <Table size="small">
          <TableBody>
          {data.map((i: RowSkillData, idx) => (
            <TableRow key={idx} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={i.checked}
                  disabled={disabled}
                  onChange={(e) => {
                    const newData = tableData.map((j) => {
                      if (j.label === i.label) {
                        return { ...j, checked: e.target.checked };
                      }
                      return j;
                    });
                    if( sendData ) sendData(newData);
                    setTableData(newData);
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
