import {
  Card,
  CardContent,
  Checkbox,
  Table,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";

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
  return (
    <Box display="inline-flex">
      <Card>
        <CardContent>
          <Typography variant="h5">{props.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>
        <Table size="small">
          {props.tableData.map((i: RowData) => (
            <TableRow >
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={i.checked}
                  inputProps={{
                    "aria-label": "select all desserts",
                  }}
                />
              </TableCell>
              <TableCell sx={{ pr: 3 }}>{i.label}</TableCell>
              <TableCell sx={{ px: 4 }}>
                <Typography variant="h6">{i.score}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </Card>
    </Box>
  );
}
