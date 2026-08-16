import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import ProductGallery from "../components/ProductDetails/ProductGallery";
import ProductInfo from "../components/ProductDetails/ProductInfo";
import ProductFeatures from "../components/ProductDetails/ProductFeatures";
import TechnicalSpecifications from "../components/ProductDetails/TechnicalSpecifications";
import CustomerReviews from "../components/ProductDetails/CustomerReviews";
import ProductsSlider from "../components/ProductDetails/ProductsSlider";
import MainHeader from "../components/Header/MainHeader";

function ProductDetails() {
  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch(console.error)
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <>
        <MainHeader />
        <Container maxWidth="lg" sx={{ py: 5 }}>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Skeleton variant="rounded" width="100%" height={500} />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Skeleton width="60%" height={50} />
              <Skeleton width="40%" height={30} />

              <Skeleton width="30%" height={45} sx={{ mt: 2 }} />

              <Skeleton
                variant="rounded"
                width="100%"
                height={120}
                sx={{ mt: 3 }}
              />

              <Skeleton
                variant="rounded"
                width="100%"
                height={50}
                sx={{ mt: 3 }}
              />
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }

  return (
    <>
      <MainHeader />
      <Container
        className="newarrivals-body"
        maxWidth="false"
        sx={{ marginBottom: "50px" }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 7 }}>
              <ProductGallery product={product} />
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              <ProductInfo product={product} />
            </Grid>
          </Grid>
        </Container>
      </Container>
      {/* ============ */}
      <Container maxWidth="lg" sx={{ mb: "50px" }}>
        <ProductFeatures product={product} />
      </Container>
      {/* ============= */}
      <Container
        className="newarrivals-body"
        maxWidth="false"
        sx={{ marginBottom: "50px" }}
      >
        <Container maxWidth="lg">
          <TechnicalSpecifications product={product} />
        </Container>
      </Container>
      {/* ============= */}
      <Container maxWidth="lg" sx={{ mb: "50px" }}>
        <CustomerReviews product={product} />
      </Container>
      {/* ============== */}
      <Container className="newarrivals-body" maxWidth="false">
        <ProductsSlider product={product} />
      </Container>
    </>
  );
}

export default ProductDetails;
