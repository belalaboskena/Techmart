import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";

import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import KeyboardReturnOutlinedIcon from "@mui/icons-material/KeyboardReturnOutlined";
import "./whychosseus.css";
function WhyChosseUs() {
  const advantages = [
    {
      icon: <LocalShippingOutlinedIcon sx={{ fontSize: 40 }} />,
      title: "Free Shipping",
      description: "On all orders over $100",
    },
    {
      icon: <ShieldOutlinedIcon sx={{ fontSize: 40 }} />,
      title: "Secure Payment",
      description: "100% protected payments",
    },
    {
      icon: <SupportAgentOutlinedIcon sx={{ fontSize: 40 }} />,
      title: "24/7 Support",
      description: "Dedicated expert help",
    },
    {
      icon: <KeyboardReturnOutlinedIcon sx={{ fontSize: 40 }} />,
      title: "Easy Returns",
      description: "30-day return policy",
    },
  ];

  return (
    <Container
      className="whychosseus-body"
      maxWidth="false"
      sx={{ marginBottom: "50px" }}
    >
      <Container maxWidth="lg">
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          sx={{ textAlign: "center", marginBottom: "50px" }}
        >
          Why Choose Us{" "}
        </Typography>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {advantages.map((advantage, index) => (
              <Grid
                key={index}
                size={{ xs: 6, sm: 6, lg: 3 }}
                sx={{
                  margin: "auto",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div className="icons-div"> {advantage.icon}</div>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{ textAlign: "center" }}
                >
                  {advantage.title}
                </Typography>
                <Typography
                  gutterBottom
                  variant="caption"
                  component="div"
                  sx={{ textAlign: "center" }}
                >
                  {advantage.description}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Container>
  );
}

export default WhyChosseUs;
