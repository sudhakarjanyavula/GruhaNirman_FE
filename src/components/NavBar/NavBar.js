import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Avatar, Menu, MenuItem, FormControl, Select, InputLabel } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const districts = [
  'Anakapalli',
  'Anantapur',
  'Annamayya',
  'Bapatla',
  'Chittoor',
  'East Godavari',
  'Eluru',
  'Guntur',
  'Kakinada',
  'Konaseema',
  'Krishna',
  'Kurnool',
  'Nandyal',
  'NTR (Nandamuri Taraka Rama Rao)',
  'Palnadu',
  'Parvathipuram Manyam',
  'Prakasam',
  'Srikakulam',
  'Sri Sathya Sai',
  'Tirupati',
  'Visakhapatnam',
  'Vizianagaram',
  'West Godavari',
  'YSR (Kadapa)',
  'Alluri Sitharama Raju',
  'Sri Potti Sriramulu Nellore',
];

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 300, // Adjust minimum width to increase dropdown box length
  maxWidth: 400, // Adjust maximum width to increase dropdown box length
  marginRight: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    minWidth: 200, // Adjust width for small screens
  },
}));

function NavBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const navigate = useNavigate();

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    navigate('/login');
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#FFFFFF',
        boxShadow: 'none',
        color: 'black',
        margin: 1,
      }}
    >
      <Toolbar sx={{ justifyContent: 'flex-end' }}>
        <StyledFormControl variant="outlined">
          <InputLabel id="district-select-label">Select District</InputLabel>
          <Select
            labelId="district-select-label"
            value={selectedDistrict}
            onChange={handleDistrictChange}
            label="Select District"
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 300, // Set the max height of the dropdown list
                },
              },
            }}
          >
            {districts.map((district, index) => (
              <MenuItem key={index} value={district}>
                {district}
              </MenuItem>
            ))}
          </Select>
        </StyledFormControl>

        <IconButton onClick={handleProfileClick} color="inherit">
          <Avatar
            alt="Profile Image"
            sx={{ color: '#333165' }}
            src="/path-to-your-profile-image.jpg"
          />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} keepMounted>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
