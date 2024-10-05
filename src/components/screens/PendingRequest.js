import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar';
import SideBar from '../SideBar/SideBar';
import { IconButton, Box, Typography, Button, Pagination, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

// Sample data with additional fields
const items = Array.from({ length: 25 }, (_, index) => ({
  id: index + 1,
  name: `Uday Kumar ${index + 1}`,
  email: `uday${index + 1}@example.com`,
  phone: `123-456-789${index}`,
  userType: index % 2 === 0 ? 'Supplier' : 'Consumer',
  labourType: index % 2 === 0 ? 'Painter' : 'Carpenter'
}));

function PendingRequest() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const paginatedItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <NavBar />
      <div style={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        <IconButton
          onClick={handleToggleSidebar}
          sx={{ display: { xs: 'block', md: 'none' }, position: 'fixed', top: 16, left: 16 }}
        >
          <MenuIcon />
        </IconButton>
        <SideBar isOpen={isSidebarOpen} onClose={handleToggleSidebar} />
        <main
          style={{
            flexGrow: 1,
            padding: 16,
            backgroundColor: '#f5f5f5',
            overflowY: 'auto',
          }}
        >
          <Grid container spacing={2}>
            {paginatedItems.map(item => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Box
                  sx={{
                    p: 3,
                    boxShadow: 3,
                    backgroundColor: 'white',
                    borderRadius: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    height: '100%',
                    boxSizing: 'border-box',
                    gap: 2,
                  }}
                >
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body1">Email: {item.email}</Typography>
                  <Typography variant="body1">Phone: {item.phone}</Typography>
                  <Typography variant="body1">User Type: {item.userType}</Typography>
                  {item.userType === 'Supplier' && (
                    <Typography variant="body1">Labour Type: {item.labourType}</Typography>
                  )}
                  <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <Button variant="contained" color="success">Accept</Button>
                    <Button 
                      variant="outlined"
                      sx={{
                        color: 'white',
                        borderColor: 'red',
                        backgroundColor: 'red',
                        '&:hover': {
                          backgroundColor: 'darkred',
                          borderColor: 'darkred',
                        }
                      }}
                    >
                      Decline
                    </Button>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Pagination
              count={Math.ceil(items.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </main>
      </div>
    </div>
  );
}

export default PendingRequest;
