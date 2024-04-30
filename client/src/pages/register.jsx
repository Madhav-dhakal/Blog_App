import React, { useState } from "react";
import { Box, Button, TextField, Typography, InputAdornment, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import { AccountCircle, Email } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';

const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    showPassword: false
  });

  // Regex patterns
  const emailRegex = 
                     /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  
  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  // handle password visibility toggle
  const handlePasswordVisibility = () => {
    setInput((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    if (!emailRegex.test(input.email)) {
      toast.error("Invalid email address");
      return;
    }

    // Validate password
    if (!passwordRegex.test(input.password)) {
      toast.error("Password must contain at least 8 characters, including one uppercase letter, one lowercase letter,one special symbol and one number");
      return;
    }

    try {
      const { data } = await axios.post(`http://localhost:8080/api/v1/user/register`, {
        username: input.name,
        email: input.email,
        password: input.password
      });
      if (data.success) {
        navigate("/login");
        toast.success("User registered successfully !!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      maxWidth={450}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      margin="auto"
      marginTop={7}
      padding={5}
      borderRadius={6}
      boxShadow={3}
      bgcolor="#F0F5EF"
    >
      <Typography variant="h4" textAlign="center" mb={3} color="primary">
        Register
      </Typography>

      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <TextField
          fullWidth
          placeholder="Username"
          name="name"
          margin="normal"
          type="text"
          value={input.name}
          onChange={handleChange}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
            sx: { borderRadius: 3 }
          }}
        />
        <TextField
          fullWidth
          placeholder="Email"
          name="email"
          margin="normal"
          type="email"
          value={input.email}
          onChange={handleChange}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
            sx: { borderRadius: 3 }
          }}
        />
        <TextField
          fullWidth
          placeholder="Password"
          name="password"
          margin="normal"
          type={input.showPassword ? "text" : "password"}
          value={input.password}
          onChange={handleChange}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handlePasswordVisibility}
                  edge="end"
                >
                  {input.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
            sx: { borderRadius: 3 }
          }}
          sx={{ mt: 1 }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ borderRadius: 2.5, mt: 1, "&:hover": { transform: "scale(1.04)" } }}
        >
          Register
        </Button>
      </form>

      <Typography variant="body2" textAlign="center" mb={-1} mt={1}>
        Already registered?
        <Button
          onClick={() => navigate("/login")}
          color="primary"
          variant="text"
          sx={{ fontSize: "13px", textTransform: 'Uppercase', textDecoration: 'none', "&:hover": { textDecoration: 'underline', bgcolor: 'transparent', color: "#071DFA", transform: "scale(1.04)" } }}
        >
          Login
        </Button>
      </Typography>
    </Box>
  );
};

export default Register;
