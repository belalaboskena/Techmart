import { Container, Box, Grid, Typography } from "@mui/material";
import CartItems from "../components/cart/Cartitems";
import Ordersummary from "../components/cart/Ordersummary";
import CartFooter from "../components/cart/Cartfooter";
import EmptyCart from "../components/cart/EmptyCart";
import { UseStore } from "../contexts/storecontext";
import MainHeader from "../components/Header/MainHeader";

function Cart() {
  const { reducerproducts } = UseStore();
  if (reducerproducts.cart.length === 0) {
    return (
      <>
        <MainHeader />
        <EmptyCart />
      </>
    );
  }
  return (
    <>
      <MainHeader />
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Typography
          gutterBottom
          component="div"
          sx={{
            textAlign: "center",
            fontWeight: 500,
            fontSize: {
              xs: "2rem",
              md: "2rem",
            },
          }}
        >
          Shopping Cart
        </Typography>
        <Typography
          gutterBottom
          component="div"
          sx={{
            textAlign: "center",
            marginBottom: "50px",
            fontSize: {
              xs: "1rem",
              md: "1.5rem",
            },
          }}
        >
          Review your selected items, update quantities, or remove products
          before proceeding to checkout.
        </Typography>
        <Grid container spacing={4}>
          {/* Cart Items */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Box>
              <CartItems />
            </Box>
            <CartFooter />
          </Grid>

          {/* Order Summary */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Box>
              <Ordersummary />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Cart;
