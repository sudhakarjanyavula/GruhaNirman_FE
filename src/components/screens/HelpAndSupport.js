// HelpAndSupport.js
import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar';
import SideBar from '../SideBar/SideBar';
import { IconButton, Box, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function HelpAndSupport() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      {/* NavBar at the top */}
      <NavBar />

      <div style={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        {/* Toggle Button for mobile view */}
        <IconButton
          onClick={handleToggleSidebar}
          sx={{ display: { xs: 'block', md: 'none' }, position: 'fixed', top: 16, left: 16 }}
        >
          <MenuIcon />
        </IconButton>

        {/* SideBar with open state controlled by parent */}
        <SideBar isOpen={isSidebarOpen} onClose={handleToggleSidebar} />

        {/* Main content area */}
        <main
          style={{
            flexGrow: 1,
            padding: 16,
            backgroundColor: '#f5f5f5', // Matching Dashboard's background color
            overflowY: 'auto',
          }}
        >
          <Box sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
              Help and Support
            </Typography>
            <Typography variant="body1">
              This is the Help and Support page content.
            </Typography>
          </Box>
        </main>
      </div>
    </div>
  );
}

export default HelpAndSupport;
