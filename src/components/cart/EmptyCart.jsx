import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function EmptyCart() {
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
      <ShoppingCartOutlinedIcon
        sx={{
          fontSize: 90,
          color: "text.secondary",
        }}
      />

      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 1,
        }}
      >
        Your Cart is Empty
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{
          maxWidth: 450,
          mb: 4,
        }}
      >
        Looks like you haven't added anything to your cart yet. Browse our
        collection and find something you'll love.
      </Typography>

      <Button
        component={Link}
        to="/shop/shop-all"
        variant="contained"
        size="large"
        sx={{
          px: 4,
          py: 1.3,
          mb: 1,
          borderRadius: 3,
          textTransform: "none",
        }}
      >
        Continue Shopping
      </Button>
    </Box>
  );
}

export default EmptyCart;
