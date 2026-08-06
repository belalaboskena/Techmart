import {
  Box,
  Typography,
  InputBase,
  Paper,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import axios from "axios";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 30,
  backgroundColor: "#f5f5f5",
  "&:hover": {
    backgroundColor: "#ededed",
  },
  width: "100%",
  maxWidth: "450px",
}));

const SearchIconWrapper = styled("div")({
  position: "absolute",
  height: "100%",
  width: 50,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: "none",
});

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: "12px 12px 12px 50px",
  },
}));
function SearchBar() {
  const [search, setSearch] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return [];

    return allProducts
      .filter((product) => product.title.toLowerCase().startsWith(query))
      .slice(0, 6);
  }, [search, allProducts]);

  useEffect(() => {
    let mounted = true;

    Promise.all([
      axios.get("https://dummyjson.com/products/category/smartphones"),
      axios.get("https://dummyjson.com/products/category/laptops"),
      axios.get("https://dummyjson.com/products/category/tablets"),
      axios.get("https://dummyjson.com/products/category/mobile-accessories"),
      axios.get("https://dummyjson.com/products/category/mens-watches"),
      axios.get("https://dummyjson.com/products/category/sunglasses"),
    ])
      .then(([phones, laptops, tablets, accessories, watches, sunglasses]) => {
        if (!mounted) return;

        setAllProducts([
          ...phones.data.products,
          ...laptops.data.products,
          ...tablets.data.products,
          ...accessories.data.products,
          ...watches.data.products,
          ...sunglasses.data.products,
        ]);
      })
      .catch(console.error);

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <ClickAwayListener
      onClickAway={() => {
        setSearch("");
      }}
    >
      <Search
        sx={{
          position: "relative",
        }}
      >
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>

        <StyledInputBase
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
        />

        {search.trim() && (
          <Paper
            elevation={4}
            sx={{
              position: "absolute",
              top: "110%",
              left: 0,
              right: 0,
              borderRadius: 2,
              overflow: "hidden",
              zIndex: 1000,
            }}
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Box
                  key={product.id}
                  component={Link}
                  to={`/product/${product.id}`}
                  onClick={() => {
                    setSearch("");
                  }}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 1.5,
                    textDecoration: "none",
                    color: "inherit",

                    "&:hover": {
                      bgcolor: "#f5f5f5",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={product.thumbnail}
                    alt={product.title}
                    sx={{
                      width: 50,
                      height: 50,
                      objectFit: "contain",
                    }}
                  />

                  <Box sx={{ flexGrow: 1 }}>
                    <Typography noWrap fontWeight={500}>
                      {product.title}
                    </Typography>

                    <Typography color="primary">${product.price}</Typography>
                  </Box>
                </Box>
              ))
            ) : (
              <Typography
                sx={{
                  p: 2,
                  textAlign: "center",
                  color: "text.secondary",
                }}
              >
                No products found
              </Typography>
            )}
          </Paper>
        )}
      </Search>
    </ClickAwayListener>
  );
}

export default SearchBar;
