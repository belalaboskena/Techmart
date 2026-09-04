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

import { Link } from "react-router-dom";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";

import { supabase } from "../supabase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSignup = async () => {
    console.log(formData);

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,

      options: {
        data: {
          full_name: `${formData.firstName} ${formData.lastName}`,
        },
      },
    });

    if (error) {
      console.log(error.message);
      return;
    }
    navigate("/");
    // Clear form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    });

    console.log("Account created:", data);
  };
  return (
    <Container maxWidth="false" sx={{ bgcolor: "#f5f7fb" }}>
      <Container
        maxWidth="lg"
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
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
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                md: "row",
              },
            }}
          >
            {/* ================================================= */}
            {/* LEFT SIDE - FORM */}
            {/* ================================================= */}

            <Box
              sx={{
                width: {
                  xs: "100%",
                  md: "55%",
                },
                p: {
                  xs: 3,
                  sm: 4,
                  md: 5,
                },
              }}
            >
              {/* Header */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  component={Link}
                  to="/"
                  sx={{
                    textDecoration: "none",
                    fontSize: "1.6rem",
                    fontWeight: 800,
                    color: "primary.main",
                  }}
                >
                  TechMart
                </Typography>

                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    mt: 2,
                    mb: 0.5,
                  }}
                >
                  Create an account
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Enter your details to create your account.
                </Typography>
              </Box>

              {/* First Name + Last Name */}
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  mb: 2,
                }}
              >
                {/* First Name */}
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" fontWeight={600} sx={{ mb: 0.7 }}>
                    First Name
                  </Typography>

                  <TextField
                    fullWidth
                    size="small"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonOutlinedIcon
                              fontSize="small"
                              color="action"
                            />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </Box>

                {/* Last Name */}
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" fontWeight={600} sx={{ mb: 0.7 }}>
                    Last Name
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                  />{" "}
                </Box>
              </Box>

              {/* Email */}
              <Typography variant="body2" fontWeight={600} sx={{ mb: 0.7 }}>
                Email Address
              </Typography>

              <TextField
                fullWidth
                size="small"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                sx={{ mb: 2 }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon fontSize="small" color="action" />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              {/* Password */}
              <Typography variant="body2" fontWeight={600} sx={{ mb: 0.7 }}>
                Password
              </Typography>

              <TextField
                fullWidth
                size="small"
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                placeholder="••••••••"
                sx={{ mb: 2 }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon fontSize="small" color="action" />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              {/* Confirm Password */}
              <Typography variant="body2" fontWeight={600} sx={{ mb: 0.7 }}>
                Confirm Password
              </Typography>

              <TextField
                fullWidth
                size="small"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                type="password"
                placeholder="••••••••"
                sx={{ mb: 1 }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon fontSize="small" color="action" />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              {/* Terms */}
              <FormControlLabel
                sx={{
                  ml: -0.5,
                  mt: 0.5,
                }}
                control={
                  <Checkbox
                    size="small"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                  />
                }
                label={
                  <Typography variant="body2" color="text.secondary">
                    I agree to the{" "}
                    <Box
                      component="span"
                      sx={{
                        color: "primary.main",
                        cursor: "pointer",
                      }}
                    >
                      Terms & Conditions
                    </Box>
                  </Typography>
                }
              />
            </Box>

            {/* ================================================= */}
            {/* RIGHT SIDE - ACTIONS */}
            {/* ================================================= */}

            <Box
              sx={{
                width: {
                  xs: "100%",
                  md: "45%",
                },

                p: {
                  xs: 3,
                  sm: 4,
                  md: 5,
                },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {/* Create Account */}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                }}
              >
                Get started
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Create your TechMart account and enjoy a better shopping
                experience.
              </Typography>

              <Button
                fullWidth
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                onClick={handleSignup}
                sx={{
                  height: 50,
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 600,
                  mb: 3,
                  boxShadow: "none",
                  "&:hover": {
                    boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
                  },
                }}
              >
                Create Account
              </Button>

              {/* Divider */}
              <Divider sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Or continue with
                </Typography>
              </Divider>

              {/* Google */}
              <Button
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                sx={{
                  height: 46,
                  borderRadius: 2,
                  textTransform: "none",
                  color: "text.primary",
                  borderColor: "divider",
                  mb: 1.5,
                }}
              >
                Continue with Google
              </Button>

              {/* Apple */}
              <Button
                fullWidth
                variant="outlined"
                startIcon={<AppleIcon />}
                sx={{
                  height: 46,
                  borderRadius: 2,
                  textTransform: "none",
                  color: "text.primary",
                  borderColor: "divider",
                }}
              >
                Continue with Apple
              </Button>

              {/* Login */}
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  textAlign: "center",
                  mt: 4,
                }}
              >
                Already have an account?{" "}
                <Button
                  component={Link}
                  to="/login"
                  sx={{
                    p: 0,
                    minWidth: "auto",
                    ml: 0.5,
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  Sign in
                </Button>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Container>
  );
}

export default SignUp;
