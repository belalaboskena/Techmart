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
    <Container maxWidth="lg" sx={{ marginBottom: "100px", paddingTop: "25px" }}>
      <Typography
        gutterBottom
        variant="h4"
        component="div"
        sx={{ textAlign: "center", marginBottom: "50px" }}
      >
        Shop by Category
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, lg: 8, md: 8 }}>
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

                <Link to="/shop/tech">
                  <Typography variant="h6">View More</Typography>
                </Link>
              </div>
              <img className="techimg" src={`${import.meta.env.BASE_URL}img/Tech.png`} />
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 4, md: 4 }}>
            <Paper className="paper" sx={{ p: 2, textAlign: "center" }}>
              <div className="content" style={{ left: "20px", top: "20px" }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Watches
                </Typography>
                <Link to="/shop/mens-watches">
                  <Typography variant="h6">View More</Typography>
                </Link>
              </div>
              <img className="watchesimg"src={`${import.meta.env.BASE_URL}img/Watches.png`} />
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 4, md: 4 }}>
            <Paper className="paper" sx={{ p: 2, textAlign: "center" }}>
              <div className="content" style={{ left: "20px", bottom: "20px" }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Sunglasses
                </Typography>
                <Link to="/shop/sunglasses">
                  <Typography variant="h6">View More</Typography>
                </Link>
              </div>
              <img className="sunglassesimg" src={`${import.meta.env.BASE_URL}img/Sunglasses.png`} />
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 8, md: 8 }}>
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
                <Link to="/shop/mobile-accessories">
                  <Typography variant="h6">View More</Typography>
                </Link>
              </div>

              <img className="accessoriesimg" src={`${import.meta.env.BASE_URL}img/Accessories2.png`} />
            </Paper>
          </Grid>

          <Link to="/shop/shop-all" style={{ margin: "auto" }}>
            <Button variant="contained">Shop all</Button>
          </Link>
        </Grid>
      </Box>
    </Container>
  );
}
