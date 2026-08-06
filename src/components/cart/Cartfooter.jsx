import { Box, Divider, Typography } from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { Link } from "react-router-dom";
import { UseStore } from "../../contexts/storecontext";

function CartFooter() {
  const { reducerproducts } = UseStore();

  const totalWeight = reducerproducts.cart.reduce(
    (total, product) => total + product.weight * product.quantity,
    0,
  );

  return (
    <>
      <Divider sx={{ my: 3 }} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          component={Link}
          to="/shop/shop-all"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            textDecoration: "none",
            color: "primary.main",
            fontWeight: 500,
          }}
        >
          <ArrowBackOutlinedIcon />
          Continue Shopping
        </Box>

        <Box sx={{ textAlign: "right" }}>
          <Typography variant="caption" color="text.secondary">
            TOTAL WEIGHT
          </Typography>

          <Typography variant="h6">{totalWeight.toFixed(2)} kg</Typography>
        </Box>
      </Box>
    </>
  );
}

export default CartFooter;
