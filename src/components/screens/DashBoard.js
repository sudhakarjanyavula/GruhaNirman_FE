import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar';
import SideBar from '../SideBar/SideBar';
import { IconButton, Grid, Card, CardContent, Typography, Box, Divider, Pagination } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MainImage from '../../assets/MainImage.svg'; // Importing the MainImage
import Painter from '../../assets/painter.svg';

function DashBoard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [page, setPage] = useState(1);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Sample data for cards with nine entries
  const services = Array.from({ length: 9 }).map((_, index) => ({
    serviceName: `Service ${index + 1}`,
    location: `Location ${index + 1}`,
    personName: `Person ${index + 1}`,
    email: `person${index + 1}@example.com`,
    mobile: `123-456-789${index}`,
    altMobile: `098-765-432${index}`,
    startDate: '2024-09-01',
    endDate: '2024-09-10',
  }));

  // Pagination logic
  const itemsPerPage = 6;
  const count = Math.ceil(services.length / itemsPerPage);
  const paginatedServices = services.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleChangePage = (event, value) => {
    setPage(value);
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
            backgroundColor: '#f5f5f5',
            overflowY: 'auto',
          }}
        >
          <Grid container spacing={3}>
            {paginatedServices.map((service, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ borderRadius: 2, boxShadow: 2, height: '100%' }}>
                  <CardContent>
                    {/* Service request title */}
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: 600, textAlign: 'center' }}
                    >
                      {service.serviceName}
                    </Typography>

                    {/* Main Image */}
                    <Box display="flex" justifyContent="center" mb={2}>
                      <img
                        src={Painter}
                        alt="Service"
                        style={{
                          width: '100%',
                          maxWidth: '120px',
                          height: 'auto',
                          objectFit: 'contain',
                          borderRadius: '8px',
                        }}
                      />
                    </Box>

                    {/* Content container */}
                    <Box display="flex" flexDirection="column" gap={1}>
                      {/* Details */}
                      <Box>
                        <Typography variant="body2" sx={{ fontSize: 14, mb: 0.5 }}>
                          <strong>Location:</strong> {service.location}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: 14, mb: 0.5 }}>
                          <strong>Person:</strong> {service.personName}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: 14, mb: 0.5 }}>
                          <strong>Email:</strong> {service.email}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: 14, mb: 0.5 }}>
                          <strong>Mobile:</strong> {service.mobile}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: 14 }}>
                          <strong>Alt Mobile:</strong> {service.altMobile}
                        </Typography>
                      </Box>

                      {/* Divider */}
                      <Divider sx={{ my: 1 }} />

                      {/* Dates */}
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="body2" sx={{ fontSize: 14 }}>
                          <strong>Service Start:</strong> {service.startDate}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: 14 }}>
                          <strong>Service End:</strong> {service.endDate}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          <Box display="flex" justifyContent="center" mt={3}>
            <Pagination count={count} page={page} onChange={handleChangePage} color="primary" />
          </Box>
        </main>
      </div>
    </div>
  );
}

export default DashBoard;
