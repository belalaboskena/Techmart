import {
  Box,
  Typography,
  Rating,
  Button,
  Chip,
  Stack,
  Paper,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import KeyboardReturnOutlinedIcon from "@mui/icons-material/KeyboardReturnOutlined";
import { UseStore } from "../../contexts/storecontext";
import { useSnackbar } from "notistack";

function ProductInfo({ product }) {
  // ===
  const { reducerproducts, dispatch } = UseStore();
  const { enqueueSnackbar } = useSnackbar();

  function togglecart(id, weight, price, stock) {
    dispatch({
      type: "toggle-cart",
      payload: { id: id, weight: weight, price: price, stock: stock },
    });
    const isInCart = reducerproducts.cart.some((item) => item.id === id);

    enqueueSnackbar(
      isInCart ? "Product removed from cart" : "Product added to cart",
      {
        variant: isInCart ? "error" : "success",
      },
    );
  }
  function toggleFavourite(id) {
    dispatch({ type: "toggle-favourite", payload: { id: id } });

    enqueueSnackbar(
      reducerproducts.favourites.includes(id)
        ? "Product removed from wish list"
        : "Product added to wish list",
      {
        variant: reducerproducts.favourites.includes(id) ? "error" : "success",
      },
    );
  }
  // ===
  const oldPrice = (
    product.price /
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  return (
    <Box>
      {/* Brand */}

      <Typography variant="overline" color="primary" sx={{ letterSpacing: 2 }}>
        {product.brand}
      </Typography>

      {/* Title */}

      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 1,
        }}
      >
        {product.title}
      </Typography>

      {/* Rating */}

      <Stack direction="row" spacing={1} sx={{ mb: 1, alignItems: "center" }}>
        <Rating value={product.rating} precision={0.5} readOnly />

        <Typography color="text.secondary">{product.rating}</Typography>

        <Typography color="text.secondary">
          ({product.reviews.length} Reviews)
        </Typography>
      </Stack>

      {/* Price */}

      <Stack direction="row" spacing={2} sx={{ mb: 1, alignItems: "center" }}>
        <Typography variant="h4" color="primary" fontWeight="bold">
          ${product.price}
        </Typography>

        <Typography
          sx={{
            textDecoration: "line-through",
            color: "text.secondary",
          }}
        >
          ${oldPrice}
        </Typography>

        <Chip
          color="error"
          size="small"
          label={`Save ${product.discountPercentage.toFixed(0)}%`}
        />
      </Stack>

      {/* Stock */}

      <Typography
        sx={{
          color: "green",
          mb: 1,
          fontWeight: 600,
        }}
      >
        {product.availabilityStatus}
      </Typography>

      {/* Description */}

      <Typography
        color="text.secondary"
        sx={{
          lineHeight: 1.8,
          mb: 2,
        }}
      >
        {product.description}
      </Typography>

      {/* Buttons */}

      <Button
        variant="contained"
        fullWidth
        sx={{
          flex: 1,
          height: 50,
          mb: 2,
          gap: "10px",
        }}
        onClick={(e) => {
          togglecart(product.id, product.weight, product.price, product.stock);
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {reducerproducts.cart.some((item) => item.id === product.id) ? (
          <>Remove from Cart</>
        ) : (
          <>
            <ShoppingCartOutlinedIcon />
            Add To Cart
          </>
        )}
      </Button>

      <Button
        variant="contained"
        fullWidth
        color="inherit"
        sx={{
          flex: 1,
          mb: 2,
          height: 50,
          gap: "10px",
        }}
        onClick={() => {
          toggleFavourite(product.id);
        }}
      >
        {reducerproducts.favourites.includes(product.id) ? (
          <>Remove from Wish list</>
        ) : (
          <>
            <FavoriteIcon color="error" /> Add to Wish list
          </>
        )}
      </Button>

      {/* Shipping */}

      <Stack direction="row" spacing={2}>
        <Paper
          elevation={0}
          sx={{
            p: 2,
            flex: 1,
            backgroundColor: "inherit",
          }}
        >
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <LocalShippingOutlinedIcon color="primary" />

            <Box>
              <Typography fontWeight={600}>Fast Shipping</Typography>

              <Typography variant="caption">
                {product.shippingInformation}
              </Typography>
            </Box>
          </Stack>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            p: 2,
            flex: 1,
            backgroundColor: "inherit",
          }}
        >
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <ShieldOutlinedIcon color="primary" />

            <Box>
              <Typography fontWeight={600}>Warranty</Typography>

              <Typography variant="caption">
                {product.warrantyInformation}
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Stack>
      <Paper
        elevation={0}
        sx={{
          p: 2,
          flex: 1,
          backgroundColor: "inherit",
        }}
      >
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <KeyboardReturnOutlinedIcon color="error" />

          <Box>
            <Typography fontWeight={600}>Return Policy</Typography>

            <Typography variant="caption">{product.returnPolicy}</Typography>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}

export default ProductInfo;
