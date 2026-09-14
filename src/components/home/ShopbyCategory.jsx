import "./shopcategory.css";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function ShopbyCategory() {
  return (
    <Container maxWidth="lg" sx={{ marginBottom: "50px", paddingTop: "25px" }}>
      <Typography
        gutterBottom
        component="div"
        sx={{
          textAlign: "center",
          marginBottom: "50px",
          fontWeight: 500,
          fontSize: {
            xs: "1.7rem",
            md: "2rem",
          },
        }}
      >
        Shop by Category
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, lg: 8, md: 8 }}>
            <Link to="/shop/tech">
              <Paper className="paper" sx={{ p: 2, textAlign: "center" }}>
                <div
                  className="content"
                  style={{
                    left: "20px",
                    top: "20px",
                  }}
                >
                  <div className="title">
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      Tech
                    </Typography>
                    <Typography variant="caption">
                      Smartphones, Tablets, Laptops
                    </Typography>
                  </div>

                  <Typography variant="h6">View More</Typography>
                </div>
                <img
                  className="techimg"
                  src={`${import.meta.env.BASE_URL}img/Tech.png`}
                />
              </Paper>
            </Link>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 4, md: 4 }}>
            {" "}
            <Link to="/shop/mens-watches">
              <Paper className="paper" sx={{ p: 2, textAlign: "center" }}>
                <div className="content" style={{ left: "20px", top: "20px" }}>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    Watches
                  </Typography>
                  <Typography variant="h6">View More</Typography>
                </div>
                <img
                  className="watchesimg"
                  src={`${import.meta.env.BASE_URL}img/Watches.png`}
                />
              </Paper>{" "}
            </Link>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 4, md: 4 }}>
            {" "}
            <Link to="/shop/sunglasses">
              <Paper className="paper" sx={{ p: 2, textAlign: "center" }}>
                <div
                  className="content"
                  style={{ left: "20px", bottom: "20px" }}
                >
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    Sunglasses
                  </Typography>
                  <Typography variant="h6">View More</Typography>
                </div>
                <img
                  className="sunglassesimg"
                  src={`${import.meta.env.BASE_URL}img/Sunglasses.png`}
                />
              </Paper>{" "}
            </Link>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 8, md: 8 }}>
            {" "}
            <Link to="/shop/mobile-accessories">
              <Paper className="paper" sx={{ p: 2, textAlign: "center" }}>
                <div
                  className="content"
                  style={{
                    left: "20px",
                    top: "20px",
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    Mobile Accessories
                  </Typography>{" "}
                  <Typography variant="h6">View More</Typography>
                </div>

                <img
                  className="accessoriesimg"
                  src={`${import.meta.env.BASE_URL}img/Accessories2.png`}
                />
              </Paper>{" "}
            </Link>
          </Grid>

          <Link to="/shop/shop-all" style={{ margin: "auto" }}>
            <Button variant="contained">Shop all</Button>
          </Link>
        </Grid>
      </Box>
    </Container>
  );
}
