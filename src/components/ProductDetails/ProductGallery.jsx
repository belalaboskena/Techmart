import { useState, useEffect } from "react";
import { Box, Paper } from "@mui/material";

function ProductGallery({ product }) {
  const [selectedImage, setSelectedImage] = useState(product?.images[0]);

  const currentImage = selectedImage;

  useEffect(() => {
    if (product?.images[0]) {
      setTimeout(() => {
        setSelectedImage(product?.images[0]);
      }, 0);
    }
  }, [product?.images]);

  if (!product?.images) return null;
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "flex-satrt",
        height: "100%",
      }}
    >
      {/* Thumbnails */}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {product?.images?.map((image, index) => (
          <Paper
            key={index}
            elevation={selectedImage === image ? 5 : 1}
            onClick={() => setSelectedImage(image)}
            sx={{
              width: 70,
              height: 70,
              p: 1,
              cursor: "pointer",
              border:
                selectedImage === image
                  ? "2px solid #1976d2"
                  : "2px solid transparent",
              transition: ".3s",

              "&:hover": {
                borderColor: "#1976d2",
              },
            }}
          >
            <Box
              component="img"
              src={image}
              alt={product.title}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </Paper>
        ))}
      </Box>

      {/* Main Image */}

      <Paper
        elevation={2}
        sx={{
          flex: 1,
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
        }}
      >
        <Box
          component="img"
          src={currentImage}
          alt={product.title}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </Paper>
    </Box>
  );
}

export default ProductGallery;
