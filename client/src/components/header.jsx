import React, { useState } from "react";
import { AppBar, Toolbar, Button, Typography, Drawer, List, ListItem, ListItemText, Box, IconButton, Tabs, Tab, useMediaQuery, useTheme, Divider } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import { toast } from "react-toastify";
import { styled } from "@mui/system";
import { Menu as MenuIcon } from '@mui/icons-material';
import logo from "../img/sp.jpg";
import { ListItemIcon } from "@mui/material";
import { Home as HomeIcon, Person as PersonIcon, AddBox as AddBoxIcon } from '@mui/icons-material';
import ContactMailIcon from '@mui/icons-material/ContactMail';

const LogoContainer = styled('div')`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
`;

const LogoImage = styled('img')`
  width: 100%;
  height: auto;
`;

const StyledButton = styled(Button)`
  background-color: #4caf50;
  color: white;
  &:hover {
    background-color: #388e3c;
  }
`;

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect mobile devices
  const matches = useMediaQuery('(max-width:330px)');
  const match = useMediaQuery('(max-width:690px)');
  const logoMatch = useMediaQuery('(max-width:370px)');

  let isLogin = useSelector(state => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");

  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success("User logout successfully!");
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSidebarOptionClick = (tabValue) => {
    setSelectedTab(tabValue);
    setDrawerOpen(false);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#3f51b5" }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer}
          sx={{ display: { xs: 'block', sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer}
          sx={{ 
            width: 250,
            '& .MuiDrawer-paper': {
              width: 250,
              backgroundColor: '#3f51b5',
            },
          }}
        >
           <List sx={{ marginTop: 3 }} >
            {/* Heading */}
    <ListItem sx={{ justifyContent: 'center', paddingBottom: 2 }}>
      <Typography variant="h5" sx={{ color: 'white' }}>Sidebar Options</Typography>
    </ListItem>
    <Divider sx={{ borderColor: 'white', borderTopWidth: 1 }} />
    <ListItem button onClick={() => handleSidebarOptionClick("/blogs")}  sx={{ '&:hover': { backgroundColor: '#5C6BC0' } }}>
      <ListItemIcon>
        <HomeIcon sx={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText primary={<Typography variant="h6" sx={{ color: 'white' }} >Blogs</Typography>} />
    </ListItem>
    <ListItem button onClick={() => handleSidebarOptionClick("/my-blogs")}  sx={{ '&:hover': { backgroundColor: '#5C6BC0' } }}>
      <ListItemIcon>
        <PersonIcon sx={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText primary={<Typography variant="h6" sx={{ color: 'white' }}>My Blogs</Typography>} />
    </ListItem>
    <ListItem button onClick={() => handleSidebarOptionClick("/create-blog")}  sx={{ '&:hover': { backgroundColor: '#5C6BC0' } }}>
      <ListItemIcon>
        <AddBoxIcon sx={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText primary={<Typography variant="h6" sx={{ color: 'white' }}>Create Blog</Typography>} />
    </ListItem>

    <ListItem button onClick={() => handleSidebarOptionClick("/contact")}  sx={{ '&:hover': { backgroundColor: '#5C6BC0' } }}>
      <ListItemIcon>
        <ContactMailIcon sx={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText primary={<Typography variant="h6" sx={{ color: 'white' }}>Contact Me</Typography>} />
    </ListItem>
  </List>
        </Drawer>
        {!logoMatch && (
      <LogoContainer>
        <Typography component={Link} to="/" >
        <LogoImage src={logo} alt="Logo" />
        </Typography>
      </LogoContainer>
    )}
        {!match && (
          <Typography variant="h6" component={Link} to="/" sx={{ color: "white", textDecoration: "none", marginLeft: 1 }}>
            BlogApp
          </Typography>
        )}
        <Box sx={{ flexGrow: 1 }} />

        {isMobile && (
  <Box display="flex">
    {selectedTab && (
      <Tabs textColor="inherit" value={selectedTab} onChange={(e, val) => setSelectedTab(val)}>
        {selectedTab === '/blogs' && (
          <Tab label="Blogs" value="/blogs" component={Link} to="/blogs" />
        )}
        {selectedTab === '/my-blogs' && (
          <Tab label="My Blogs" value="/my-blogs" component={Link} to="/my-blogs" />
        )}
        {selectedTab === '/create-blog' && (
          <Tab label="Create Blog" value="/create-blog" component={Link} to="/create-blog" />
        )}

         {selectedTab === '/contact' && (
          <Tab label="Contact" value="/contact" component={Link} to="/contact" />
        )}
      </Tabs>
    )}
  </Box>
        ) }


<Box display={{ xs: 'none', sm: 'block' }}>
        { isLogin && (
          <Tabs textColor="inherit" value={selectedTab} onChange={(e, val) => setSelectedTab(val)}>
            <Tab label="Blogs" value="/blogs" component={Link} to="/blogs" />
            <Tab label="My Blogs" value="/my-blogs" component={Link} to="/my-blogs" />
            <Tab label="Create Blog" value="/create-blog" component={Link} to="/create-blog" />
            <Tab label="Contact" value="/contact" component={Link} to="/contact" />
          </Tabs>
        )}
        </Box>

        
        <Box sx={{ flexGrow: 1 }} />
        <Box display="flex">
          {!isLogin ? (
            <>
              <StyledButton component={Link} to="/login" sx={{ margin: 1 }}>
                Login
              </StyledButton>
              <Button component={Link} to="/register" sx={{ margin: 1, color: "white" }}>
                Register
              </Button>
            </>
          ) : (
            <StyledButton onClick={handleLogout} sx={{ margin: 1 }}>
              Logout
            </StyledButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
