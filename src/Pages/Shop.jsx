import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
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
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MainHeader from "../components/Header/MainHeader";
import { UseStore } from "../contexts/storecontext";
import FavouriteLoading from "../components/favourite/FavouriteLoading";

function Shop() {
  const {
    reducerproducts,
    NewarrivalsIDS,
    BestsellersIDS,
    SallesIDS,
    togglecart,
    toggleFavourite,
  } = UseStore();
  const [loading, setLoading] = useState(true);
  const [products, setproducts] = useState([]);
  const { category } = useParams();

  const categoriesInfo = {
    "shop-all": {
      title: "shop",
      description: "Browse our latest products.",
    },
    tech: {
      title: "Tech",
      description:
        "Explore our latest collection of smartphones, laptops, and tablets designed for every lifestyle.",
    },

    "mobile-accessories": {
      title: "Mobile Accessories",
      description:
        "Upgrade your mobile experience with high-quality accessories designed for protection, convenience, and performance.",
    },

    "mens-watches": {
      title: "Watches",
      description:
        "Stay connected with stylish smart watches featuring fitness tracking and smart notifications.",
    },

    sunglasses: {
      title: "Sunglasses",
      description:
        "Protect your eyes with premium sunglasses designed for comfort and style.",
    },
    "best-sellers": {
      title: "Best Sellers",
      description:
        "Our most loved products, rated for excellence and performance by the TechMart community.",
    },
    "new-arrivels": {
      title: "New Arrivels",
      description:
        "Stay ahead of the curve with our newest additions to the TechMart collection.",
    },
    sales: {
      title: "Exclusive Clearance Sale",
      description:
        "Limited time offers on premium tech accessories. Up to 60% Off!",
    },
  };
  const info = categoriesInfo[category] || {
    title: "Shop",
    description: "Browse our latest products.",
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
    if (category === "shop-all") {
      Promise.all([
        axios.get("https://dummyjson.com/products/category/smartphones"),
        axios.get("https://dummyjson.com/products/category/laptops"),
        axios.get("https://dummyjson.com/products/category/tablets"),
        axios.get("https://dummyjson.com/products/category/mobile-accessories"),
        axios.get("https://dummyjson.com/products/category/mens-watches"),
        axios.get("https://dummyjson.com/products/category/sunglasses"),
      ])
        .then(
          ([phones, laptops, tablets, accessories, watches, sunglasses]) => {
            setproducts([
              ...phones.data.products,
              ...laptops.data.products,
              ...tablets.data.products,
              ...accessories.data.products,
              ...watches.data.products,
              ...sunglasses.data.products,
            ]);
          },
        )
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (category === "tech") {
      Promise.all([
        axios.get("https://dummyjson.com/products/category/smartphones"),
        axios.get("https://dummyjson.com/products/category/laptops"),
        axios.get("https://dummyjson.com/products/category/tablets"),
      ])
        .then(([phones, laptops, tablets]) => {
          setproducts([
            ...phones.data.products,
            ...laptops.data.products,
            ...tablets.data.products,
          ]);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (category === "best-sellers") {
      Promise.all(
        BestsellersIDS.map((id) =>
          axios.get(`https://dummyjson.com/products/${id}`),
        ),
      )
        .then((responses) => {
          const products = responses.map((response) => response.data);

          setproducts(products);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (category === "new-arrivels") {
      Promise.all(
        NewarrivalsIDS.map((id) =>
          axios.get(`https://dummyjson.com/products/${id}`),
        ),
      )
        .then((responses) => {
          const products = responses.map((response) => response.data);

          setproducts(products);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (category === "sales") {
      Promise.all(
        SallesIDS.map((id) =>
          axios.get(`https://dummyjson.com/products/${id}`),
        ),
      )
        .then((responses) => {
          const products = responses.map((response) => response.data);

          setproducts(products);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      axios
        .get(`https://dummyjson.com/products/category/${category}`)
        .then((response) => {
          setproducts(response.data.products);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [category, NewarrivalsIDS, BestsellersIDS, SallesIDS]);

  if (loading) {
    return <FavouriteLoading />;
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
          {info.title}
        </Typography>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ textAlign: "center", marginBottom: "50px" }}
        >
          {info.description}
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
                          {" "}
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

export default Shop;
