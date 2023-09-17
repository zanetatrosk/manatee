"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { SvgIcon } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
const pages = ["Characters", "Content"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <SvgIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              fontSize: 48,
              p: 0,
            }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M27.1266 6.37972C25.954 6.39 24.765 6.68527 23.6273 7.30545C26.2521 7.1148 28.5595 7.9191 29.2032 9.8508C19.5387 8.5869 9.68445 18.3513 26.8242 28.2398C31.4746 30.9228 28.2777 37.8244 19.0009 33.872C6.63705 28.6042 7.53525 18.8145 11.9883 13.6921C12.5374 14.6167 12.9946 15.6567 13.4085 16.7484C14.8385 13.1038 17.6376 11.6019 20.4281 10.0875C16.5133 8.244 12.7774 8.97877 9.11017 10.7179C9.88732 11.1487 10.543 11.7307 11.1093 12.4219C2.59245 17.5156 5.27632 33.452 16.4647 39.9117C30.7037 48.1325 47.5737 29.9938 32.0765 24.082C20.7187 19.7493 23.6986 13.5892 29.2243 14.6203L29.4211 17.8172L40.0219 20.7703L41.5899 16.2211C39.4194 15.2826 37.6744 14.2278 36.258 12.9328C36.3531 10.8145 35.4585 8.69497 33.715 6.5766C33.7717 7.61107 33.7602 8.64525 33.5956 9.6798C31.9298 7.5735 29.5656 6.35827 27.1268 6.3798L27.1266 6.37972ZM30.3844 11.2828C32.1094 11.8279 33.7385 12.8477 35.0344 14.5898C32.5046 15.7763 29.8501 14.1908 30.3844 11.2828V11.2828Z"
                fill="white"
              />
            </svg>
          </SvgIcon>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 3,
              ml: 1,
              display: { xs: "none", md: "flex" },
              fontWeight: 500,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            D&D APP
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            D&D APP
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ m: 1, mx: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} color="inherit">
                <PersonIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
