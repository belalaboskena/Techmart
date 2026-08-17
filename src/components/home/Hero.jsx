// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Container from "@mui/material/Container";

import "./hero.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { Button, Typography } from "@mui/material";

export default function Slider() {
  const slides = [
    {
      title: "Discover the Latest Tech",
      img: `${import.meta.env.BASE_URL}img/Hero 1.png`,
      id: "shop",
    },
    {
      title: "Premium Collection",
      img: `${import.meta.env.BASE_URL}img/Hero 3.png`,
      id: "best-sellers",
    },
    {
      title: "Summer Sale",
      img: `${import.meta.env.BASE_URL}img/Hero 2.png`,
      id: "sales",
    },
  ];
  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (!element) return;

    const y = element.getBoundingClientRect().top + window.pageYOffset - 68;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };
  return (
    <Container
      maxWidth="lg"
      sx={{
        height: { xs: "270px", sm: "450px", md: "570px" },
        marginBottom: "25px",
      }}
    >
      <Swiper
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide>
            <div className="content">
              <Typography
                sx={{
                  fontSize: {
                    xs: "1rem",
                    sm: "2rem",
                    md: "2.5rem",
                  },
                  fontWeight: 1000,
                  marginBottom: { xs: "10px", md: "20px" },
                  color: "white",
                }}
              >
                {slide.title}
              </Typography>

              <Button
                onClick={() => scrollToSection(slide.id)}
                variant="contained"
                sx={{
                  fontSize: {
                    xs: "0.7rem",
                    md: "1rem",
                  },
                }}
              >
                Shop now
              </Button>
            </div>
            <img src={slide.img} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}
