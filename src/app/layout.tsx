import "./globals.css";
import ThemeRegistry from "./components/ThemeRegistry/ThemeRegistry";
import { Container } from "@mui/material";
import ResponsiveAppBar from "./components/navbar";



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <ResponsiveAppBar />
          <Container maxWidth="xl">{children} </Container>
        </ThemeRegistry>
      </body>
    </html>
  );
}
