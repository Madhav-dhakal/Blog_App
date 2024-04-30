import React, { useState } from "react";
import { Box, Button, TextField, Typography, IconButton, InputAdornment } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import { toast } from 'react-toastify';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
    showPassword: false
  });

  // handle input change
  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  // handle visibility toggle for password
  const handlePasswordVisibility = () => {
    setInput((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:8080/api/v1/user/login", {
        email: input.email,
        password: input.password
      });
      if (data.success) {
        localStorage.setItem("userId", data?.user._id);
        dispatch(authActions.login());
        toast.success("Login successful !!");
        navigate("/")
        
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      console.log(error);
      toast.error("credentials doesnot match");
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
        Login
      </Typography>

      <form onSubmit={handleSubmit} style={{ width: "100%" }} >
        <TextField
          fullWidth
          placeholder="Email"
          name="email"
          margin="normal"
          type="email"
          value={input.email}
          onChange={handleChange}
          required
          mb={1}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
            sx: { borderRadius: 3 }
          }}
          sx={{ mt: 1 }}
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
          Login
        </Button>
      </form>

      <Typography variant="body2" textAlign="center" mb={1} mt={1.8}>
        Don't have an account? {" "}
        <Link to="/register"
          color="primary"
          variant="text"
          sx={{ textDecoration: 'none', "&:hover": { textDecoration: 'underline', color: "#071DFA", } }}
        >
          Register
        </Link>
      </Typography>

    </Box>
  );
};

export default Login;
