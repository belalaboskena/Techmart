import { Box, Button, Typography } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Link } from "react-router-dom";

function EmptyFavourite() {
  return (
    <Box
      sx={{
        minHeight: "55vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: 2,
      }}
    >
      <FavoriteBorderOutlinedIcon
        sx={{
          fontSize: 90,
          color: "text.secondary",
          mb: 2,
        }}
      />

      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 1,
        }}
      >
        Your wishlist is empty
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{
          maxWidth: 450,
          mb: 4,
        }}
      >
        Save your favorite products to access them quickly anytime. Start
        exploring our collection and add the items you love.
      </Typography>

      <Button
        component={Link}
        to="/shop/shop-all"
        variant="contained"
        size="large"
        sx={{
          px: 4,
          py: 1.3,
          borderRadius: 3,
          textTransform: "none",
        }}
      >
        Explore Products
      </Button>
    </Box>
  );
}

export default EmptyFavourite;
