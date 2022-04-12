import React from 'react'
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import Toolbar from '@mui/material/Toolbar';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';


export default function TopNav({darkmode,handleDrawerOpen,drawerWidth,open}) {

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));


  return (
    <AppBar position="fixed" open={open} >
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{
          marginRight: '36px',
          ...(open && { display: 'none' }),
        }}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" noWrap component="div">
        <b>STOCK MANAGER</b>
      </Typography>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={()=>{darkmode.setdarkmode(darkmode.darkmode =="dark" ? "light" : "dark")}}
        edge="start"
        sx={{
          marginLeft: 'auto',
        }}
      >
        { darkmode.darkmode =="dark" ? <LightModeIcon/> : <NightlightRoundIcon/> }
      </IconButton>
      
    </Toolbar>
  </AppBar>
  )
}
