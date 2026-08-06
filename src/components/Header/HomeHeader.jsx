import { AppBar, Toolbar, Button, Container } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const links = [
  {
    title: "Shop",
    id: "shop",
  },
  {
    title: "New Arrivals",
    id: "new-arrivals",
  },
  {
    title: "Best Sellers",
    id: "best-sellers",
  },
  {
    title: "Sales",
    id: "sales",
  },
  {
    title: "About us",
    id: "about-us",
  },
  {
    title: "Support",
    id: "support",
  },
];
function MainHeader() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (!element) return;

    const y = element.getBoundingClientRect().top + window.pageYOffset - 68;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };
  const location = useLocation();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "primary.main",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            justifyContent: "center",
            flexWrap: "wrap",
            gap: {
              xs: 0.5,
              sm: 1,
              md: 2,
            },
            py: 1,
            minHeight: {
              xs: "auto",
              md: 56,
            },
          }}
        >
          {links.map((link) => (
            <Button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              sx={{
                color: "#fff",
                textTransform: "none",
                fontSize: {
                  xs: ".82rem",
                  sm: ".9rem",
                  md: "1rem",
                },
                fontWeight: 500,
                borderBottom: "2px solid transparent",
                borderRadius: 0,
                px: {
                  xs: 1,
                  sm: 1.5,
                  md: 2,
                },
                minWidth: "fit-content",
                whiteSpace: "nowrap",

                "&:hover": {
                  bgcolor: "transparent",
                  borderBottom: "2px solid #fff",
                },
              }}
            >
              {link.title}
            </Button>
          ))}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default MainHeader;
