import { AppBar, Toolbar, Button, Container, Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";

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
    title: "Contact",
    id: "contact",
  },
];

function MainHeader() {
  const sliderRef = useRef(null);
  const animationRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);

  const positionRef = useRef(0);
  const startXRef = useRef(0);
  const startPositionRef = useRef(0);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (!element) return;

    const y = element.getBoundingClientRect().top + window.pageYOffset - 68;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };

  // Automatic movement
  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    const animate = () => {
      if (!isDragging) {
        positionRef.current -= 0.3;

        const halfWidth = slider.scrollWidth / 2;

        if (Math.abs(positionRef.current) >= halfWidth) {
          positionRef.current = 0;
        }

        slider.style.transform = `translateX(${positionRef.current}px)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [isDragging]);

  // Start dragging
  const handlePointerDown = (e) => {
    setIsDragging(true);

    startXRef.current = e.clientX;
    startPositionRef.current = positionRef.current;

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  // Dragging
  const handlePointerMove = (e) => {
    if (!isDragging) return;

    const difference = e.clientX - startXRef.current;

    let newPosition = startPositionRef.current + difference;

    const halfWidth = sliderRef.current.scrollWidth / 2;

    // Prevent dragging too far
    if (newPosition > 0) {
      newPosition = 0;
    }

    if (newPosition < -halfWidth) {
      newPosition = -halfWidth;
    }

    positionRef.current = newPosition;

    sliderRef.current.style.transform = `translateX(${newPosition}px)`;
  };

  // Stop dragging
  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "primary.main",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            justifyContent: "center",
            flexWrap: "wrap",
            gap: {
              xs: 0,
              sm: 1,
              md: 2,
            },
            py: 1,
            minHeight: {
              xs: "auto",
              md: 56,
            },
            overflow: "hidden",
          }}
        >
          {/* Mobile Slider */}
          <Box
            sx={{
              display: {
                xs: "block",
                sm: "none",
              },
              width: "100%",
              overflow: "hidden",
              cursor: isDragging ? "grabbing" : "grab",
              touchAction: "pan-y",
              userSelect: "none",
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onPointerLeave={(e) => {
              if (isDragging) {
                handlePointerUp();
              }
            }}
          >
            <Box
              ref={sliderRef}
              sx={{
                display: "flex",
                width: "max-content",
              }}
            >
              {/* First set */}
              <Box
                sx={{
                  display: "flex",
                  flexShrink: 0,
                  gap: 0.5,
                }}
              >
                {links.map((link) => (
                  <Button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    sx={{
                      color: "#fff",
                      textTransform: "none",
                      fontSize: ".82rem",
                      fontWeight: 500,
                      borderBottom: "2px solid transparent",
                      borderRadius: 0,
                      px: 1,
                      minWidth: "fit-content",
                      whiteSpace: "nowrap",

                     
                    }}
                  >
                    {link.title}
                  </Button>
                ))}
              </Box>

              {/* Second set */}
              <Box
                sx={{
                  display: "flex",
                  flexShrink: 0,
                  gap: 0.5,
                }}
              >
                {links.map((link) => (
                  <Button
                    key={`second-${link.id}`}
                    onClick={() => scrollToSection(link.id)}
                    sx={{
                      color: "#fff",
                      textTransform: "none",
                      fontSize: ".82rem",
                      fontWeight: 500,
                      borderBottom: "2px solid transparent",
                      borderRadius: 0,
                      px: 1,
                      minWidth: "fit-content",
                      whiteSpace: "nowrap",

                     
                    }}
                  >
                    {link.title}
                  </Button>
                ))}
              </Box>
            </Box>
          </Box>

          {/* Tablet + Laptop */}
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "flex",
              },
              justifyContent: "center",
              flexWrap: "wrap",
              gap: {
                sm: 1,
                md: 2,
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
                    sm: ".9rem",
                    md: "1rem",
                  },
                  fontWeight: 500,
                  borderBottom: "2px solid transparent",
                  borderRadius: 0,
                  px: {
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
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default MainHeader;
