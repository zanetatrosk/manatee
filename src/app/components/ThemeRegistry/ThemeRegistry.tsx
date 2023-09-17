'use client'
import { ThemeProvider,  createTheme} from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { Roboto } from "next/font/google";


const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const lightTheme = createTheme({
    palette: {
      //this will be variable in the store which will change after clicking on button (now it is hardcoded)
      //todo
      mode: 'light',
    },
    typography: {
      fontFamily: roboto.style.fontFamily
    },
    
    
});

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode
}) {
  return (
   
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>

  )
}