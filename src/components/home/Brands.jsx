import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";
function Brands() {
  const brands = ["APPLE", "SANSUNG", "BOSE", "LOGITECH", "SONY", "HONOR"];
  return (
    <Container maxWidth="lg" sx={{ marginBottom: "50px" }}>
      <Typography
        gutterBottom
        variant="h6"
        component="div"
        sx={{ textAlign: "center", marginBottom: "50px" }}
      >
        Trusted by Global Brands
      </Typography>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {brands.map((brand, index) => (
            <Grid
              key={index}
              size={{ xs: 4, sm: 6, lg: 2 }}
              sx={{ margin: "auto" }}
            >
              <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                sx={{ textAlign: "center" }}
              >
                {brand}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default Brands;
