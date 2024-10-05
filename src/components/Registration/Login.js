import React, { useState, useRef } from 'react';
import {
  Grid, Box, TextField, Button, Typography, Link, InputAdornment, IconButton, Modal
} from '@mui/material';
import { Email, Visibility, VisibilityOff, Close } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import MainImage from '../../assets/MainImage.svg';
import axios from 'axios';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openEmailModal, setOpenEmailModal] = useState(false);
  const [apiResponse, setApiResponse] = useState({ success: true, message: '' });
  const [openOtpModal, setOpenOtpModal] = useState(false);
  const [otp, setOtp] = useState(Array(5).fill(''));
  const otpRefs = useRef([]);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword(prev => !prev);
  const handleOpenEmailModal = () => setOpenEmailModal(true);
  const handleCloseEmailModal = () => setEmail('') || setOpenEmailModal(false);
  const handleOpenOtpModal = () => setOpenEmailModal(false) || setOpenOtpModal(true);
  const handleCloseOtpModal = () => setOtp(Array(5).fill('')) || setOpenOtpModal(false);

  const handleEmailChange = e => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  
  const handleOtpChange = (index, value) => {
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < otp.length - 1) otpRefs.current[index + 1]?.focus();
    } else if (value === '') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      if (index > 0) otpRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmitOtp = () => {
    handleCloseOtpModal();
    navigate('/resetpassword');
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      emailID: email,
      password: password,
    };

    try {
      // API call to authenticate user
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/authenticate`, loginData);
      const result = response.data;

      if (result.success) {
        localStorage.setItem('token', result.body.token);  
        navigate('/dashboard'); 
      } else {
        setApiResponse({ success: false, message: result.error });
      }
    } catch (error) {
      console.error('Login error:', error);
      setApiResponse({ success: false, message: 'An error occurred during login.' });
    }
  };

  return (
    <Grid container sx={{ height: '100vh' }}>
      {/* Left Side - Blue Background */}
      <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
        <Box sx={{ height: '100vh', bgcolor: '#333165' }} />
      </Grid>

      {/* Right Side - Login Form */}
      <Grid item xs={12} md={6}>
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', px: 2 }}>
          <Box component="img" src={MainImage} alt="Main Image" sx={{ width: '40%', mb: 2 }} />
          <Typography variant="h4" gutterBottom align="center">Login</Typography>
          <Box component="form" sx={{ width: '100%', maxWidth: 400 }} noValidate autoComplete="off" onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              variant="outlined"
              value={email}
              onChange={handleEmailChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end"><Email /></InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} aria-label="toggle password visibility">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {apiResponse.message && (
              <Typography color={apiResponse.success ? 'success.main' : 'error.main'} variant="body2" align="center" sx={{ mt: 2 }}>
                {apiResponse.message}
              </Typography>
            )}
            <Box sx={{ textAlign: 'right', mt: 1 }}>
              <Link href="#" color="primary" onClick={handleOpenEmailModal}>Forgot Password?</Link>
            </Box>
            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3 }}>Login</Button>
          </Box>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2">
              Don't have an account? <Link href="/signup" color="primary">SignUp</Link>
            </Typography>
          </Box>
        </Box>
      </Grid>

      {/* Email Modal */}
      <Modal open={openEmailModal} onClose={handleCloseEmailModal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', maxWidth: 400, bgcolor: 'background.paper', p: 4, borderRadius: 2, boxShadow: 24, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <IconButton onClick={handleCloseEmailModal} sx={{ position: 'absolute', top: 8, right: 8 }}><Close sx={{ color: '#333165' }} /></IconButton>
          <Typography variant="h6" gutterBottom align="center">Enter Email</Typography>
          <TextField fullWidth label="Email" margin="normal" variant="outlined" value={email} onChange={handleEmailChange} InputProps={{ endAdornment: (<InputAdornment position="end"><Email /></InputAdornment>) }} sx={{ mb: 2 }} />
          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleOpenOtpModal}>Next</Button>
        </Box>
      </Modal>

      {/* OTP Modal */}
      <Modal open={openOtpModal} onClose={handleCloseOtpModal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', maxWidth: 400, bgcolor: 'background.paper', p: 4, borderRadius: 2, boxShadow: 24, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <IconButton onClick={handleCloseOtpModal} sx={{ position: 'absolute', top: 8, right: 8 }}><Close sx={{ color: '#333165' }} /></IconButton>
          <Typography variant="h6" gutterBottom align="center">Enter OTP</Typography>
          <Grid container spacing={1} justifyContent="center" sx={{ mb: 2 }}>
            {otp.map((value, index) => (
              <Grid item key={index} xs={2}>
                <TextField
                  inputRef={ref => otpRefs.current[index] = ref}
                  variant="outlined"
                  value={value}
                  onChange={e => handleOtpChange(index, e.target.value)}
                  inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
                />
              </Grid>
            ))}
          </Grid>
          <Button variant="contained" color="primary" onClick={handleSubmitOtp}>Submit</Button>
          <Link href="#" color="primary" sx={{ mt: 2 }}>Resend OTP</Link>
        </Box>
      </Modal>
    </Grid>
  );
};

export default Login;
