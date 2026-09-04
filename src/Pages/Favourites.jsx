import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
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

function Favourites() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    reducerproducts,
    NewarrivalsIDS,
    BestsellersIDS,
    SallesIDS,
    togglecart,
    toggleFavourite,
  } = UseStore();

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });

    let ignore = false;

    const fetchFavouriteProducts = async () => {
      setLoading(true);

      const favouriteIds = reducerproducts.favourites || [];

      if (favouriteIds.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      try {
        const responses = await Promise.all(
          favouriteIds.map((id) =>
            axios.get(`https://dummyjson.com/products/${id}`),
          ),
        );

        if (!ignore) {
          setProducts(responses.map((response) => response.data));
        }
      } catch (error) {
        if (!ignore) {
          console.error("Error fetching favourite products:", error);
          setProducts([]);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchFavouriteProducts();

    return () => {
      ignore = true;
    };
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
                      <div className="patches">
                        <Typography
                          variant="caption"
                          className="newarrivals-patch"
                          sx={{
                            display: NewarrivalsIDS.includes(product.id)
                              ? "block"
                              : "none",
                          }}
                        >
                          NEW
                        </Typography>
                        <Typography
                          variant="caption"
                          className="bestseller-patch"
                          sx={{
                            display: BestsellersIDS.includes(product.id)
                              ? "block"
                              : "none",
                          }}
                        >
                          BEST SELLER
                        </Typography>
                        <Typography
                          variant="caption"
                          className="sales-patch"
                          sx={{
                            display: SallesIDS.includes(product.id)
                              ? "block"
                              : "none",
                          }}
                        >
                          SALE -{parseInt(product.discountPercentage)}%
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
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <Typography
                          className="price"
                          gutterBottom
                          variant="h6"
                          component="div"
                        >
                          $
                          {SallesIDS.includes(product.id)
                            ? (
                                product.price -
                                (product.price * product.discountPercentage) /
                                  100
                              ).toFixed(2)
                            : product.price}
                        </Typography>
                        <Typography
                          className="old-price"
                          gutterBottom
                          variant="subtitle1"
                          component="div"
                          sx={{
                            textAlign: "center",
                            visibility: SallesIDS.includes(product.id)
                              ? "visible"
                              : "hidden",
                          }}
                        >
                          ${product.price}
                        </Typography>
                      </div>
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
