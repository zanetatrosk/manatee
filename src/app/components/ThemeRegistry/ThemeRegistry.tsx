'use client'
import { ThemeProvider,  createTheme} from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

const darkTheme = createTheme({
    palette: {
      //this will be variable in the store which will change after clicking on button (now it is hardcoded)
      //todo
      mode: 'light',
    },
});

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode
}) {
  return (
   
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>

  )
}