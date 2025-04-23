import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Avatar, 
  Box, 
  Menu, 
  MenuItem, 
  Tooltip 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';

const Header = ({ toggleSidebar }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationMenu = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="abrir menu"
          onClick={toggleSidebar}
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Dashboard Google Ads
        </Typography>
        
        {/* Notificações */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Notificações">
            <IconButton 
              color="inherit" 
              onClick={handleNotificationMenu}
              aria-controls="notification-menu"
              aria-haspopup="true"
            >
              <NotificationsIcon />
            </IconButton>
          </Tooltip>
          <Menu
            id="notification-menu"
            anchorEl={notificationAnchorEl}
            keepMounted
            open={Boolean(notificationAnchorEl)}
            onClose={handleNotificationClose}
          >
            <MenuItem onClick={handleNotificationClose}>
              ROAS abaixo da meta para Conta A
            </MenuItem>
            <MenuItem onClick={handleNotificationClose}>
              CPA acima da média para Conta B
            </MenuItem>
            <MenuItem onClick={handleNotificationClose}>
              Relatório semanal pronto para envio
            </MenuItem>
          </Menu>
          
          {/* Perfil do usuário */}
          <Tooltip title="Configurações da conta">
            <IconButton
              color="inherit"
              onClick={handleMenu}
              aria-controls="menu-appbar"
              aria-haspopup="true"
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                <AccountCircleIcon />
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Meu Perfil</MenuItem>
            <MenuItem onClick={handleClose}>Configurações</MenuItem>
            <MenuItem onClick={handleClose}>Sair</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
