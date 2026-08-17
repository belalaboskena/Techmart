import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function ScrollToHero() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToHero = () => {
    const hero = document.getElementById("hero");
    console.log(hero);

    if (hero) {
      hero.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  if (!show) return null;

  return (
    <IconButton
      onClick={scrollToHero}
      sx={{
        position: "fixed",
        bottom: 25,
        right: 25,
        zIndex: 9999,
        bgcolor: "primary.main",
        color: "white",

        "&:hover": {
          bgcolor: "primary.dark",
        },
      }}
    >
      <KeyboardArrowUpIcon />
    </IconButton>
  );
}

export default ScrollToHero;
