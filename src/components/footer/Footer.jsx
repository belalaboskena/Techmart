import React from "react";
import "./Fotter.css";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <Container className="fotter-body" maxWidth="false">
      <Container maxWidth="lg">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={5}>
            <Grid size={{ xs: 12, sm: 6, lg: 3 }} sx={{ margin: "0px auto" }}>
              <div className="fotter-box">
                <Typography gutterBottom variant="h6" component="div">
                  TechMart
                </Typography>
                <Typography gutterBottom variant="caption" component="div">
                  Your destination for premium gaming and office hardware.
                  Engineered for performance, designed for style.
                </Typography>
                <CardActions className="footer-cardaction" disableSpacing>
                  <IconButton className="iconbtn">
                    <LinkedInIcon className="icon" />
                  </IconButton>
                  <IconButton className="iconbtn">
                    <GitHubIcon className="icon" />
                  </IconButton>
                  <IconButton className="iconbtn">
                    <WhatsAppIcon className="icon" />
                  </IconButton>
                </CardActions>
              </div>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 3 }} sx={{ margin: "0px auto" }}>
              <div className="fotter-box">
                <Link to="/shop/shop-all">
                  <Typography gutterBottom variant="h6" component="div">
                    Shop
                  </Typography>
                </Link>
                <List className="list">
                  <ListItem className="listitem">
                    <Link to="/shop/tech">Tech</Link>
                  </ListItem>
                  <ListItem className="listitem">
                    <Link to="/shop/mobile-accessories">Accessories</Link>
                  </ListItem>
                  <ListItem className="listitem">
                    <Link to="/shop/mens-watches">Watches</Link>
                  </ListItem>
                  <ListItem className="listitem">
                    <Link to="/shop/sunglasses">Sunglasses</Link>
                  </ListItem>
                </List>
              </div>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 3 }} sx={{ margin: "0px auto" }}>
              <div className="fotter-box">
                <Typography gutterBottom variant="h6" component="div">
                  Support
                </Typography>
                <List className="list">
                  <ListItem className="listitem">
                    <Link to="">Contact Us</Link>
                  </ListItem>
                  <ListItem className="listitem">
                    <Link to="">Warranty Info</Link>
                  </ListItem>
                  <ListItem className="listitem">
                    <Link to="">Track Order</Link>
                  </ListItem>
                  <ListItem className="listitem">
                    <Link to="">FAQ</Link>
                  </ListItem>
                </List>
              </div>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 3 }} sx={{ margin: "0px auto" }}>
              <div className="fotter-box">
                <Typography gutterBottom variant="h6" component="div">
                  Newsletter
                </Typography>
                <Typography gutterBottom variant="caption" component="div">
                  Join the club for early access to sales and new product drops.
                </Typography>
                <Box className="newsletter">
                  <TextField
                    placeholder="Email"
                    variant="outlined"
                    fullWidth
                    size="small"
                    className="newsletter-input"
                  />

                  <Button variant="contained" className="newsletter-btn">
                    Join
                  </Button>
                </Box>
              </div>
            </Grid>
          </Grid>
        </Box>
        <div className="Privacy">
          <Typography gutterBottom variant="caption" component="div">
            © 2026 TechMart. All rights reserved.
          </Typography>
          <div className="right-Privacy">
            <Typography gutterBottom variant="caption" component="div">
              Privacy Policy
            </Typography>
            <Typography gutterBottom variant="caption" component="div">
              Terms of Service
            </Typography>
          </div>
        </div>
      </Container>
    </Container>
  );
}

export default Footer;
