import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar';
import SideBar from '../SideBar/SideBar';
import { IconButton, Box, Typography, TextField, MenuItem, Button, Grid,} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function CreateProvider() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phoneNumber: '',
    supplierShopName: '',
    labourType: '',
  });

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
    setFormData((prevData) => ({
      ...prevData,
      supplierShopName: '',
      labourType: '',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form Data:', formData);
  };

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
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Create Provider
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                    sx={{width: {xs: '100%', sm:'100%', md: '50%'}, mt: 3}}
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    sx={{width: {xs: '100%', sm:'100%', md: '50%'}, mt: 3}}
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    sx={{width: {xs: '100%', sm:'100%', md: '50%'}, mt: 3}}
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    sx={{width: {xs: '100%', sm:'100%', md: '50%'}, mt: 3}}
                    label="Phone Number"
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    select
                    sx={{width: {xs: '100%', sm:'100%', md: '50%'}, mt: 3}}
                    label="User Type"
                    value={userType}
                    onChange={handleUserTypeChange}
                    required
                  >
                    <MenuItem value="Supplier">Supplier</MenuItem>
                    <MenuItem value="Manpower/Labour">Manpower/Labour</MenuItem>
                  </TextField>
                </Grid>

                {/* Conditional field for Supplier */}
                {userType === 'Supplier' && (
                  <Grid item xs={12}>
                    <TextField
                      sx={{width: {xs: '100%', sm:'100%', md: '50%'}, mt: 3}}
                      label="Supplier Shop Name"
                      name="supplierShopName"
                      value={formData.supplierShopName}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                )}

                {/* Conditional dropdown for Manpower/Labour */}
                {userType === 'Manpower/Labour' && (
                  <Grid item xs={12}>
                    <TextField
                      select
                      sx={{width: {xs: '100%', sm:'100%', md: '50%'}, mt: 3}}
                      label="Labour Type"
                      name="labourType"
                      value={formData.labourType}
                      onChange={handleInputChange}
                      required
                    >
                      <MenuItem value="Engineer">Engineer</MenuItem>
                      <MenuItem value="Painter">Painter</MenuItem>
                      <MenuItem value="Carpenter">Carpenter</MenuItem>
                      <MenuItem value="Carpenter">Others</MenuItem>
                    </TextField>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" sx={{width: {xs: '100%', sm:'100%', md: '50%'}, mt: 3, height: 50}}>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </main>
      </div>
    </div>
  );
}

export default CreateProvider;
