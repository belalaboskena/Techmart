import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import { UseStore } from "../../contexts/storecontext.jsx";
import { useSnackbar } from "notistack";
import HomeLoading from "./HomeLoading.jsx";

import "./Newarrivals.css";

function Newarrivals() {
  const { reducerproducts, dispatch, NewarrivalsIDS } = UseStore();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    async function getProducts() {
      try {
        const responses = await Promise.all(
          NewarrivalsIDS.map((id) =>
            axios.get(`https://dummyjson.com/products/${id}`),
          ),
        );

        setProducts(responses.map((res) => res.data));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, []);

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
  if (loading) {
    return <HomeLoading />;
  }

  return (
    <Container className="newarrivals-body" maxWidth="false">
      <Container maxWidth="lg">
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          sx={{ textAlign: "center" }}
        >
          New Arrivals
        </Typography>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ textAlign: "center", marginBottom: "50px" }}
        >
          Stay ahead of the curve with our newest additions to the TechMart
          collection.
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {products.slice(0, 4).map((product) => (
              <Grid key={product.id} size={{ xs: 12, sm: 6, lg: 3 }}>
                <Link to={`/product/${product.id}`}>
                  <Card className="bestseler-card" sx={{ width: "100%" }}>
                    <CardMedia
                      className="newarrivals-cardMedia"
                      title={product.title}
                    >
                      <img src={product.thumbnail}></img>
                      <div className="patches">
                        <Typography variant="caption" className="newarrivals-patch">
                          NEW
                        </Typography>
                      </div>
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

                      <CardActions
                        sx={{
                          padding: "0px",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {" "}
                        <Typography
                          className="price"
                          gutterBottom
                          variant="h6"
                          component="div"
                          sx={{ margin: "0px" }}
                        >
                          ${product.price}
                        </Typography>
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
            <Link
              to="/shop/new-arrivels"
              style={{
                margin: "auto",
                display: NewarrivalsIDS.length > 4 ? "block" : "none",
              }}
            >
              <Button variant="contained">View More</Button>
            </Link>
          </Grid>
        </Box>
      </Container>
    </Container>
  );
}

export default Newarrivals;
