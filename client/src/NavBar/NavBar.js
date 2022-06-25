import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import AlbumIcon from '@mui/icons-material/Album';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store';



const NavBar = () => {
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const auth = useSelector((state) => state.authorizeReducer.auth);
  const pages = !auth.id ? ['Songs you saved', 'Upload', 'Login'] : ['Songs you saved', 'Upload', 'Logout']
  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar position='static'sx={{
      borderWidth:'0px 0px 2px 0px',
      borderStyle:'solid',
      backgroundImage: 'linear-gradient(to left, #3498db, #e74c3c, #9b59b6 )'
    }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <AlbumIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1,fontSize: 60 }} />
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontSize: 25,
              fontWeight:700,
              color: 'white',
              textDecoration: 'none',
            }}
          >
            VIZ
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AlbumIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, fontSize: 60 }} />
          <Typography
            variant='h5'
            noWrap
            component='a'
            href=''
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Audio
          </Typography>
  
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' },alignItems:'center' }}>

              <Box id = 'tabs' sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Link to={page}>
                    <Button
                      key={page}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: 'white', display: 'block', fontSize:12, marginTop:'1.5rem' }}
                    >                   
                        {page}                    
                    </Button>
                  </Link>
                ))}
              </Box>

            </Box>
         
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
