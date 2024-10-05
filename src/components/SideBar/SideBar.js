import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Box, IconButton } from '@mui/material';
import { Home, Work, Logout, Close, HelpOutline, PersonAdd } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import MainImage from '../../assets/MainImage.svg';

function SideBar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    if (location.pathname !== path) {
      onClose(); 
      navigate(path);
    }
  };

  const handleLogout = () => {
    onClose();
    navigate('/login');
  };

  const menuItems = [
    { text: 'Home', icon: <Home />, path: '/dashboard' },
    { text: 'Create Provider', icon: <PersonAdd />, path: '/createprovider' },
    { text: 'Pending Request', icon: <Work />, path: '/pendingRequest' },
    { text: 'Help & Support', icon: <HelpOutline />, path: '/helpandsupport' },
  ];

  return (
    <Drawer
      variant={isOpen ? 'temporary' : 'permanent'}
      open={isOpen}
      onClose={onClose}
      sx={{
        width: { md: 240 },
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#FFFFFF',
          color: '#000000',
        },
        display: { xs: isOpen ? 'block' : 'none', md: 'block' },
      }}
      ModalProps={{
        keepMounted: true, // Better performance on mobile
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 2,
          position: 'relative',
        }}
      >
        {/* Close Button */}
        {isOpen && (
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              display: { xs: 'block', md: 'none' },
            }}
          >
            <Close />
          </IconButton>
        )}

        <img
          src={MainImage}
          alt="Main"
          style={{
            width: '25%',
            height: 'auto',
            maxWidth: '200px',
          }}
        />
        <Typography
          variant="h6"
          sx={{ marginTop: 1, textAlign: 'center', color: '#333165', fontWeight: 'bold' }}
        >
          Gruhanirman
        </Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.path}
            onClick={() => handleNavigation(item.path)}
            sx={{
              backgroundColor: location.pathname === item.path ? '#333165' : 'transparent',
              color: location.pathname === item.path ? '#FFFFFF' : '#333165',
              '&:hover': {
                backgroundColor: location.pathname === item.path ? '#333165' : 'rgba(0, 0, 0, 0.08)',
              },
            }}
          >
            <ListItemIcon sx={{ color: location.pathname === item.path ? '#FFFFFF' : '#333165' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              sx={{
                color: location.pathname === item.path ? '#FFFFFF' : '#333165',
                fontWeight: location.pathname === item.path ? 'bold' : 'normal',
              }}
              primary={item.text}
            />
          </ListItem>
        ))}
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <Logout sx={{ color: '#333165' }} />
          </ListItemIcon>
          <ListItemText sx={{ color: '#333165', fontWeight: 'bold' }} primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
}
export default SideBar;