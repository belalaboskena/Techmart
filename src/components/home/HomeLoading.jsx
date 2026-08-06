import { Grid, Card, Skeleton, Box } from "@mui/material";
import { Container } from "@mui/material";

function HomeLoading() {
  return (
    <>
      <Container maxWidth="false">
        <Container maxWidth="lg" sx={{ marginBottom: "50px" }}>
          <Skeleton width={250} height={60} sx={{ mx: "auto", mt: 5 }} />

          <Skeleton width={500} height={30} sx={{ mx: "auto", mb: 5 }} />

          <Grid container spacing={3}>
            {[1, 2, 3, 4].map((item) => (
              <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={item}>
                <Card
                  sx={{
                    borderRadius: 3,
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
                      </Box>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Container>
    </>
  );
}
export function SalesLoading() {
  return (
    <>
      <Container className="salles-body" maxWidth="false">
        <Container maxWidth="lg">
          <Skeleton
            width={250}
            height={60}
            sx={{ mx: "auto", mt: 5, backgroundColor: "white" }}
          />

          <Skeleton
            width={500}
            height={30}
            sx={{ mx: "auto", mb: 5, backgroundColor: "white" }}
          />

          <Grid container spacing={3}>
            {[1, 2, 3].map((item) => (
              <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={item}>
                <Card
                  className="salles-card"
                  sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                  }}
                >
                  <Skeleton
                    className="salles-cardMedia"
                    variant="rectangular"
                    width="100%"
                    height={260}
                  />

                  <Box p={2}>
                    <Skeleton width="70%" height={35} />

                    <Skeleton width="35%" height={30} />

                    <Box mt={2} display="flex">
                      <Skeleton width={90} height={30} />

                      <Box display="flex" gap={1}>
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
      </Container>
    </>
  );
}

export default HomeLoading;
