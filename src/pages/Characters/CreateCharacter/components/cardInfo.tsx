import * as React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
export default function CardInfo() {
  return (
    <Box display="flex" flexGrow={1}>
      <Card
        sx={{
          display: "flex",
          m: 2,
          p: 1,
          justifyContent: "flex-start",
          flexDirection: "column",
        }}
      >
        <CardContent sx={{ display: "flex", pb: 0 }}>
          <Typography gutterBottom variant="h5" component="div" align="left">
            High Elf
          </Typography>
        </CardContent>
        <CardContent
          sx={{
            display: "flex",
            py: 0,
          }}
        >
          <Typography
            gutterBottom
            variant="body1"
            component="div"
            align="left"
            sx={{ pr: 1 }}
          >
            Speed:
          </Typography>
          <Typography variant="body1" color="text.secondary" align="justify">
            20 km/h
          </Typography>
        </CardContent>
        <CardContent
          sx={{
            display: "flex",
          }}
        >
          <Typography variant="body1" color="text.secondary" align="justify">
            As a high elf, you have a keen mind and a mastery of at least the
            basics of magic. In many of the worlds of D&D, there are two kinds
            of high elves. One type (which includes the gray elves and valley
            elves of Greyhawk, the Silvanesti of Dragonlance, and the sun elves
            of the Forgotten Realms) is haughty and reclusive, believing
            themselves to be superior to non-elves and even other elves. The
            other type (including the high elves of Greyhawk, the Qualinesti of
            Dragonlance, and the moon elves of the Forgotten Realms) are more
            common and more friendly, and often encountered among humans and
            other races.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
