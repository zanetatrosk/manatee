import { Card, CardHeader, Typography, SvgIcon } from "@mui/material";


export default function ProficiencyCard({title, data, icon} : {title: string, data: string, icon: any}) {
    return (
        <Card elevation={4}>
        <CardHeader
          title={<Typography variant="h5">{title}</Typography>}
          subheader={
            <Typography variant="body2" sx={{ pt: 1 }}>
              {data}
            </Typography>
          }
          action={
            <SvgIcon sx={{ fontSize: 40 }}>
              {icon}
            </SvgIcon>
          }
        ></CardHeader>
      </Card>
      )
}