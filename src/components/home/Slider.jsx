// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Container from "@mui/material/Container";

import "./slider.css";

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
      img: "../../../React Ecommerce Reda Tech/img/Hero 1.png",
      id: "shop",
    },
    {
      title: "Premium Collection",
      img: "../../../React Ecommerce Reda Tech/img/Hero 3.png",
      id: "best-sellers",
    },
    {
      title: "Summer Sale",
      img: "../../../React Ecommerce Reda Tech/img/Hero 2.png",
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
    <Container maxWidth="lg" sx={{ height: "600px", marginBottom: "25px" }}>
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
                variant="h4"
                sx={{
                  fontWeight: 1000,
                  mb: 3,
                  color: "white",
                }}
              >
                {slide.title}
              </Typography>

              <Button
                onClick={() => scrollToSection(slide.id)}
                variant="contained"
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
