import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Badge,
  Container,
} from "@mui/material";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Tooltip from "@mui/material/Tooltip";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Link } from "react-router-dom";
import { UseStore } from "../../contexts/storecontext";
import SearchBar from "./Search";
import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

function HomeHeader() {
  const { reducerproducts } = UseStore();
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  // menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleUserMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    navigate("/");
  };

  return (
    <AppBar
      position="sticky"
      elevation={1}
      sx={{
        bgcolor: "#fff",
        color: "#000",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            padding: "0px",
          }}
        >
          {/* Logo */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
              order: { xs: 1, md: 1 },
            }}
          >
            <Typography
              sx={{
                color: "primary.main",
                fontSize: { xs: "1.6rem", md: "2rem" },
                fontWeight: 700,
              }}
            >
              TechMart
            </Typography>
          </Box>

          {/* Search */}
          <Box
            sx={{
              marginBottom: { xs: "10px", md: "0px" },
              order: { xs: 3, md: 3 },
              width: {
                xs: "100%",
                md: 420,
                lg: 450,
              },
            }}
          >
            <SearchBar />
          </Box>
          {/* Icons */}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              gap: 1,
              flex: { xs: 1, md: 0 },
              order: { xs: 2, md: 3 },
              margin: "10px 0px",
            }}
          >
            <Tooltip title="Wish List" arrow>
              <IconButton
                onClick={() => {
                  navigate("/favourites");
                }}
                sx={{
                  width: 42,
                  height: 42,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: "50%",
                }}
              >
                <Badge
                  badgeContent={reducerproducts.favourites.length}
                  color="error"
                >
                  <FavoriteBorderOutlinedIcon
                    color={location.pathname === "/favourites" ? "primary" : ""}
                  />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Cart" arrow>
              <IconButton
                onClick={() => {
                  navigate("/cart");
                }}
                sx={{
                  width: 42,
                  height: 42,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: "50%",
                }}
              >
                <Badge badgeContent={reducerproducts.cart.length} color="error">
                  <ShoppingCartOutlinedIcon
                    color={location.pathname === "/cart" ? "primary" : ""}
                  />
                </Badge>
              </IconButton>
            </Tooltip>
            {user ? (
              <>
                <Tooltip title="Account" arrow>
                  <IconButton
                    onClick={handleUserMenu}
                    aria-controls={open ? "user-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    sx={{
                      width: 42,
                      height: 42,
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: "50%",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        fontSize: 14,
                        bgcolor: "#1976d2",
                      }}
                    >
                      {user.user_metadata.full_name?.[0]?.toUpperCase()}
                    </Avatar>
                  </IconButton>
                </Tooltip>

                <Menu
                  id="user-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      logout();
                    }}
                  >
                    <LogoutOutlinedIcon
                      fontSize="small"
                      sx={{ mr: 1 }}
                      color="error"
                    />
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Tooltip title="Login" arrow>
                <IconButton
                  component={Link}
                  to="/login"
                  sx={{
                    width: 42,
                    height: 42,
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: "50%",
                  }}
                >
                  <PersonOutlineOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default HomeHeader;
