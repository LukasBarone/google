import React from 'react';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider, 
  Box,
  Typography
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import BarChartIcon from '@mui/icons-material/BarChart';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SettingsIcon from '@mui/icons-material/Settings';

const drawerWidth = 240;

const Sidebar = ({ open }) => {
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Contas', icon: <AccountBoxIcon />, path: '/accounts' },
    { text: 'Relatórios', icon: <BarChartIcon />, path: '/reports' },
    { text: 'Gerador WhatsApp', icon: <WhatsAppIcon />, path: '/reports' },
    { text: 'Assistente IA', icon: <SmartToyIcon />, path: '/ai-assistant' },
    { text: 'Configurações', icon: <SettingsIcon />, path: '/settings' },
  ];

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          top: '64px',
          height: 'calc(100% - 64px)',
        },
      }}
    >
      <Box sx={{ overflow: 'auto', mt: 2 }}>
        <Box sx={{ px: 2, mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            MENU PRINCIPAL
          </Typography>
        </Box>
        <List>
          {menuItems.slice(0, 3).map((item) => (
            <ListItem 
              button 
              key={item.text} 
              component={RouterLink} 
              to={item.path}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(66, 133, 244, 0.08)',
                },
                '&.Mui-selected': {
                  backgroundColor: 'rgba(66, 133, 244, 0.16)',
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ px: 2, mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            FERRAMENTAS
          </Typography>
        </Box>
        <List>
          {menuItems.slice(3).map((item) => (
            <ListItem 
              button 
              key={item.text} 
              component={RouterLink} 
              to={item.path}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(66, 133, 244, 0.08)',
                },
                '&.Mui-selected': {
                  backgroundColor: 'rgba(66, 133, 244, 0.16)',
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
