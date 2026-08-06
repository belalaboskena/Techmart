import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Rating from "@mui/material/Rating";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import EmptyFavourite from "../components/favourite/Emptyfavourite";
import FavouriteLoading from "../components/favourite/FavouriteLoading.jsx";
import { UseStore } from "../contexts/storecontext.jsx";
import MainHeader from "../components/Header/MainHeader.jsx";
import { useSnackbar } from "notistack";

function Favourites() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
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
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
    const favouriteIds =
      JSON.parse(localStorage.getItem("favouriteproducts")) || [];

    Promise.all(
      favouriteIds.map((id) =>
        axios.get(`https://dummyjson.com/products/${id}`),
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
  }, [reducerproducts.favourites]);

  if (loading) {
    return <FavouriteLoading />;
  }
  if (reducerproducts.favourites.length === 0) {
    return (
      <>
        <MainHeader />
        <EmptyFavourite />
      </>
    );
  }

  return (
    <>
      <MainHeader />

      <Container maxWidth="lg" sx={{ padding: "50px" }}>
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          sx={{ textAlign: "center" }}
        >
          Wishlist
        </Typography>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ textAlign: "center", marginBottom: "50px" }}
        >
          Keep track of the products you love. Browse your saved items and shop
          them anytime.
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid key={product.id} size={{ xs: 12, sm: 6, lg: 3 }}>
                <Link to={`/product/${product.id}`}>
                  <Card className="bestseler-card" sx={{ width: "100%" }}>
                    <CardMedia
                      className="bestseler-cardMedia"
                      title={product.title}
                    >
                      <img src={product.thumbnail}></img>
                    </CardMedia>
                    <CardContent className="bestseler-cardcontent">
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 1,
                          overflow: "hidden",
                        }}
                      >
                        {product.title}
                      </Typography>
                      <Typography
                        className="price"
                        gutterBottom
                        variant="h6"
                        component="div"
                      >
                        ${product.price}
                      </Typography>
                      <CardActions
                        sx={{
                          padding: "0px",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Rating
                          name="read-only"
                          value={parseInt(product.rating)}
                          readOnly
                        />
                        <div className="icons">
                          <IconButton
                            className="iconbutton"
                            size="small"
                            aria-label="show 17 new notifications"
                            color="inherit"
                            onClick={(e) => {
                              togglecart(
                                product.id,
                                product.weight,
                                product.price,
                                product.stock,
                              );
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                          >
                            {reducerproducts.cart.some(
                              (item) => item.id === product.id,
                            ) ? (
                              <ShoppingCartIcon color="primary" />
                            ) : (
                              <ShoppingCartOutlinedIcon />
                            )}
                          </IconButton>
                          <IconButton
                            className="iconbutton"
                            size="small"
                            aria-label="show 17 new notifications"
                            color="inherit"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleFavourite(product.id);
                            }}
                          >
                            {reducerproducts.favourites.includes(product.id) ? (
                              <FavoriteIcon color="error" />
                            ) : (
                              <FavoriteBorderOutlinedIcon />
                            )}
                          </IconButton>
                        </div>
                      </CardActions>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default Favourites;
