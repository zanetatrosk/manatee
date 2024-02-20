import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Icon,
  IconButton,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

export default function HomePage() {
  return (
    <Box data-cy="home">
      <Typography variant="h3">Welcome to D&D App</Typography>

      <Card>
        <CardHeader
          title={<Typography variant="h4">Armor</Typography>}
          subheader={
            <Typography variant="body1" sx={{ pt: 1 }}>
              Light Armor, Medium Armor, Shields
            </Typography>
          }
          action={
            <SvgIcon sx={{ fontSize: 59 }}>
              {/*  todo icons */}
            </SvgIcon>
          }
        ></CardHeader>
      </Card>
    </Box>
  );
}
