import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Divider,
  Paper,
  InputAdornment,
  Container,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";

import { supabase } from "../supabase";
import {AuthContext} from "../contexts/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState, useContext } from "react";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithGoogle } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      console.log(error);
      alert(error.message);
      return;
    }

    // Clear form
    setFormData({
      email: "",
      password: "",
    });

    // Go to Home
    navigate("/");
    const from = location.state?.from?.pathname || "/";

    navigate(from, { replace: true });
  };
  return (
    <Container
      maxWidth="false"
      sx={{
        bgcolor: "#f5f7fb",
        p: "0px",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: {
            xs: 0,
          },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            borderRadius: 4,
            border: "1px solid",
            borderColor: "divider",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.08)",
            overflow: "hidden",
          }}
        >
          {/* ================= FORM ================= */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: {
                xs: 3,
                sm: 3,
              },
            }}
          >
            <Box sx={{ width: "100%", maxWidth: 430 }}>
              {/* Header */}
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                  }}
                >
                  Welcome to{" "}
                  <Box
                    component={Link}
                    to="/"
                    sx={{
                      color: "primary.main",
                      fontWeight: 700,
                    }}
                  >
                    TechMart
                  </Box>
                </Typography>

                <Typography color="text.secondary">
                  Please enter your details to sign in.
                </Typography>
              </Box>

              {/* Email */}
              <Typography fontWeight={600} sx={{ mb: 1 }}>
                Email Address
              </Typography>

              <TextField
                fullWidth
                placeholder="you@example.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                sx={{ mb: 3 }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon color="action" />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              {/* Password */}
              <Typography fontWeight={600} sx={{ mb: 1 }}>
                Password
              </Typography>

              <TextField
                fullWidth
                type="password"
                placeholder="••••••••"
                name="password"
                value={formData.password}
                onChange={handleChange}
                sx={{ mb: 2 }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon color="action" />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              {/* Remember + Forgot */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label={<Typography variant="body2">Remember me</Typography>}
                />

                <Button
                  sx={{
                    textTransform: "none",
                    p: 0,
                    minWidth: "auto",
                  }}
                >
                  Forgot password?
                </Button>
              </Box>

              {/* Sign In */}
              <Button
                fullWidth
                variant="contained"
                onClick={handleLogin}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  height: 50,
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 600,
                  mb: 4,
                }}
              >
                Sign In
              </Button>

              {/* Divider */}
              <Divider sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Or continue with
                </Typography>
              </Divider>

              {/* Google + Apple */}
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  mb: 4,
                }}
              >
                <Button
                  onClick={loginWithGoogle}
                  fullWidth
                  variant="outlined"
                  startIcon={<GoogleIcon />}
                  sx={{
                    height: 46,
                    textTransform: "none",
                    color: "#333",
                  }}
                >
                  Google
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<AppleIcon />}
                  sx={{
                    height: 46,
                    textTransform: "none",
                    color: "#333",
                  }}
                >
                  Apple
                </Button>
              </Box>

              {/* Sign up */}
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: "center" }}
              >
                Don't have an account?
                <Button
                  onClick={() =>
                    navigate("/signup", {
                      state: { from: location.state?.from },
                    })
                  }
                  sx={{
                    p: 0,
                    minWidth: "auto",
                    ml: 0.5,
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  Sign up
                </Button>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Container>
  );
}

export default Login;
