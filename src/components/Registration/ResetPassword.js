import React, { useState } from 'react';
import {
  Grid, Box, TextField, Button, Typography, Link, InputAdornment, IconButton, FormHelperText
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import MainImage from '../../assets/MainImage.svg'; // Ensure this path is correct

function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Initialize navigate

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validatePassword = (password) => {
    // Regular expression to validate password strength
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Password validation
    const errors = {};
    if (!validatePassword(newPassword)) {
      errors.newPassword = 'Password must be at least 8 characters long, include one capital letter, one number, and one special character.';
    }
    if (newPassword !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    // Redirect to signup page if passwords match and are valid
    navigate('/signup');
  };

  return (
    <Grid container sx={{ height: '100vh' }}>
      {/* Left Side - Blue Background */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: { xs: 'none', md: 'block' },
        }}
      >
        <Box
          sx={{
            height: '100vh',
            bgcolor: '#333165',
            overflowY: 'hidden',
          }}
        />
      </Grid>

      {/* Right Side - Reset Password Form */}
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            px: 2,
          }}
        >
          {/* Centered Image */}
          <Box
            component="img"
            src={MainImage}
            alt="Main Image"
            sx={{
              width: { xs: '60%', sm: '50%', md: '40%', lg: '30%' },
              mb: 2,
            }}
          />

          {/* Heading */}
          <Typography variant="h4" gutterBottom align="center">
            Reset Password
          </Typography>

          {/* Reset Password Form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: '100%',
              maxWidth: '400px',
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              fullWidth
              label="New Password"
              margin="normal"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={handleClickShowPassword}
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={!!errors.newPassword}
            />
            {errors.newPassword && <FormHelperText error>{errors.newPassword}</FormHelperText>}

            <TextField
              fullWidth
              label="Confirm Password"
              margin="normal"
              variant="outlined"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={handleClickShowConfirmPassword}
                      aria-label="toggle password visibility"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={!!errors.confirmPassword}
            />
            {errors.confirmPassword && <FormHelperText error>{errors.confirmPassword}</FormHelperText>}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
            >
              Submit
            </Button>
          </Box>

          {/* Back to Login */}
          <Box
            sx={{
              mt: 2,
              textAlign: 'center',
            }}
          >
            <Typography variant="body2">
              Remembered your password?{' '}
              <Link href="/login" color="primary">
                Login
              </Link>
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default ResetPassword;
