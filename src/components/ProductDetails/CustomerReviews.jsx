import { Avatar, Box, Paper, Rating, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

function CustomerReviews({ product }) {
  if (!product?.reviews?.length) return null;

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          textAlign: "center",
        }}
      >
        Customer Reviews
      </Typography>

      <Grid container spacing={2} sx={{ overflow: "visible" }}>
        {product.reviews.map((review, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 4 }}>
            <Paper
              key={index}
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: "#ebebeb",
              }}
            >
              {/* Header */}

              <Stack
                direction="row"
                spacing={2}
                sx={{ mb: 2 }}
              >
                <Stack direction="row" spacing={2} >
                  <Avatar
                    sx={{
                      bgcolor: "primary.main",
                    }}
                  >
                    {review.reviewerName.charAt(0)}
                  </Avatar>

                  <Box>
                    <Typography fontWeight={600}>
                      {review.reviewerName}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {new Date(review.date).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
              <Rating value={review.rating} readOnly />
              {/* Comment */}

              <Typography
                color="text.secondary"
                sx={{
                  lineHeight: 1.8,
                }}
              >
                {review.comment}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CustomerReviews;
