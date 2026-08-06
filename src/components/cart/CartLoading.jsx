import { Grid, Card, Skeleton, Box } from "@mui/material";
import { Container } from "@mui/material";

function CartLoading() {
  return (
    <>
      <Container maxWidth="lg" sx={{ marginBottom: "50px" }}>
        <Grid container spacing={4}>
          {/* Cart Items */}
          <Grid size={{ xs: 12, lg: 12 }}>
            {[1, 2, 3].map((item) => (
              <Card
                key={item}
                elevation={2}
                sx={{
                  p: 3,
                  mb: 3,
                  borderRadius: 3,
                  bgcolor: "#ebebeb",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Skeleton
                    variant="rounded"
                    width={120}
                    height={120}
                    sx={{ flexShrink: 0 }}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                    }}
                  >
                    <Skeleton variant="text" width={80} height={35} />
                    <Skeleton variant="text" width={50} height={25} />
                    <Skeleton variant="text" width={200} height={25} />
                  </Box>
                </Box>
              </Card>
            ))}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default CartLoading;
