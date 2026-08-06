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
import Button from "@mui/material/Button";
import { SalesLoading } from "./HomeLoading";

import "./salles.css";

function Salles() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const ids = [104, 109, 106];
  useEffect(() => {
    async function getProducts() {
      try {
        const responses = await Promise.all(
          ids.map((id) => axios.get(`https://dummyjson.com/products/${id}`)),
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
  if (loading) {
    return <SalesLoading />;
  }

  return (
    <Container className="salles-body" maxWidth="false">
      <Container maxWidth="lg">
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          sx={{ textAlign: "center" }}
        >
          Exclusive Clearance Sale
        </Typography>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ textAlign: "center", marginBottom: "50px" }}
        >
          Limited time offers on premium tech accessories. Up to 60% Off!
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid key={product.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                <Card className="salles-card" sx={{ width: "100%" }}>
                  <CardMedia className="salles-cardMedia" title={product.title}>
                    <img src={product.thumbnail}></img>
                    <Typography
                      variant="caption"
                      className="discountPercentage"
                    >
                      SALE -{parseInt(product.discountPercentage)}%
                    </Typography>
                  </CardMedia>
                  <CardContent className="salles-cardcontent">
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 1,
                        overflow: "hidden",
                        textAlign: "center",
                      }}
                    >
                      {product.title}
                    </Typography>
                    <div className="salles-price">
                      <Typography
                        className="old-price"
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{ textAlign: "center" }}
                      >
                        ${product.price}
                      </Typography>
                      <Typography
                        className="new-price"
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{ textAlign: "center" }}
                      >
                        $
                        {(
                          product.price -
                          (product.price * product.discountPercentage) / 100
                        ).toFixed(2)}
                      </Typography>
                    </div>

                    <CardActions
                      sx={{
                        padding: "0px",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Link
                        to={`/product/${product.id}`}
                        className="salles-btn"
                      >
                        <Button className="salles-btn" variant="contained">
                          Cliam offer
                        </Button>
                      </Link>
                    </CardActions>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Container>
  );
}

export default Salles;
