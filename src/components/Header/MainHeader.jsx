import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Badge,
  Avatar,
  Container,
} from "@mui/material";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import { UseStore } from "../../contexts/storecontext";
import { useLocation } from "react-router-dom";
import SearchBar from "./Search";

function HomeHeader() {
  const { reducerproducts } = UseStore();
  const location = useLocation();

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
            }}
          >
            <IconButton component={Link} to="/favourites">
              <Badge
                badgeContent={reducerproducts.favourites.length}
                color="error"
              >
                <FavoriteBorderOutlinedIcon
                  color={location.pathname === "/favourites" ? "primary" : ""}
                />
              </Badge>
            </IconButton>

            <IconButton component={Link} to="/cart">
              <Badge badgeContent={reducerproducts.cart.length} color="error">
                <ShoppingCartOutlinedIcon
                  color={location.pathname === "/cart" ? "primary" : ""}
                />
              </Badge>
            </IconButton>

            <IconButton>
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: "primary.main",
                }}
              >
                B
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default HomeHeader;
