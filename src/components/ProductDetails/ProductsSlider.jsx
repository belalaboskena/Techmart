import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
//import card component
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "./productSlider.css";
// import required modules
import { Navigation, FreeMode, Pagination, Mousewheel } from "swiper/modules";
// ========
import { UseStore } from "../../contexts/storecontext";
import { useSnackbar } from "notistack";

export default function ProductsSlider({ product }) {
  const [products, setproducts] = useState([]);
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
    axios
      .get(`https://dummyjson.com/products/category/${product.category}`)
      .then((response) => {
        setproducts(response.data.products);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [product]);

  return (
    <>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            textAlign: "center",
          }}
        >
          Related Products
        </Typography>
        <Swiper
          spaceBetween={30}
          freeMode={true}
          mousewheel={{
            forceToAxis: true,
            releaseOnEdges: true,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            600: {
              slidesPerView: 2,
            },
            900: {
              slidesPerView: 3,
            },
          }}
          modules={[Navigation, FreeMode, Pagination, Mousewheel]}
          className="mySwiper-2"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <Link to={`/product/${product.id}`}>
                <Card
                  className="slider-card"
                  sx={{ Width: "100%", borderRadius: "18px" }}
                >
                  <div
                    style={{
                      paddingTop: "8px",
                      display: "flex",
                      height: "fit-content",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img src={product.thumbnail} />
                  </div>
                  <CardContent>
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
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        overflow: "hidden",
                      }}
                    >
                      {product.description}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{
                      padding: " 10px 16px",
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
                </Card>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </>
  );
}
