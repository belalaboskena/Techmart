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
import CartLoading from "./CartLoading";

function CartItems() {
  const {
    reducerproducts,
    togglecart,
    toggleFavourite,
    increaseQuantity,
    decreaseQuantity,
  } = UseStore();
  const [loading, setLoading] = useState(true);

  // =======
  const [products, setProducts] = useState([]);

  const cartIds = reducerproducts.cart.map((item) => item.id);

  useEffect(() => {
    let ignore = false;

    const fetchCartProducts = async () => {
      setLoading(true);

      const cartItems = reducerproducts.cart || [];

      if (cartItems.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      try {
        const responses = await Promise.all(
          cartItems.map((item) =>
            axios.get(`https://dummyjson.com/products/${item.id}`),
          ),
        );

        if (!ignore) {
          setProducts(responses.map((response) => response.data));
        }
      } catch (error) {
        if (!ignore) {
          console.error("Error fetching cart products:", error);
          setProducts([]);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchCartProducts();

    return () => {
      ignore = true;
    };
  }, [cartIds.join(",")]);
  if (loading) {
    return <CartLoading />;
  }
  return (
    <Box
      sx={{
        height: {
          sm: "auto",
          lg: "calc(100vh - 140px)",
        },
        overflowY: {
          sm: "visible",
          lg: "auto",
        },
        pr: {
          sm: 0,
          lg: 2,
        },

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
              gap: { xs: 2, sm: 2 },
              p: { xs: 1.5, sm: 3 },
              mb: 3,
              borderRadius: 3,
              bgcolor: "#ebebeb",
            }}
          >
            {/* Left */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: { xs: 3, sm: 3 },
                alignItems: "center",
                flex: 1,
                minWidth: 0,
              }}
            >
              <Link to={`/product/${product.id}`}>
                <CardMedia
                  component="img"
                  image={product.thumbnail}
                  alt={product.title}
                  sx={{
                    width: { xs: 100, sm: 120 },
                    height: { xs: 100, sm: 120 },
                    objectFit: "contain",
                    bgcolor: "white",
                    borderRadius: 2,
                    flexShrink: 0,
                  }}
                />
              </Link>

              <Box
                sx={{
                  minWidth: 0,
                  flex: 1,
                }}
              >
                <Link
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
                        xs: "1rem",
                        sm: "1.25rem",
                        md: "1.5rem",
                      },
                      display: "-webkit-box",
                      WebkitLineClamp: { xs: 2, sm: 1 },
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {product.title}
                  </Typography>
                </Link>

                <Typography
                  sx={{
                    color: "text.secondary",
                    mt: 0.5,
                    mb: 1,
                    fontSize: { xs: "0.85rem", sm: "1rem" },
                  }}
                >
                  {product.brand}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    gap: { xs: 1.5, sm: 2 },
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
                      fontSize: { xs: "0.8rem", sm: "0.875rem" },

                      "&:hover": {
                        background: "transparent",
                        color: "error.main",
                      },
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleFavourite(product.id);
                    }}
                  >
                    Save
                  </Button>

                  <Button
                    startIcon={<DeleteOutlineOutlinedIcon />}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      togglecart(product.id);
                    }}
                    sx={{
                      textTransform: "none",
                      color: "text.secondary",
                      p: 0,
                      minWidth: "auto",
                      fontSize: { xs: "0.8rem", sm: "0.875rem" },

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
                flexDirection: { xs: "row", sm: "column" },
                justifyContent: {
                  xs: "space-between",
                  sm: "center",
                },
                alignItems: {
                  xs: "center",
                  sm: "flex-end",
                },
                gap: { xs: 1, sm: 2 },
                width: {
                  xs: "100%",
                  sm: "auto",
                },
                pt: {
                  xs: 1.5,
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
                  width: { xs: "100px", sm: "fit-content" },
                  justifyContent: "center",
                }}
              >
                <IconButton
                  size="small"
                  disabled={cartItem?.quantity === 1}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    decreaseQuantity(product.id);
                  }}
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>

                <Typography
                  sx={{
                    minWidth: 25,
                    textAlign: "center",
                    fontWeight: 500,
                    fontSize: "0.9rem",
                  }}
                >
                  {
                    reducerproducts.cart.find((item) => item.id === product.id)
                      ?.quantity
                  }
                </Typography>

                <IconButton
                  size="small"
                  disabled={cartItem?.quantity === cartItem?.stock}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    increaseQuantity(product.id);
                  }}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Box>

              {/* Price */}
              <Typography
                variant="h5"
                color="primary"
                fontWeight={700}
                sx={{
                  fontSize: {
                    xs: "1.1rem",
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
