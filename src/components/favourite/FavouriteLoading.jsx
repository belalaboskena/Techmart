import { Grid, Card, Skeleton, Box } from "@mui/material";
import MainHeader from "../Header/MainHeader";
import { Container } from "@mui/material";

function FavouriteLoading() {
  return (
    <>
      <MainHeader />
      <Container maxWidth="lg" sx={{ marginBottom: "50px" }}>
        <Skeleton width={250} height={60} sx={{ mx: "auto", mt: 5 }} />

        <Skeleton width={500} height={30} sx={{ mx: "auto", mb: 5 }} />

        <Grid container spacing={3}>
          {[1, 2, 3, 4].map((item) => (
            <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={item}>
              <Card
                sx={{
                  borderRadius: 1,
                  overflow: "hidden",
                }}
              >
                <Skeleton variant="rectangular" width="100%" height={260} />

                <Box p={2}>
                  <Skeleton width="70%" height={35} />

                  <Skeleton width="35%" height={30} />

                  <Box mt={2} display="flex">
                    <Skeleton width={90} height={30} />

                    <Box display="flex" gap={1}>
                      <Skeleton variant="circular" width={30} height={30} />
                      <Skeleton variant="circular" width={30} height={30} />
                      <Skeleton variant="circular" width={30} height={30} />
                    </Box>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default FavouriteLoading;
