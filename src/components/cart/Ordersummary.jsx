import {
  Box,
  Button,
  Divider,
  Paper,
  Typography,
  TextField,
} from "@mui/material";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { UseStore } from "../../contexts/storecontext";

function Ordersummary() {
  const { reducerproducts } = UseStore();
  const subtotal = reducerproducts.cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0,
  );

  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 10;

  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 3,
        bgcolor: "#ebebeb",
      }}
    >
      <Typography variant="h5" fontWeight={700} mb={3}>
        Order Summary
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography color="text.secondary">Subtotal</Typography>

        <Typography>${subtotal.toFixed(2)}</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography color="text.secondary">Shipping</Typography>

        <Typography>{shipping === 0 ? "Free" : `$${shipping}`}</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography color="text.secondary">Tax</Typography>

        <Typography>${tax.toFixed(2)}</Typography>
      </Box>

      <Divider />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          my: 3,
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          Total
        </Typography>

        <Typography variant="h6" fontWeight={700} color="primary">
          ${total.toFixed(2)}
        </Typography>
      </Box>

      {/* Promo Code */}

      <Box
        sx={{
          display: "flex",
          mt: 3,
          mb: 3,
        }}
      >
        <TextField placeholder="Promo Code" size="small" fullWidth />

        <Button
          sx={{
            ml: 1,
            textTransform: "none",
            minWidth: 80,
          }}
        >
          Apply
        </Button>
      </Box>

      {/* Checkout */}

      <Button
        fullWidth
        variant="contained"
        sx={{
          py: 1.7,
          borderRadius: 2,
          textTransform: "none",
          fontSize: "1rem",
          mb: 2,
        }}
      >
        Proceed to Checkout
      </Button>

      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ mb: 3 }}
      >
        Secure checkout powered by Stripe. All transactions are encrypted and
        safe.
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 3,
          color: "gray",
        }}
      >
        <CreditCardOutlinedIcon fontSize="large" />
        <PaymentsOutlinedIcon fontSize="large" />
        <SecurityOutlinedIcon fontSize="large" />
      </Box>
    </Paper>
  );
}

export default Ordersummary;
