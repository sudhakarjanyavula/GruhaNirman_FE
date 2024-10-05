import React, { useState } from 'react';
import {
  Grid, Box, TextField, Button, Typography, Link, InputAdornment, MenuItem, Select, FormControl, InputLabel, IconButton
} from '@mui/material';
import { Email, Phone, Person, Visibility, VisibilityOff } from '@mui/icons-material'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function SignUp() {
  const [userType, setUserType] = useState('');
  const [manpowerType, setManpowerType] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [shopName, setShopName] = useState('');
  const [errors, setErrors] = useState({});
  const [apiResponse, setApiResponse] = useState(null);
  const navigate = useNavigate();

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
    setManpowerType(''); 
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handlePhoneNumberChange = (event) => {
    const { value } = event.target;
    if (/^\d*$/.test(value) && value.length <= 10) {
      setPhoneNumber(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = {};
    if (!validatePassword(password)) {
      errors.password = 'Password must be at least 8 characters long, include one capital letter, one number, and one special character.';
    }
    if (phoneNumber.length !== 10) {
      errors.phoneNumber = 'Phone number must be exactly 10 digits.';
    }

    if (!email) {
      errors.email = 'Email is required.';
    }

    if (!fullName) {
      errors.fullName = 'Full name is required.';
    }

    if (!userType) {
      errors.userType = 'User type is required.';
    }

    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    const postData = {
      userName: fullName, // Map fullName to userName as expected by backend
      emailID: email,
      password,
      mobileNumber: phoneNumber,
      userType,
      ...(userType === 'Supplier' && { supplierShopName: shopName }), // Use supplierShopName instead of shopName
      ...(userType === 'Manpower/Labour' && { manPowerType: manpowerType }), // Use manPowerType instead of manpowerType
      ...(userType === 'Consumer' && { isActive: true }), // Set isActive to true for Consumer
    };
  
    try {
      // Make an API call to the correct backend endpoint
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/create`, postData);
  
      if (response.data.success) {
        setApiResponse({ success: true, message: 'Account created successfully!' });
        navigate('/login'); // Redirect to login after successful signup
      } else {
        setApiResponse({ success: false, message: response.data.message });
      }
    } catch (error) {
      console.error(error);
      setApiResponse({ success: false, message: 'An error occurred while creating the account.' });
    }
  }

  return (
    <Grid container sx={{ height: '100vh', overflowY: 'hidden' }}>
      <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' }, height: '100vh' }}>
        <Box sx={{ height: '100vh', bgcolor: '#333165', overflowY: 'hidden' }} />
      </Grid>

      <Grid item xs={12} md={6} sx={{ overflowY: 'scroll' }}>
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 3, pt: 3 }}>
          <Typography variant="h4" gutterBottom>Create Your Account</Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: '400px' }} noValidate autoComplete="off">
            <TextField
              fullWidth
              label="Full Name"
              margin="normal"
              variant="outlined"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              InputProps={{
                endAdornment: <InputAdornment position="end"><Person /></InputAdornment>,
              }}
              error={!!errors.fullName}
              helperText={errors.fullName}
            />

            <TextField
              fullWidth
              label="Email"
              margin="normal"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                endAdornment: <InputAdornment position="end"><Email /></InputAdornment>,
              }}
              error={!!errors.email}
              helperText={errors.email}
            />

            <TextField
              fullWidth
              label="Password"
              margin="normal"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={handleClickShowPassword} aria-label="toggle password visibility">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={!!errors.password}
              helperText={errors.password}
            />

            <TextField
              fullWidth
              label="Phone Number"
              margin="normal"
              variant="outlined"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              InputProps={{
                endAdornment: <InputAdornment position="end"><Phone /></InputAdornment>,
              }}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
            />

              <FormControl fullWidth margin="normal" error={!!errors.userType}>
                <InputLabel>User Type</InputLabel>
                <Select value={userType} onChange={handleUserTypeChange} label="User Type" variant="outlined">
                  <MenuItem value="Consumer">Consumer</MenuItem>
                  <MenuItem value="Supplier">Supplier</MenuItem>
                  <MenuItem value="Manpower/Labour">Manpower/Labour</MenuItem>
                </Select>
                {errors.userType && <Typography variant="body2" color="error">{errors.userType}</Typography>}
              </FormControl>
              
            {userType === 'Supplier' && (
              <TextField
                fullWidth
                label="Supplier Shop Name"
                margin="normal"
                variant="outlined"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
              />
            )}

            {userType === 'Manpower/Labour' && (
              <FormControl fullWidth margin="normal">
                <InputLabel>Manpower Type</InputLabel>
                <Select
                  value={manpowerType}
                  onChange={(event) => setManpowerType(event.target.value)}
                  label="Manpower Type"
                  variant="outlined"
                >
                  <MenuItem value="Painter">Painter</MenuItem>
                  <MenuItem value="Carpenter">Carpenter</MenuItem>
                  <MenuItem value="Engineer">Engineer</MenuItem>
                  <MenuItem value="Driver">Driver</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
                </Select>
              </FormControl>
            )}

            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3 }}>
              Submit
            </Button>
          </Box>

          {apiResponse && (
            <Typography variant="body2" color={apiResponse.success ? 'green' : 'red'} sx={{ mt: 2 }}>
              {apiResponse.message}
            </Typography>
          )}

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2">
              Already have an account?{' '}
              <Link href="/login" color="primary">
                SignIn
              </Link>
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default SignUp;
