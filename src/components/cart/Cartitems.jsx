import {
  Box,
  Card,
  CardMedia,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { UseStore } from "../../contexts/storecontext";
import { useSnackbar } from "notistack";
import CartLoading from "./CartLoading";

function CartItems() {
  const { reducerproducts, dispatch } = UseStore();
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  // =======
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const cartIds = JSON.parse(localStorage.getItem("cartproducts")) || [];

    Promise.all(
      cartIds.map((item) =>
        axios.get(`https://dummyjson.com/products/${item.id}`),
      ),
    )
      .then((responses) => {
        setProducts(responses.map((response) => response.data));
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
    // =====
  }, [reducerproducts.cart]);

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
  function increase(id) {
    dispatch({ type: "INCREASE_QUANTITY", payload: { id: id } });
  }
  function decrease(id) {
    dispatch({ type: "DECREASE_QUANTITY", payload: { id: id } });
  }
  if (loading) {
    return <CartLoading />;
  }
  return (
    <Box
      sx={{
        height: "calc(100vh - 140px)",
        overflowY: "auto",
        pr: 2,

        "&::-webkit-scrollbar": {
          width: "6px",
        },

        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#d9d9d9",
          borderRadius: "10px",
        },
      }}
    >
      {products.map((product) => {
        const cartItem = reducerproducts.cart.find(
          (item) => item.id === product.id,
        );
        return (
          <Card
            key={product.id}
            elevation={2}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "stretch", sm: "center" },
              gap: { xs: 3, sm: 2 },
              p: { xs: 2, sm: 3 },
              mb: 3,
              borderRadius: 3,
              bgcolor: "#ebebeb",
            }}
          >
            {/* Left */}

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: { xs: 2, sm: 3 },
                alignItems: { xs: "stretch", sm: "center" },
                flex: 1,
                minWidth: 0,
              }}
            >
              <Link key={product.id} to={`/product/${product.id}`}>
                <CardMedia
                  component="img"
                  image={product.thumbnail}
                  alt={product.title}
                  sx={{
                    width: { xs: "100%", sm: 120 },
                    height: { xs: 180, sm: 120 },
                    objectFit: "contain",
                    bgcolor: "white",
                    borderRadius: 2,
                  }}
                />
              </Link>

              <Box
                sx={{
                  minWidth: 0,
                }}
              >
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <Typography
                    variant="h5"
                    fontWeight={600}
                    sx={{
                      fontSize: {
                        xs: "1.1rem",
                        sm: "1.25rem",
                        md: "1.5rem",
                      },
                    }}
                  >
                    {product.title}
                  </Typography>
                </Link>

                <Typography
                  sx={{
                    color: "text.secondary",
                    mt: 1,
                    mb: 2,
                  }}
                >
                  {product.brand}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexWrap: "wrap",
                  }}
                >
                  <Button
                    startIcon={
                      reducerproducts.favourites.includes(product.id) ? (
                        <FavoriteIcon />
                      ) : (
                        <FavoriteBorderOutlinedIcon />
                      )
                    }
                    sx={{
                      textTransform: "none",
                      color: reducerproducts.favourites.includes(product.id)
                        ? "error.main"
                        : "text.secondary",
                      p: 0,
                      minWidth: "auto",

                      "&:hover": {
                        background: "transparent",
                        color: "error.main",
                      },
                    }}
                    onClick={(e) => {
                      toggleFavourite(product.id);
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    Save
                  </Button>

                  <Button
                    startIcon={<DeleteOutlineOutlinedIcon />}
                    onClick={(e) => {
                      togglecart(product.id);
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    sx={{
                      textTransform: "none",
                      color: "text.secondary",
                      p: 0,
                      minWidth: "auto",

                      "&:hover": {
                        background: "transparent",
                        color: "error.main",
                      },
                    }}
                  >
                    Remove
                  </Button>
                </Box>
              </Box>
            </Box>

            {/* Right */}

            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "row",
                  sm: "column",
                },
                justifyContent: {
                  xs: "space-between",
                  sm: "center",
                },
                alignItems: {
                  xs: "center",
                  sm: "flex-end",
                },
                gap: 2,
                width: {
                  xs: "100%",
                  sm: "auto",
                },
                pt: {
                  xs: 2,
                  sm: 0,
                },
                borderTop: {
                  xs: "1px solid #d5d5d5",
                  sm: "none",
                },
              }}
            >
              {/* Quantity */}

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #ddd",
                  borderRadius: 2,
                  bgcolor: "white",
                }}
              >
                <IconButton disabled={cartItem?.quantity === 1}>
                  <RemoveIcon
                    onClick={(e) => {
                      decrease(product.id);
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  />
                </IconButton>

                <Typography
                  sx={{
                    minWidth: 25,
                    textAlign: "center",
                    fontWeight: 500,
                  }}
                >
                  {
                    reducerproducts.cart.find((item) => item.id === product.id)
                      ?.quantity
                  }
                </Typography>

                <IconButton disabled={cartItem?.quantity === cartItem?.stock}>
                  <AddIcon
                    onClick={(e) => {
                      increase(product.id);
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  />
                </IconButton>
              </Box>

              {/* Price */}

              <Typography
                variant="h5"
                color="primary"
                fontWeight={700}
                sx={{
                  fontSize: {
                    xs: "1.2rem",
                    sm: "1.5rem",
                  },
                  whiteSpace: "nowrap",
                }}
              >
                $
                {(
                  product.price *
                  reducerproducts.cart.find((item) => item.id === product.id)
                    ?.quantity
                ).toFixed(2)}
              </Typography>
            </Box>
          </Card>
        );
      })}
    </Box>
  );
}

export default CartItems;
