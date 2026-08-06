import Grid from "@mui/material/Grid";
import { Paper, Typography, Box } from "@mui/material";

import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";

function ProductFeatures({ product }) {
  const features = [
    {
      title: "Category",
      description: product.category,
      icon: <CategoryOutlinedIcon fontSize="large" />,
    },
    {
      title: "Stock",
      description: `${product.stock} Items Available`,
      icon: <Inventory2OutlinedIcon fontSize="large" />,
    },
    {
      title: "Brand",
      description: product.brand,
      icon: <VerifiedOutlinedIcon fontSize="large" />,
    },
  ];

  return (
    <Box >
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          textAlign: "center",
        }}
      >
        Key Features
      </Typography>

      <Grid container spacing={3}>
        {features.map((feature, index) => (
          <Grid key={index} size={{ xs: 12, md: 4 }}>
            <Paper
              elevation={1}
              sx={{
                p: 4,
                height: "100%",
                textAlign: "center",
                borderRadius: 3,
                backgroundColor: "#ebebeb",
              }}
            >
              <Box
                sx={{
                  width: 70,
                  height: 70,
                  margin: "auto",
                  borderRadius: 2,
                  bgcolor: "primary.main",
                  color: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                {feature.icon}
              </Box>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                }}
              >
                {feature.title}
              </Typography>

              <Typography color="text.secondary">
                {feature.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductFeatures;
