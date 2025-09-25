import React, { useState } from 'react';//react hook to manage local state
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Badge, { badgeClasses } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';//css
import { Link } from 'react-router-dom';//react router for client side 
import { useAuth } from '../context/auth/AuthContext';
import { useCart } from '../context/cart/CartContext';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const CartBadge = styled(Badge)(({ theme }) => ({   ///customized badge for cart
  [`& .${badgeClasses.badge}`]: {
    top: -6,
    right: -6,
    backgroundColor: theme.palette.info.main,
    color: '#fff',
    fontWeight: 700,
    fontSize: '0.75rem',
    border: `2px solid rgba(255,255,255,0.2)`,
  },
}));

const StyledLink = styled(Link)({//style the link 
  textDecoration: 'none',
  color: 'inherit',
});

function Navbar() {
  const { token, logout } = useAuth();//whether logged in 
  const { cart } = useCart();//item count
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);//for mobile menu

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {//
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);//control menu open state

  return (
    <AppBar //stays on top when scrolling
      position="sticky"
      sx={{
        background: 'rgba(55,53,62,0.95)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        py: 1,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Logo + Menu items */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <StyledLink to="/" style={{ display: 'flex', alignItems: 'center' }}>
              <ShoppingBagRoundedIcon sx={{ fontSize: 36, mr: 1, color: '#fff' }} />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: '#fff',
                }}
              >
                SHOPPY WORLD
              </Typography>
            </StyledLink>

            {/* Desktop Links */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
              <StyledLink to="/">
                <Button sx={{ color: '#fff', fontWeight: 500, transition: '0.3s', '&:hover': { color: '#1976d2' } }}>
                  Home
                </Button>
              </StyledLink>
              {token && (
                <>
                  <StyledLink to="/products">
                    <Button sx={{ color: '#fff', fontWeight: 500, transition: '0.3s', '&:hover': { color: '#1976d2' } }}>
                      Products
                    </Button>
                  </StyledLink>
                  <StyledLink to="/orders">
                    <Button sx={{ color: '#fff', fontWeight: 500, transition: '0.3s', '&:hover': { color: '#1976d2' } }}>
                      Orders
                    </Button>
                  </StyledLink>
                </>
              )}
            </Box>
          </Box>

          {/* Right actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {token ? (
              <>
                <StyledLink to="/cart">
                  <IconButton sx={{ color: '#fff', position: 'relative', transition: '0.3s', '&:hover': { color: '#1976d2' } }}>
                    <AddShoppingCartIcon />
                    <CartBadge badgeContent={cart?.items.length || 0} color="info" overlap="circular" />
                  </IconButton>
                </StyledLink>
                <Button
                  onClick={logout}
                  sx={{ color: '#fff', borderRadius: '20px', border: '1px solid #1976d2', px: 2, transition: '0.3s', '&:hover': { backgroundColor: '#1976d2', color: '#fff' } }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <StyledLink to="/login">
                  <Button sx={{ color: '#fff', borderRadius: '20px', border: '1px solid #1976d2', px: 2, transition: '0.3s', '&:hover': { backgroundColor: '#1976d2', color: '#fff' } }}>
                    Login
                  </Button>
                </StyledLink>
                <StyledLink to="/register">
                  <Button sx={{ color: '#fff', borderRadius: '20px', border: '1px solid #1976d2', px: 2, transition: '0.3s', '&:hover': { backgroundColor: '#1976d2', color: '#fff' } }}>
                    Register
                  </Button>
                </StyledLink>
              </>
            )}

            {/* Mobile Hamburger Menu */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton onClick={handleMenu} sx={{ color: '#fff' }}>
                <MenuIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={handleClose} component={Link} to="/">Home</MenuItem>
                {token && (
                  <>
                    <MenuItem onClick={handleClose} component={Link} to="/products">Products</MenuItem>
                    <MenuItem onClick={handleClose} component={Link} to="/orders">Orders</MenuItem>
                  </>
                )}
                {token ? (
                  <MenuItem onClick={() => { logout(); handleClose(); }}>Logout</MenuItem>
                ) : (
                  <>
                    <MenuItem onClick={handleClose} component={Link} to="/login">Login</MenuItem>
                    <MenuItem onClick={handleClose} component={Link} to="/register">Register</MenuItem>
                  </>
                )}
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
